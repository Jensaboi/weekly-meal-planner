import { Textarea } from "@/components/ui/textarea";
import { getRecipeReviews } from "../recipe.data";
import Review from "./Review";
import { Button } from "@/components/ui/button";

export default async function RecipeReviews({ id }: { id: number }) {
  const reviews = await getRecipeReviews(id);

  return (
    <div className="grid md:grid-cols-2 gap-4 lg:gap-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          Whats your thought about the recipe?
        </h2>
        <form>
          <Textarea placeholder="Leave a review"></Textarea>
          <Button>Submit</Button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

        <div>
          {reviews.map(review => (
            <Review key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}
