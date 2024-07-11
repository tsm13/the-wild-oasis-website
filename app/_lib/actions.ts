"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { IBookingAction } from "../_types/database";
import { auth, signIn, signOut } from "./auth";
import { getBookings } from "./data-service";
import { supabase } from "./supabase-client";

// Auth helper
async function AuthorizeUserOperation(bookingId?: number) {
  const session = await auth();
  if (!session || !session.user)
    throw new Error("You must be logged in to perform this action");

  // If operation includes changing/deleting reservation
  if (bookingId) {
    const guestBookings = await getBookings(session.user.guestId);
    const guestBookingIds = guestBookings.map((booking) => booking.id);

    if (!guestBookingIds.includes(bookingId))
      throw new Error("Invalid operation");
  }

  return session;
}

// Update Guest
export async function updateGuest(formData: FormData) {
  const session = await AuthorizeUserOperation();

  const nationalID = String(formData.get("nationalID"));
  const [nationality, countryFlag] = String(formData.get("nationality")).split(
    "%"
  );

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error(
      "National ID must have between 6 and 12 alphanumeric characters"
    );

  const updateData = { nationality, countryFlag, nationalID };

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  // Data revalidation
  revalidatePath("/account/profile");
}

export async function deleteBooking(bookingId: number) {
  await AuthorizeUserOperation(bookingId);

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  // Data revalidation
  revalidatePath("/account/reservations");
}

export async function updateBooking(formData: FormData) {
  const bookingId = Number(formData.get("bookingId"));
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: String(formData.get("observations")?.slice(0, 1000)),
  };

  await AuthorizeUserOperation(bookingId);

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be updated");

  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}

export async function createBooking(
  bookingData: IBookingAction,
  formData: FormData
) {
  const session = await AuthorizeUserOperation();

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    status: "unconfirmed",
    isPaid: false,
    hasBreakfast: false,
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
