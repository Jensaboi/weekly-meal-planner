import { requireUser } from "@/features/auth/auth.data";

export default async function GroceriesPage() {
  const user = await requireUser();
  return (
    <div>
      <h1>Groceries</h1>
    </div>
  );
}
