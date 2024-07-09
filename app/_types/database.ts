// export type Cabin = Database["public"]["Tables"]["cabins"]["Row"];

// REVIEW: all interfaces...

interface ICabin {
  discount: number;
  id: number;
  image: string;
  maxCapacity: number;
  name: string;
  regularPrice: number;
  description: string;
}

interface IGuest {
  countryFlag?: string;
  email: string;
  fullName: string;
  id: number;
  nationalID: string | null;
  nationality: string | null;
}

interface IBooking {
  cabinId: number;
  cabinPrice: number;
  createdAt: string;
  endDate: string;
  extrasPrice: number | null;
  guestId: number;
  hasBreakfast: boolean;
  id: number;
  isPaid: boolean;
  numGuests: number;
  numNights: number;
  observations: string | null;
  startDate: string;
  status: string;
  totalPrice: number;
  cabins: {
    name: string;
    image: string;
  };
}

interface IBookingDB {
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

interface ISetting {
  breakfastPrice: number;
  createdAt: string;
  id: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  minBookingLength: number;
}
