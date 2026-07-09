import { Database } from "@/lib/supabase/database.types";

export type GroceryItem = Database["public"]["Tables"]["groceries"]["Row"];

export type MealGroceryItem =
  Database["public"]["Views"]["meal_groceries"]["Row"];
