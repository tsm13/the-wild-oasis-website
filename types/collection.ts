import { Database } from "./supabase";

// export type Cabin = Database["public"]["Tables"]["cabins"]["Row"];

export interface Cabin {
  discount: number;
  id: number;
  image: string;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}
