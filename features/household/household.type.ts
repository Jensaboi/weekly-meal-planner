import { Database } from "@/lib/supabase/database.types";

export type HouseholdViewType =
  Database["public"]["Views"]["household_view"]["Row"];
