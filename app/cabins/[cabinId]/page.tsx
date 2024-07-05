import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

interface Props {
  params: { cabinId: string };
}

export async function generateMetadata({ params }: Props) {
  const cabin = await getCabin(params.cabinId);
  if (!cabin) return null;
  return { title: `Cabin ${cabin.name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
  return ids;
}

export default async function Page({ params }: Props) {
  const cabin = await getCabin(params.cabinId);
  if (!cabin) return null;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div>
        <Cabin cabin={cabin} />
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
