import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";
import { NextApiRequest } from "next";

interface IResponseCabin {
  params: { cabinId: string };
}

export async function GET(_req: NextApiRequest, { params }: IResponseCabin) {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
}
