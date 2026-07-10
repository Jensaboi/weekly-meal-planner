import { createClient } from "@/lib/supabase/server";
import {
  RecipeCardType,
  RecipeDetailsType,
  RecipeReviewType,
} from "./recipe.types";
import { requireUser } from "../auth/auth.data";

export async function getRecipes(): Promise<RecipeCardType[]> {
  const supabase = await createClient();

  const { error, data } = await supabase.from("recipe_card").select();

  if (error) throw error;

  return data;
}

export async function getRecipeDetails(
  id: number,
): Promise<RecipeDetailsType | null> {
  if (!id) throw new Error("Recipe id is required.");

  const supabase = await createClient();

  const { error, data } = await supabase
    .from("recipe_details")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  return data;
}

export async function getRecipeReviewComments(
  id: number,
): Promise<RecipeReviewType[]> {
  if (!id) throw new Error("Recipe id is required");

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("recipe_reviews")
    .select("*")
    .eq("recipe_id", id)
    .neq("comment", null);

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

export async function getMyReview(recipeId: number) {
  const userId = await requireUser();

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("recipe_reviews")
    .select("*")
    .eq("recipe_id", recipeId)
    .eq("author_id", userId)
    .maybeSingle();

  if (error) throw error;

  return data;
}
