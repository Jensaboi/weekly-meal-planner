import { Database } from "@/lib/supabase/database.types";

export type MealCardData = Database["public"]["Views"]["meal_card"]["Row"];
