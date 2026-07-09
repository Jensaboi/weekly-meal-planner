"use client";

import { useEffect, useState } from "react";
import { GroceryItem, MealGroceryItem } from "../groceries.type";
import { createClient } from "@/lib/supabase/client";
import Grocery from "./Grocery";
import MealGrocery from "./MealGrocery";

export default function GroceriesList({
  groceries,
  mealGroceries,
}: {
  groceries: GroceryItem[];
  mealGroceries: MealGroceryItem[];
}) {
  const [groceriesData, setGroceriesData] = useState<GroceryItem[]>(groceries);
  const [mealGroceriesData, setMealGroceriesData] =
    useState<MealGroceryItem[]>(mealGroceries);

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
        },
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "meal_groceries",
        },
        payload => {
          console.log("Change received!", payload);
        },
      )
      .subscribe();

    return () => channel.unsubscribe();
  }, []);

  console.log("groceries", groceriesData);
  console.log("meal groceries", mealGroceriesData);

  return (
    <section className="container mx-auto px-4">
      <h1>Groceries</h1>
      <ul>
        {groceriesData.map(grocery => (
          <Grocery key={grocery.id} grocery={grocery} />
        ))}

        {mealGroceriesData.map(grocery => (
          <MealGrocery key={grocery.ingredient_id} mealGrocery={grocery} />
        ))}
      </ul>
    </section>
  );
}
