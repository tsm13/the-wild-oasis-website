"use client";

import { createContext, use, useState } from "react";
import { IReservation } from "../_types/external";

type ReservationContext = {
  range: IReservation;
  setRange: (range: IReservation) => void;
  resetRange: () => void;
};

const ReservationContext = createContext<ReservationContext>(null!);

const initialState: IReservation = {
  from: undefined,
  to: undefined,
};

function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [range, setRange] = useState<IReservation>(initialState);
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
