interface IUser {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface ISession {
  user: IUser & {
    guestId: number;
  };
}

interface Reservation {
  from: Date | undefined;
  to: Date | undefined;
}
