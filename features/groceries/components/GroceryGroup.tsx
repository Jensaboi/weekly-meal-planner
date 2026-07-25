import {
  Item,
  ItemActions,
  ItemContent,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { GroceryGroupType } from "../groceries.type";
import { Check, ChevronDown, ChevronUp, Dot, Trash } from "lucide-react";
import useToggle from "@/hooks/useToggle";
import { capitalizeFirstLetter } from "@/lib/utils";
import ActionButton from "@/components/ActionButton";
import { deleteGroceries, setGroceriesIsBought } from "../groceries.action";
import GroceryItem from "./GroceryItem";

export default function GroceryGroup({ group }: { group: GroceryGroupType }) {
  const { isOpen, toggle } = useToggle();
  const addedManual = group.items.filter(i => i.added_by === "manual");
  const addedByMeal = group.items.filter(i => i.added_by === "meal");

  return (
    <Item variant={group.all_checked ? "muted" : "outline"}>
      <ItemHeader className="flex flex-col items-start">
        <div className="w-full flex items-center justify-between">
          <ItemTitle className="font-medium">
            {capitalizeFirstLetter(group.name)} Total {group.total_amount}{" "}
            {group.unit}
          </ItemTitle>
          <ItemActions className="flex items-center">
            <ActionButton
              variant={"outline"}
              action={() => {
                if (group.all_checked) {
                  setGroceriesIsBought(
                    group.items.map(i => i.id).filter(Boolean) as number[],
                    false,
                  );
                } else {
                  setGroceriesIsBought(
                    group.items.map(i => i.id).filter(Boolean) as number[],
                    true,
                  );
                }
              }}
              size={"icon-xs"}
            >
              {group.all_checked && <Check />}
            </ActionButton>
            <ActionButton
              variant={"outline"}
              action={() =>
                deleteGroceries(
                  group.items.map(i => i.id).filter(Boolean) as number[],
                )
              }
              size={"icon-xs"}
            >
              <Trash />
            </ActionButton>
          </ItemActions>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground font-semibold">
            {addedByMeal.length >= 1 && (
              <span>
                {addedByMeal.length}{" "}
                {addedByMeal.length === 1 ? "meal" : "meals"} planned
              </span>
            )}
            {addedByMeal.length >= 1 && addedManual.length >= 1 && <Dot />}
            {addedManual.length >= 1 && (
              <span>{addedManual.length} manual items</span>
            )}
          </div>
          <button className="hover:cursor-pointer" onClick={toggle}>
            {isOpen ? (
              <ChevronUp className="text-accent" strokeWidth={3} size={14} />
            ) : (
              <ChevronDown className="text-accent" strokeWidth={3} size={14} />
            )}
          </button>
        </div>
      </ItemHeader>
      {isOpen && (
        <ItemContent>
          <ul>
            {group.items.map(grocery => (
              <GroceryItem key={grocery.id} grocery={grocery} />
            ))}
          </ul>
        </ItemContent>
      )}
    </Item>
  );
}
