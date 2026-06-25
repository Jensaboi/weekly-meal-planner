import z from "zod";

export const NewReview = z.object({
  author_id: z.uuid("You must be authenticated to leave a review."),
  comment: z.string().optional(),
  rating: z.coerce.number("You must leave a review rating."),
  recipe_id: z.coerce.number("Invalid recipe id."),
});

export const NewIngredient = z.object({});

export const NewInstruction = z.object({});

export const NewCategory = z.object({});

export const NewRecipe = z.object({});
