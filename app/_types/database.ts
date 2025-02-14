export interface ICabin {
  discount: number;
  id: number;
  image: string;
  maxCapacity: number;
  name: string;
  regularPrice: number;
  description: string;
}

export interface IBooking {
  cabinId: number;
  createdAt: string;
  endDate: Date;
  guestId: number;
  id: number;
  numGuests: number;
  numNights: number;
  startDate: Date;
  totalPrice: number;
  observations: string;
  cabins: {
    name: string;
    image: string;
  };
}

export interface IBookingAction extends IBooking {
  cabinPrice: number;
  extrasPrice: number;
  hasBreakfast: boolean;
  isPaid: boolean;
  status: "unconfirmed" | "checked-in" | "checked-out";
}

export interface IGuest {
  countryFlag: string;
  email: string;
  fullName: string;
  id: number;
  nationalID?: string;
  nationality?: string;
}

export interface ISetting {
  breakfastPrice: number;
  createdAt: string;
  id: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  minBookingLength: number;
}
