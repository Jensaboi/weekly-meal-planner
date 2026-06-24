import z from "zod";

export const NewReview = z.object({
  author_id: z.uuid(),
  comment: z.string().optional(),
  rating: z.coerce.number(),
  recipe_id: z.coerce.number(),
});
