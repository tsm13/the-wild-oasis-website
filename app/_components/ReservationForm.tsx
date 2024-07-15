"use client";

import { differenceInDays } from "date-fns";
import { User } from "next-auth";
import { useReservation } from "../_context/ReservationContext";
import { createBooking } from "../_lib/actions";
import { IBooking, IBookingAction, ICabin } from "../_types/database";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin, user }: { cabin: ICabin; user: User }) {
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = cabin;

  if (!range.from || !range.to) return;
  const { from: startDate, to: endDate } = range;

  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData: Partial<IBookingAction> = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const handleSubmit = async (formData: FormData) => {
    await createBooking.call(null, bookingData, formData);
    resetRange();
  };

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <img
            // Needed to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image!}
            alt={user.name!}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
        action={handleSubmit}
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!startDate || !endDate ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingLabel="Placing reserve...">
              Reserve now
            </SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
