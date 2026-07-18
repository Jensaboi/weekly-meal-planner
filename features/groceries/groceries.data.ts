"use server";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "../auth/auth.data";
import { getHousehold } from "../household/household.data";
import { GroceryType } from "./groceries.type";
import { formatDate } from "@/lib/utils";

export async function getGroceries(): Promise<GroceryType[]> {
  const userId = await requireUser("/groceries");

  const household = await getHousehold();

  const supabase = await createClient();

  let response = supabase.from("groceries_view").select("*");

  if (household) {
    response = response.or(
      `user_id.eq.${userId},household_id.eq.${household.id}`,
    );
  } else {
    response = response.or(`user_id.eq.${userId}`);
  }

  response.or(`meal_date.gte.${formatDate(new Date())}, meal_date.is.${null}`);

  const { data, error } = await response.order("created_at", {
    ascending: true,
  });

  if (error) throw error;

  return data;
}
