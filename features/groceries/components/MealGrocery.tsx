import { Item, ItemContent, ItemHeader, ItemTitle } from "@/components/ui/item";
import { MealGroceryItem } from "../groceries.type";

export default function MealGrocery({
  mealGrocery,
}: {
  mealGrocery: MealGroceryItem;
}) {
  return (
    <Item variant={"outline"}>
      <ItemContent>
        <ItemHeader>
          <ItemTitle>
            <span>{mealGrocery.name}</span>
            <span>{mealGrocery.unit}</span>
            <span>{mealGrocery.quantity}</span>
          </ItemTitle>
        </ItemHeader>
      </ItemContent>
    </Item>
  );
}
