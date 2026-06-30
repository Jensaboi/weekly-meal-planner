import { requireUser } from "@/features/auth/auth.data";
import RecipeDetails from "@/features/recipe/components/RecipeDetails";

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await requireUser(`/recipes/${id}`);

  return (
    <>
      <RecipeDetails id={Number(id)} />
    </>
  );
}
