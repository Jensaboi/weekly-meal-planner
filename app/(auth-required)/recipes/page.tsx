import { requireUser } from "@/features/auth/auth.data";
import RecipeCatalog from "@/features/recipe/components/RecipeCatalog";

export default async function RecipesPage() {
  const user = await requireUser();
  return (
    <>
      <RecipeCatalog />
    </>
  );
}
