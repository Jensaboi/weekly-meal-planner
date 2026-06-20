import Link from "next/link";
import { getRecipes } from "../recipe.data";
import RecipeCard from "./RecipeCard";

export default async function RecipeGrid() {
  const recipes = await getRecipes();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-6">
      {recipes.map(recipe => (
        <Link className="block" key={recipe.id} href={`/recipes/${recipe.id}`}>
          <RecipeCard recipe={recipe} />
        </Link>
      ))}
    </div>
  );
}
