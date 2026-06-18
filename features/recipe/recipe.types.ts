import { Database } from "@/lib/supabase/database.types";

export type RecipeCardData = Database["public"]["Views"]["recipe_card"]["Row"];

export type RecipeCategory =
  Database["public"]["Tables"]["recipe_categories"]["Row"];
