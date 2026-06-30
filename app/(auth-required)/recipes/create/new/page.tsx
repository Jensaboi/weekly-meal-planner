import { requireUser } from "@/features/auth/auth.data";

export default async function CreateNewRecipe() {
  const user = await requireUser();
  return <h1>Create new</h1>;
}
