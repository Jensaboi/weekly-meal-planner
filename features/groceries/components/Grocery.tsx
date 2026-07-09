import { Item, ItemContent, ItemHeader, ItemTitle } from "@/components/ui/item";
import { GroceryItem } from "../groceries.type";

export default function Grocery({ grocery }: { grocery: GroceryItem }) {
  return (
    <Item variant={"outline"}>
      <ItemContent>
        <ItemHeader>
          <ItemTitle>
            <span>{grocery.name}</span>
            <span>{grocery.unit}</span>
            <span>{grocery.quantity}</span>
          </ItemTitle>
        </ItemHeader>
      </ItemContent>
    </Item>
  );
}
