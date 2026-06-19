import { createClient } from "@/lib/supabase/server";
import { RecipeCardData } from "./recipe.types";

export async function getRecipes(): Promise<RecipeCardData[]> {
  const supabase = await createClient();

  const { error, data } = await supabase.from("recipe_card").select();

  if (error) throw error;

  return data;
}
