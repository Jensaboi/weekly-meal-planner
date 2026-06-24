import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
} from "@/components/ui/item";
import { RecipeReviewData } from "../recipe.types";
import ReviewStars from "@/components/ReviewStars";

export default function Review({ review }: { review: RecipeReviewData }) {
  return (
    <Item variant={"outline"}>
      <ItemHeader>
        <span className="text-xs font-medium">
          {new Date(review.created_at).toDateString()}
        </span>
      </ItemHeader>
      <ItemContent>
        <ItemDescription className="tracking-wider">
          {review.comment}
        </ItemDescription>
      </ItemContent>
      <ItemFooter>
        <ReviewStars size={16} avgRating={review.rating} />
      </ItemFooter>
    </Item>
  );
}
