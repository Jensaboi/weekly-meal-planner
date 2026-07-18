"use client";

import { useEffect, useState } from "react";
import {
  GroceryGroupType,
  GroceryType,
  MealGroceryType,
} from "../groceries.type";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import GroceryGroup from "./GroceryGroup";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MealCardType } from "@/features/meal/meal.type";
import MealGroceries from "./MealGroceries";

export default function GroceryLists({
  groceries,
  meals,
}: {
  groceries: GroceryType[];
  meals: MealCardType[];
}) {
  const [groceriesData, setGroceriesData] = useState<GroceryType[]>(
    groceries.sort((a, b) => (a.id ?? 0) - (b.id ?? 0)),
  );

  const [listType, setListType] = useState<"meals" | "groceries">("meals");

  function createGroceryGroups(groceries: GroceryType[]) {
    const map = new Map();

    for (const grocery of groceries) {
      const ingredientGroup: GroceryGroupType | undefined = map.get(
        `${grocery.ingredient_id}-${grocery.unit}`,
      );

      if (ingredientGroup) {
        if (grocery.amount) ingredientGroup.total_amount += grocery.amount;

        ingredientGroup.items = [...ingredientGroup.items, grocery];

        ingredientGroup.all_checked = ingredientGroup.items.every(
          grocery => grocery.is_bought,
        );
      } else {
        map.set(`${grocery.ingredient_id}-${grocery.unit}`, {
          name: grocery.name,
          total_amount: grocery.amount,
          unit: grocery.unit,
          items: [grocery],
          all_checked: grocery.is_bought,
        });
      }
    }

    return [...map];
  }

  function createMealGroups(
    groceries: GroceryType[],
    meals: MealCardType[],
  ): MealGroceryType[] {
    const temp: MealCardType & { groceries: GroceryType[] }[] = [];
    for (const meal of meals) {
      const mealGroceries = groceries.filter(g => g.meal_id === meal.id);

      temp.push({ ...meal, groceries: mealGroceries });
    }

    return temp;
  }

  const mealGroceries = createMealGroups(groceriesData, meals);

  const groceryGroups: [string, GroceryGroupType][] =
    createGroceryGroups(groceriesData);

  useEffect((): (() => void) => {
    const supabase = createClient();

    const channel = supabase
      .channel("groceries")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "groceries",
        },
        payload => {
          console.log("Change received!", payload);
          switch (payload.eventType) {
            case "UPDATE":
              setGroceriesData(prev => {
                const id: number = payload.old.id;

                const currentGrocery = prev.find(i => i.id === id);

                const filtered = prev.filter(i => i.id !== id);

                return [
                  ...filtered,
                  { ...currentGrocery, ...payload.new },
                ].sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
              });
              break;

            case "DELETE":
              setGroceriesData(prev => {
                const id: number = payload.old.id;

                return prev
                  .filter(i => i.id !== id)
                  .sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
              });
              break;

            default:
              console.log("Unhandled event:", payload);
          }
        },
      )
      .subscribe();

    return () => channel.unsubscribe();
  }, []);

  return (
    <section className="container mx-auto px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium my-2">Groceries</h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setListType("meals")}
            variant={listType === "meals" ? "secondary" : "ghost"}
          >
            Meals
          </Button>
          <Button
            onClick={() => setListType("groceries")}
            variant={listType === "groceries" ? "secondary" : "ghost"}
          >
            Groceries
          </Button>
        </div>
      </div>

      <Accordion
        value={["groceries", "meals"]}
        defaultValue={["groceries", "meals"]}
        type="multiple"
      >
        {listType === "groceries" && (
          <AccordionItem value="groceries">
            <AccordionTrigger>Groceries</AccordionTrigger>
            <AccordionContent>
              <ul className="flex flex-col gap-4">
                {groceryGroups.map(([idx, group]) => (
                  <GroceryGroup key={idx} group={group} />
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        )}

        {listType === "meals" && (
          <AccordionItem value="meals">
            <AccordionTrigger>Meals</AccordionTrigger>
            <AccordionContent>
              <ul className="flex flex-col gap-4">
                {mealGroceries.map(meal => (
                  <MealGroceries key={meal.id} meal={meal} />
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        )}

        <AccordionItem value="isBought">
          <AccordionTrigger>
            <span>Checked groceries</span>
          </AccordionTrigger>
          <AccordionContent></AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
