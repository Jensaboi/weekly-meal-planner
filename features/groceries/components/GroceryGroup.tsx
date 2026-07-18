import {
  Item,
  ItemActions,
  ItemContent,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { GroceryGroupType } from "../groceries.type";
import { Check, ChevronDown, ChevronUp, Dot } from "lucide-react";
import useToggle from "@/hooks/useToggle";
import { capitalizeFirstLetter } from "@/lib/utils";
import ActionButton from "@/components/ActionButton";
import { setGroceriesIsBought, toggleIsBought } from "../groceries.action";
import clsx from "clsx";

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
            {group.all_checked ? (
              <ActionButton
                variant={"outline"}
                action={() => {
                  setGroceriesIsBought(
                    group.items.map(i => i.id).filter(Boolean) as number[],
                    false,
                  );
                }}
                size={"xs"}
                className="text-xs"
              >
                Undo all
              </ActionButton>
            ) : (
              <ActionButton
                variant={"outline"}
                action={() => {
                  setGroceriesIsBought(
                    group.items.map(i => i.id).filter(Boolean) as number[],
                    true,
                  );
                }}
                size={"xs"}
                className="text-xs"
              >
                Check all
              </ActionButton>
            )}
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
              <li
                className={clsx(
                  grocery.is_bought && "line-through",
                  "flex items-center gap-2",
                )}
                key={grocery.id}
              >
                <ActionButton
                  variant={"outline"}
                  action={() => {
                    if (!grocery.id) return;

                    toggleIsBought(grocery.id, !grocery.is_bought);
                  }}
                  className="size-5 rounded-xs"
                >
                  {grocery.is_bought && <Check />}
                </ActionButton>

                <p className="text-xs capitalize">
                  {grocery.amount} {grocery.unit} {grocery.name}{" "}
                  <span className="text-muted-foreground">
                    ({grocery.meal_name})
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </ItemContent>
      )}
    </Item>
  );
}
