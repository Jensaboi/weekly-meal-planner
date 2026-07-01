import z from "zod";

export const NewMeal = z.object({
  user_id: z.uuid().nullable(),
  household_id: z.number().nullable(),
  recipe_id: z.coerce.number("Recipe id is required"),
  date: z.string("Select a date for the meal."),
  meal_type: z.enum(
    ["dinner", "lunch", "breakfast", "snack"],
    "Select a course type for the recipe.",
  ),
});
