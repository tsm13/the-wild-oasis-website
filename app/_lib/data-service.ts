import { eachDayOfInterval } from "date-fns";
import { notFound } from "next/navigation";
import { IBooking, ICabin, ISetting } from "../_types/database";
import { supabase } from "./supabase-client";

export async function getCabin(cabinId: number) {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", cabinId)
    .single();

  if (error) {
    console.error(error);
    notFound();
  }

  return data as ICabin;
}

export const getCabins = async function () {
  const { data, error } = await supabase
    .from("cabins")
    .select("id, name, maxCapacity, regularPrice, discount, image")
    .order("name");

  if (error) throw new Error("Cabins could not be loaded");

  return data as ICabin[];
};

export async function getGuest(email: string) {
  const { data } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  // Error handling is done in the sign-in callback
  return data;
}

export async function getBooking(bookingId: number) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", bookingId)
    .single();

  if (error) throw new Error("Booking could not get loaded");

  return data as IBooking;
}

export async function getBookings(guestId: number) {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "id, createdAt, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)"
    )
    .eq("guestId", guestId)
    .order("startDate");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data as IBooking[];
}

export async function getBookedDatesByCabinId(cabinId: number) {
  let today: string | Date = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  // Getting all bookings
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabinId", cabinId)
    .or(`startDate.gte.${today},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) throw new Error("Settings could not be loaded");

  return data as ISetting;
}

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

///////////
// CREATE
//////////

export async function createGuest(newGuest: {
  email: string;
  fullName: string;
}) {
  const { error } = await supabase.from("guests").insert([newGuest]);

  if (error) throw new Error("Guest could not be created");
}
