import { requireUser } from "@/features/auth/auth.data";

export default async function ImportNewRecipe() {
  const user = await requireUser();
  return <h1>Import recipe</h1>;
}
