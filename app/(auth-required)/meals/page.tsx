import { requireUser } from "@/features/auth/auth.data";
import MealsCalendar from "@/features/meal/components/MealsCalendar";
import { getMeals } from "@/features/meal/meal.data";

export default async function MealsPage() {
  await requireUser("/meals");

  const meals = await getMeals();

  return (
    <>
      <MealsCalendar meals={meals} />
    </>
  );
}
