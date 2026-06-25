import { notFound } from "next/navigation";
import { getRecipeDetails, getRecipeImageUrl } from "../recipe.data";
import {
  IngredientData,
  InstructionData,
  RecipeCategory,
  RecipeImageData,
} from "../recipe.types";
import Ingredient from "./Ingredient";
import Instruction from "./Instruction";
import { Button } from "@/components/ui/button";
import {
  Clock,
  CookingPot,
  Ham,
  Heart,
  MessageSquare,
  Utensils,
} from "lucide-react";
import Image from "next/image";
import ReviewStars from "@/components/ReviewStars";
import { Suspense } from "react";
import RecipeReviews from "./RecipeReviews";
import { Badge } from "@/components/ui/badge";
import PlanMealModal from "@/features/meal/components/PlanMealModal";

export default async function RecipeDetails({ id }: { id: number }) {
  const recipe = await getRecipeDetails(id);

  if (!recipe) return notFound();

  const categories = (recipe.categories as RecipeCategory[]) ?? [];
  const ingredients = (recipe?.ingredients as IngredientData[]) ?? [];
  const instructions = (recipe?.instructions as InstructionData[]) ?? [];
  const images = (recipe?.images as RecipeImageData[]) ?? [];
  const defaultImage = images.find(img => img.is_default) ?? images[0];
  const defaultImageUrl = await getRecipeImageUrl(defaultImage.img_path);

  //Multiple images??

  return (
    <section className="mx-auto container flex flex-col gap-4 lg:gap-8 xl:gap-16 py-16 p-4 lg:p-8">
      <article className="min-h-140 grid md:grid-cols-2 gap-4 lg:gap-8 md:[grid-template-areas:'left_right']">
        <div className="relative h-full min-h-100 w-full md:[grid-area:right]">
          <Image
            fill
            className="object-fit"
            alt={recipe.name ?? ""}
            src={defaultImageUrl}
          />
        </div>

        <div className="md:[grid-area:left]">
          <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <ReviewStars avgRating={recipe.avg_rating} />
              <span>{recipe.total_reviews}</span>
            </div>

            <div className="flex items-center gap-2">
              <MessageSquare />
              <span>{recipe.total_reviews}</span>
            </div>
          </div>

          <div className="flex items-center  gap-6 mb-8">
            <div title="Preparation time" className="flex items-center gap-2">
              <Clock size={18} />
              <span>{recipe.prep_time} min</span>
            </div>

            <div title="Cooking time" className="flex items-center gap-2">
              <CookingPot size={18} />
              <span>{recipe.cooking_time} min</span>
            </div>

            <div title="Portions" className="flex items-center gap-2">
              <Utensils size={18} />
              <span>{recipe.portions}</span>
            </div>

            <div title="Total ingredients" className="flex items-center gap-2">
              <Ham size={18} />
              <span>{ingredients.length}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 my-4">
            {categories.map(category => (
              <Badge key={category.id}>{category.name}</Badge>
            ))}
          </div>

          <p className="tracking-wide leading-relaxed mb-12">
            {recipe.description}
          </p>

          <div className="flex items-center gap-4 my-4">
            <PlanMealModal householdId={null} recipeId={id} />

            <Button variant={"secondary"} size={"lg"}>
              <Heart />
              Save recipe
            </Button>
          </div>
        </div>
      </article>

      <div className="grid md:grid-cols-2 lg:gap-8 gap-4 min-h-140">
        <div className="md:order-2 py-8">
          <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
          <ul className="flex flex-col gap-2">
            {ingredients.map(ingredient => (
              <Ingredient key={ingredient.id} ingredient={ingredient} />
            ))}
          </ul>
        </div>

        <div className="md:order-1 py-8">
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
          <ol className="flex flex-col gap-2">
            {instructions.map(instruction => (
              <Instruction key={instruction.id} instruction={instruction} />
            ))}
          </ol>
        </div>
      </div>

      <Suspense fallback="Loading...">
        <RecipeReviews id={id} />
      </Suspense>
    </section>
  );
}
