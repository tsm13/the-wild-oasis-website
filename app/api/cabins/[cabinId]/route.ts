import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";
import { NextRequest } from "next/server";

interface IResponseCabin {
  params: { cabinId: string };
}

export async function GET(_req: NextRequest, { params }: IResponseCabin) {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(Number(cabinId)),
      getBookedDatesByCabinId(Number(cabinId)),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
}
