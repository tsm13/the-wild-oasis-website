import CabinCard from "./CabinCard";
import { getCabins } from "../_lib/data-service";
import { unstable_noStore as noStore } from "next/cache";

export default async function CabinList({ filter }: { filter: string }) {
  // REVIEW:
  // noStore();

  const cabins = await getCabins();

  if (!cabins.length) return null;

  // let filteredCabins;
  // switch (filter) {
  //   case "small":
  //     filteredCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  //     break;
  //   case "medium":
  //     filteredCabins = cabins.filter(
  //       (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
  //     );
  //     break;
  //   case "large":
  //     filteredCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
  //     break;
  //   default:
  //     filteredCabins = cabins;
  // }

  // REVIEW: object literals as switch
  const filteredCabins =
    {
      all: cabins,
      small: cabins.filter((cabin) => cabin.maxCapacity <= 3),
      medium: cabins.filter(
        (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
      ),
      large: cabins.filter((cabin) => cabin.maxCapacity >= 8),
    }[filter] || cabins;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {filteredCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
