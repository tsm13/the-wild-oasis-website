// export type Cabin = Database["public"]["Tables"]["cabins"]["Row"];

import { Database } from "./supabase";

export interface ICabin {
  discount: number;
  id: number;
  image: string;
  maxCapacity: number;
  name: string;
  regularPrice: number;
  description: string;
}

export type ISettings = Database["public"]["Tables"]["settings"]["Row"];
