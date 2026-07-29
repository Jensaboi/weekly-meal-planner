"use server";
import { redirect } from "next/navigation";
import { getUser } from "../user/user.data";
import { NewMeal } from "./meal.schema";
import { createClient } from "@/lib/supabase/server";

export async function planMealAction(formData: FormData) {
  const user = await getUser();

  if (!user) redirect("/login");

  const input = {
    portions: formData.get("portions") as string,
    recipe_id: formData.get("recipeId") as string,
    meal_type: formData.get("mealType") as string,
    date: formData.get("date") as string,
  };

  const meal = NewMeal.safeParse(input);

  if (!meal.success) {
    return { success: false, error: meal.error.issues[0].message };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const date = new Date(input.date);
  date.setHours(0, 0, 0, 0);

  if (today > date) {
    return {
      success: false,
      error: "You cannot plan a meal for an date that have passed.",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.rpc("create_meal_and_groceries", {
    p_date: meal.data.date,
    p_meal_type: meal.data.meal_type,
    p_portions: meal.data.portions,
    p_recipe_id: meal.data.recipe_id,
  });

  if (error) {
    if (error.code === "23505")
      return {
        success: false,
        error: `You have already planned ${meal.data.meal_type} on this date.`,
      };

    return {
      success: false,
      error: error.message,
    };
  }

  return { success: true, error: null };
}
