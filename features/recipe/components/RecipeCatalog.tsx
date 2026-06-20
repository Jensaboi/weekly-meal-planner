import RecipeFilters from "./RecipeFilters";
import RecipeGrid from "./RecipeGrid";
import SortByMenu from "./SortByMenu";

export default function RecipeCatalog() {
  return (
    <section className="container mx-auto px-4">
      <h1 className="text-3xl font-bold tracking-tight mb-4">Recipes</h1>
      <RecipeFilters />
      <div className="w-full flex items-center justify-end">
        <SortByMenu />
      </div>
      <RecipeGrid />
    </section>
  );
}
