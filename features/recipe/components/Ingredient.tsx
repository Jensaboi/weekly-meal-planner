import { Item, ItemDescription } from "@/components/ui/item";
import { IngredientData } from "../recipe.types";

export default function Ingredient({
  ingredient,
}: {
  ingredient: IngredientData;
}) {
  return (
    <Item asChild variant={"outline"}>
      <li>
        <ItemDescription>{ingredient.name}</ItemDescription>
      </li>
    </Item>
  );
}
