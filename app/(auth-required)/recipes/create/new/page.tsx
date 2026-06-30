import { requireUser } from "@/features/auth/auth.data";

export default async function CreateNewRecipe() {
  await requireUser("/recipes/create/new");
  return <h1>Create new</h1>;
}
