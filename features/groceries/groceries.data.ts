"use server";

import { createClient } from "@/lib/supabase/server";
import { GroceryItem } from "./groceries.type";

export async function getGroceries(): Promise<GroceryItem[] | null> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("groceries").select("*");

  if (error) throw error;

  return data;
}

export async function getMealGroceries(mealIds: number[]) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("meal_groceries")
    .select("*")
    .in("meal_id", mealIds)
    .gte("meal_date", new Date().toISOString());

  if (error) throw error;

  return data;
}
