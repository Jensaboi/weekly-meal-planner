import { getRecipeReviews } from "../recipe.data";
import Review from "./Review";
import { ReviewRecipeForm } from "./ReviewRecipeForm";

export default async function RecipeReviews({ id }: { id: number }) {
  const reviews = await getRecipeReviews(id);

  return (
    <div className="grid gap-4 lg:gap-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

        <ReviewRecipeForm id={id} />
      </div>

      <div className="flex flex-col gap-2">
        {reviews.map(review => (
          <Review key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
