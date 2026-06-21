import { Database } from "@/lib/supabase/database.types";

export type RecipeCardData = Database["public"]["Views"]["recipe_card"]["Row"];

export type RecipeCategory =
  Database["public"]["Tables"]["recipe_categories"]["Row"];

export type RecipeDetailsData =
  Database["public"]["Views"]["recipe_detail"]["Row"];

export type InstructionData =
  Database["public"]["Tables"]["recipe_instructions"]["Row"];

export type IngredientData =
  Database["public"]["Tables"]["recipe_ingredients"]["Row"];

export type RecipeImageData =
  Database["public"]["Tables"]["recipe_images"]["Row"];
