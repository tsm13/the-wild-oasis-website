import { User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & {
      guestId: number;
    };
  }
}

export interface IReservation {
  from: Date | undefined;
  to: Date | undefined;
}
