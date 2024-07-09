"use client";

import { createContext, use, useState } from "react";

type ReservationContext = {
  range: Reservation;
  setRange: (range: Reservation) => void;
  resetRange: () => void;
};

const ReservationContext = createContext<ReservationContext>(null!);

const initialState: Reservation = {
  from: undefined,
  to: undefined,
};

function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [range, setRange] = useState<Reservation>(initialState);
  const resetRange = () => {
    setRange(initialState);
  };

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = use(ReservationContext);
  if (context === undefined)
    throw new Error("Context was used outside provider!");
  return context;
}

export { ReservationProvider, useReservation };
