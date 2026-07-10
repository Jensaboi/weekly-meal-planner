import { Item, ItemDescription } from "@/components/ui/item";
import { IngredientType } from "../recipe.types";

export default function Ingredient({
  ingredient,
}: {
  ingredient: IngredientType;
}) {
  return (
    <Item asChild variant={"outline"}>
      <li>
        <ItemDescription>
          <strong>
            {ingredient.amount} {ingredient.unit}
          </strong>{" "}
          {ingredient.name}
        </ItemDescription>
      </li>
    </Item>
  );
}
