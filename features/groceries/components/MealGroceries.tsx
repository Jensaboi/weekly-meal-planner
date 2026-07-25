"use client";

import { Item, ItemContent, ItemHeader, ItemTitle } from "@/components/ui/item";
import { MealGroceryType } from "../groceries.type";
import { ChevronDown, ChevronUp } from "lucide-react";
import useToggle from "@/hooks/useToggle";
import GroceryItem from "./GroceryItem";

export default function MealGroceries({ meal }: { meal: MealGroceryType }) {
  const { toggle, isOpen } = useToggle();

  return (
    <Item variant={"outline"}>
      <ItemHeader className="flex items-center justify-between">
        <ItemTitle>
          {meal.name} {meal.portions} portions
        </ItemTitle>
        <div className="flex items-center justify-between">
          <button className="hover:cursor-pointer" onClick={toggle}>
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </ItemHeader>

      {isOpen && (
        <ItemContent className="block">
          <ul className="flex flex-col gap-2">
            {meal.groceries.map(grocery => (
              <GroceryItem key={grocery.id} grocery={grocery} />
            ))}
          </ul>
        </ItemContent>
      )}
    </Item>
  );
}
