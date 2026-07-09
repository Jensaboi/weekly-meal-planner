import { requireUser } from "@/features/auth/auth.data";
import GroceriesList from "@/features/groceries/components/GroceriesList";
import {
  getGroceries,
  getMealGroceries,
} from "@/features/groceries/groceries.data";
import { getMeals } from "@/features/meal/meal.data";

export default async function GroceriesPage() {
  await requireUser("/groceries");

  const groceries = await getGroceries();

  const meals = await getMeals();

  const mealIds = meals.map(meal => meal.id).filter(Boolean) as number[];
  const mealGroceries = await getMealGroceries(mealIds);

  return (
    <>
      <GroceriesList
        groceries={groceries ?? []}
        mealGroceries={mealGroceries}
      />
    </>
  );
}
