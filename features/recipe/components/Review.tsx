import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
} from "@/components/ui/item";
import { RecipeReviewType } from "../recipe.types";
import ReviewStars from "@/components/ReviewStars";

export default function Review({ review }: { review: RecipeReviewType }) {
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
        <ReviewStars starSize={16} rating={review.rating} />
      </ItemFooter>
    </Item>
  );
}
