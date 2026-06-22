import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
} from "@/components/ui/item";
import { RecipeReviewData } from "../recipe.types";

export default function Review({ review }: { review: RecipeReviewData }) {
  return (
    <Item variant={"outline"}>
      <ItemHeader></ItemHeader>
      <ItemContent>
        <ItemDescription>{review.comment}</ItemDescription>

        <span>{review.rating}</span>
      </ItemContent>
    </Item>
  );
}
