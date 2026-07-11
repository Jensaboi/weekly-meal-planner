import Link from "next/link";
import { getRecipes } from "../recipe.data";
import RecipeFilters from "./RecipeFilters";
import SortByMenu from "./SortByMenu";
import RecipeCard from "./RecipeCard";

export default async function RecipeCatalog() {
  const recipes = await getRecipes();
  return (
    <section className="container mx-auto px-4">
      <h1 className="text-3xl font-bold tracking-tight my-8">Recipes</h1>
      <RecipeFilters />

      <div className="w-full flex items-center justify-end">
        <SortByMenu />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {recipes.map(recipe => (
          <Link
            className="block"
            key={recipe.id}
            href={`/recipes/${recipe.id}`}
          >
            <RecipeCard recipe={recipe} />
          </Link>
        ))}
      </div>
    </section>
  );
}
