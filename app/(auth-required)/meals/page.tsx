import { requireUser } from "@/features/auth/auth.data";

export default async function MealsPage() {
  await requireUser("/meals");

  return (
    <div>
      <h1>Meals</h1>
    </div>
  );
}
