"use server";
import { redirect } from "next/navigation";
import { getUser } from "../user/user.data";
import { NewMeal } from "./meal.schema";
import { createClient } from "@/lib/supabase/server";
import { getHousehold } from "../household/household.data";

export async function planMealAction(formData: FormData) {
  const household = await getHousehold();

  const user = await getUser();

  if (!user) redirect("/login");

  let household_id = null;
  let user_id = null;

  //later add question what to plan for(user, household)?
  if (household) {
    household_id = household.id;
  } else {
    user_id = user.id;
  }

  const input = {
    recipe_id: formData.get("recipeId") as string,
    user_id,
    household_id,
    meal_type: formData.get("mealType") as string,
    date: formData.get("date") as string,
  };

  const meal = NewMeal.safeParse(input);

  if (!meal.success) {
    return { success: false, error: meal.error.issues[0].message };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("meals").insert(meal.data);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}
