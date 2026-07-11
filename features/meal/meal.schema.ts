import z from "zod";

export const NewMeal = z.object({
  recipe_id: z.coerce.number("Recipe id is required"),
  date: z.string("Select a date for the meal."),
  portions: z.coerce.number("Portions is required."),
  meal_type: z.enum(
    ["dinner", "lunch", "breakfast", "snack"],
    "Select a course type for the recipe.",
  ),
});
