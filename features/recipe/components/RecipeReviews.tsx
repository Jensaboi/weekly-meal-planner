import { getRecipeReviewComments } from "../recipe.data";
import Review from "./Review";

export default async function RecipeReviews({ id }: { id: number }) {
  const reviews = await getRecipeReviewComments(id);

  return (
    <div className="w-full max-w-180 mx-auto">
      <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
      {reviews.length === 0 && (
        <div className="flex flex-col gap-4 py-16">
          <p className="text-sm text-center text-muted-foreground">
            Currently no reviewcomments for this recipe...
          </p>
        </div>
      )}
      <div className="flex flex-col gap-2">
        {reviews.map(review => (
          <Review key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
