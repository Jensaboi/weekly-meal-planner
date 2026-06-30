import { getUser } from "../user/user.data";
import { createClient } from "@/lib/supabase/server";
import { HouseholdWithMembers } from "./household.type";

export async function getHousehold(): Promise<HouseholdWithMembers | null> {
  const user = await getUser();

  if (!user) return null;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("household_view")
    .select("*")
    .or(`user_id.eq.${user.id}, creator_id.eq.${user.id}`)
    .maybeSingle();

  if (error) throw error;

  return data;
}
