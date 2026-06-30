import { requireUser } from "@/features/auth/auth.data";

export default async function DashboardPage() {
  await requireUser("/dashboard");

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
