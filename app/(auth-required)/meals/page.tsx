import { requireUser } from "@/features/auth/auth.data";
import CalendarView from "@/features/meal/components/CalendarView";
import { getMeals } from "@/features/meal/meal.data";

export default async function MealsPage() {
  await requireUser("/meals");

  const meals = await getMeals();

  return (
    <>
      <CalendarView meals={meals} />
    </>
  );
}
