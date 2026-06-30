import { requireUser } from "@/features/auth/auth.data";
import RecipeDetails from "@/features/recipe/components/RecipeDetails";

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireUser();
  const { id } = await params;

  return (
    <>
      <RecipeDetails id={Number(id)} />
    </>
  );
}
