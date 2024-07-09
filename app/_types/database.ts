interface Cabin {
  discount: number;
  id: number;
  image: string;
  maxCapacity: number;
  name: string;
  regularPrice: number;
  description: string;
}

interface Guest {
  countryFlag: string;
  email: string;
  fullName: string;
  id: number;
  nationalID: string | null;
  nationality: string | null;
}

interface Booking {
  cabinId: number;
  cabinPrice: number;
  createdAt: string;
  endDate: string;
  extrasPrice: number;
  guestId: number;
  hasBreakfast: boolean;
  id: number;
  isPaid: boolean;
  numGuests: number;
  numNights: number;
  observations: string;
  startDate: string;
  status: "unconfirmed" | "checked-in" | "checked-out";
  totalPrice: number;
}

interface BookingDB {
  cabinId: number;
  createdAt: string;
  endDate: string;
  guestId: number;
  id: number;
  numGuests: number;
  numNights: number;
  startDate: string;
  totalPrice: number;
  cabins: {
    name: string;
    image: string;
  };
}
// cabinPrice: number;
//extrasPrice: number | null;
// hasBreakfast: boolean;
//isPaid: boolean;
// observations: string | null;
// status: string;

interface Setting {
  breakfastPrice: number;
  createdAt: string;
  id: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  minBookingLength: number;
}
