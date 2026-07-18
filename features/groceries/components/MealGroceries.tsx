"use client";

import { Item, ItemContent, ItemHeader, ItemTitle } from "@/components/ui/item";
import { MealGroceryType } from "../groceries.type";
import { ChevronDown, ChevronUp } from "lucide-react";
import useToggle from "@/hooks/useToggle";

export default function MealGroceries({ meal }: { meal: MealGroceryType }) {
  const { toggle, isOpen } = useToggle();

  return (
    <Item variant={"outline"}>
      <ItemHeader>
        <ItemTitle>
          {meal.name} {meal.portions} portions
        </ItemTitle>
        <div className="flex items-center justify-between">
          <button className="hover:cursor-pointer" onClick={toggle}>
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </ItemHeader>

      {isOpen && <ItemContent></ItemContent>}
    </Item>
  );
}
