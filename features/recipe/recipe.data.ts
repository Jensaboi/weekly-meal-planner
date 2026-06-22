import { createClient } from "@/lib/supabase/server";
import {
  RecipeCardData,
  RecipeDetailsData,
  RecipeReviewData,
} from "./recipe.types";

export async function getRecipes(): Promise<RecipeCardData[]> {
  const supabase = await createClient();

  const { error, data } = await supabase.from("recipe_card").select();

  if (error) throw error;

  return data;
}

export async function getRecipeDetails(
  id: number,
): Promise<RecipeDetailsData | null> {
  if (!id) throw new Error("Recipe id is required.");

  const supabase = await createClient();

  const { error, data } = await supabase
    .from("recipe_detail")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  return data;
}

export async function getRecipeReviews(
  id: number,
): Promise<RecipeReviewData[]> {
  if (!id) throw new Error("Recipe id is required");

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("recipe_reviews")
    .select()
    .eq("id", id);

  if (error) throw error;

  return data;
}

export async function getRecipeImageUrl(path: string) {
  const supabase = await createClient();

  const {
    data: { publicUrl },
  } = supabase.storage.from("recipe_images").getPublicUrl(path);

  return publicUrl;
}
