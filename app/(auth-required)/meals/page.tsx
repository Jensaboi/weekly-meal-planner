import { requireUser } from "@/features/auth/auth.data";

export default async function MealsPage() {
  const user = await requireUser();

  return (
    <div>
      <h1>Meals</h1>
    </div>
  );
}
