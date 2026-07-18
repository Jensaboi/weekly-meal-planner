import { requireUser } from "@/features/auth/auth.data";
import GroceryLists from "@/features/groceries/components/GroceryLists";
import { getGroceries } from "@/features/groceries/groceries.data";
import { getMeals } from "@/features/meal/meal.data";

export default async function GroceriesPage() {
  await requireUser("/groceries");

  const groceries = await getGroceries();

  const meals = await getMeals();

  return (
    <>
      <GroceryLists groceries={groceries ?? []} meals={meals} />
    </>
  );
}
