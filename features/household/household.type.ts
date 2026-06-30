import { Database } from "@/lib/supabase/database.types";

export type HouseholdWithMembers =
  Database["public"]["Views"]["household_view"]["Row"];
