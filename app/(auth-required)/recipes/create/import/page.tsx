import { requireUser } from "@/features/auth/auth.data";

export default async function ImportNewRecipe() {
  await requireUser("/recipes/create/import");
  return <h1>Import recipe</h1>;
}
