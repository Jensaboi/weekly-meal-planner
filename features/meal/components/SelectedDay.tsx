import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardAction,
  CardDescription,
} from "@/components/ui/card";
import type { MealCardType } from "../meal.type.ts";
import MealItem from "./MealItem";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link.js";

export default function SelectedDay({
  date,
  meals,
}: {
  date: Date | undefined;
  meals: MealCardType[];
}) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const breakfast = meals.find(meal => meal.meal_type === "breakfast");
  const lunch = meals.find(meal => meal.meal_type === "lunch");
  const dinner = meals.find(meal => meal.meal_type === "dinner");
  const snack = meals.find(meal => meal.meal_type === "snack");

  return (
    <Card>
      <CardContent className="w-full h-full">
        <CardHeader>
          <CardTitle className="text-lg text-center font-semibold mb-4">
            {capitalizeFirstLetter(
              date?.toLocaleDateString("sv-SE", options) ?? "No date selected",
            )}
          </CardTitle>
        </CardHeader>
        {meals.length === 0 ? (
          <div className="h-full flex flex-col gap-4">
            <CardDescription className="text-center">
              No meals planned for this day.
            </CardDescription>
            <div className="flex-1 flex justify-center items-center">
              <Button title="Add Meal" variant={"outline"} asChild>
                <Link href="/recipes">
                  <Plus className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <ul className="flex flex-col gap-4">
              {breakfast && (
                <li>
                  <MealItem meal={breakfast} />
                </li>
              )}
              {lunch && (
                <li>
                  <MealItem meal={lunch} />
                </li>
              )}
              {dinner && (
                <li>
                  <MealItem meal={dinner} />
                </li>
              )}
              {snack && (
                <li>
                  <MealItem meal={snack} />
                </li>
              )}
            </ul>
          </div>
        )}
        <CardFooter>
          <CardAction></CardAction>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
