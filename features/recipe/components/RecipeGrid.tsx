import { getRecipes } from "../recipe.data";
import RecipeCard from "./RecipeCard";

export default async function RecipeGrid() {
  const recipes = await getRecipes();

  console.log(recipes);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
