import { Database } from "@/lib/supabase/database.types";

export type MealCard = Database["public"]["Views"]["meal_card"]["Row"];
