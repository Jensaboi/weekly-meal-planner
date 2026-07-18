import { Database } from "@/lib/supabase/database.types";
import { MealCardType } from "../meal/meal.type";

export type GroceryType = Database["public"]["Views"]["groceries_view"]["Row"];

export type GroceryGroupType = {
  name: string;
  ingredient_id: number;
  total_amount: number;
  unit: "dl" | "g" | "kg" | "ml" | "cl" | "l" | "tbsp" | "tsp" | "pcs" | null;
  items: GroceryType[];
  all_checked: boolean;
};

export type MealGroceryType = MealCardType & { groceries: GroceryType[] };
