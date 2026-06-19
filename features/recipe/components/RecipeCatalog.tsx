import RecipeFilters from "./RecipeFilters";
import RecipeGrid from "./RecipeGrid";

export default function RecipeCatalog() {
  return (
    <section className="container mx-auto">
      <h1>Recipes</h1>
      <RecipeFilters />
      <RecipeGrid />
    </section>
  );
}
