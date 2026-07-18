"use server";

import { createClient } from "@/lib/supabase/server";
import { requireUser } from "../auth/auth.data";
import { MealCardType } from "./meal.type";
import { formatDate } from "@/lib/utils";

export async function getMeals(): Promise<MealCardType[]> {
  const userId = await requireUser();

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("meal_card")
    .select("*")
    .eq("user_id", userId)
    .gte("date", formatDate(new Date()))
    .order("date", { ascending: false });

  if (error) throw error;

  return data;
}
