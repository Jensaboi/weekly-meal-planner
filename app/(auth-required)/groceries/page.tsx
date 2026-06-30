import { requireUser } from "@/features/auth/auth.data";

export default async function GroceriesPage() {
  await requireUser("/groceries");
  return (
    <div>
      <h1>Groceries</h1>
    </div>
  );
}
