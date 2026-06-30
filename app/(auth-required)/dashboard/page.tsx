import { requireUser } from "@/features/auth/auth.data";

export default async function DashboardPage() {
  const user = await requireUser();

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
