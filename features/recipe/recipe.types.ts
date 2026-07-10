import { Database } from "@/lib/supabase/database.types";

export type RecipeCardType = Database["public"]["Views"]["recipe_card"]["Row"];

export type RecipeCategoryType =
  Database["public"]["Tables"]["recipe_categories"]["Row"];

export type RecipeDetailsType =
  Database["public"]["Views"]["recipe_details"]["Row"];

export type InstructionType =
  Database["public"]["Tables"]["recipe_instructions"]["Row"];

export type IngredientType =
  Database["public"]["Tables"]["recipe_ingredients"]["Row"] & {
    name: string;
    livsmedel_id: number;
  };

export type RecipeImageType =
  Database["public"]["Tables"]["recipe_images"]["Row"];

export type RecipeReviewType =
  Database["public"]["Tables"]["recipe_reviews"]["Row"];
