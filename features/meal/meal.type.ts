import { Database } from "@/lib/supabase/database.types";

export type MealCardType = Database["public"]["Views"]["meal_card"]["Row"];
