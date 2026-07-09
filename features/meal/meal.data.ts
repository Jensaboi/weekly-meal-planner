"use server";

import { createClient } from "@/lib/supabase/server";
import { requireUser } from "../auth/auth.data";
import { MealCardData } from "./meal.type";

export async function getMeals(): Promise<MealCardData[]> {
  const userId = await requireUser();

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("meal_card")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });

  if (error) throw error;

  return data;
}
