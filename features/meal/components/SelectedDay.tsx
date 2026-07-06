import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardAction,
  CardDescription,
} from "@/components/ui/card";
import type { MealCardData } from "../meal.type.ts";
import MealItem from "./MealItem";
import { capitalizeFirstLetter } from "@/lib/utils";

export default function SelectedDay({
  date,
  meals,
}: {
  date: Date | undefined;
  meals: MealCardData[];
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
      <CardContent>
        <CardHeader>
          <CardTitle className="text-lg font-semibold mb-4">
            {capitalizeFirstLetter(
              date?.toLocaleDateString("sv-SE", options) ?? "No date selected",
            )}
          </CardTitle>
        </CardHeader>
        {meals.length === 0 ? (
          <CardDescription>No meals planned for this day.</CardDescription>
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
