import { notFound } from "next/navigation";
import { getRecipeDetails, getRecipeImageUrl } from "../recipe.data";
import {
  IngredientData,
  InstructionData,
  RecipeImageData,
} from "../recipe.types";
import Ingredient from "./Ingredient";
import Instruction from "./Instruction";
import { Button } from "@/components/ui/button";
import {
  Calendar,
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

export default async function RecipeDetails({ id }: { id: number }) {
  const recipe = await getRecipeDetails(id);

  if (!recipe) return notFound();

  const ingredients = (recipe?.ingredients as IngredientData[]) ?? [];
  const instructions = (recipe?.instructions as InstructionData[]) ?? [];
  const images = (recipe?.images as RecipeImageData[]) ?? [];
  const defaultImage = images.find(img => img.is_default) ?? images[0];
  const defaultImageUrl = await getRecipeImageUrl(defaultImage.img_path);

  //Need to update recipe_details view to include categories correctly.
  //Multiple images??

  return (
    <section className="mx-auto container flex flex-col gap-4 lg:gap-8 p-4">
      <article className="min-h-120 grid md:grid-cols-2 gap-4 lg:gap-8">
        <div>
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

          {/* Recipe categories goes here */}

          <p className="tracking-wide leading-relaxed">{recipe.description}</p>

          <div className="flex items-center gap-4 my-4">
            <Button size={"lg"}>
              <Calendar />
              Plan as a meal
            </Button>

            <Button variant={"secondary"} size={"lg"}>
              <Heart />
              Save recipe
            </Button>
          </div>
        </div>
        <div className="relative h-full w-full">
          <Image fill alt={recipe.name ?? ""} src={defaultImageUrl} />
        </div>
      </article>

      <div className="grid md:grid-cols-2 lg:gap-8 gap-4">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
          <ol className="flex flex-col gap-2">
            {instructions.map(instruction => (
              <Instruction key={instruction.id} instruction={instruction} />
            ))}
          </ol>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
          <ul className="flex flex-col gap-2">
            {ingredients.map(ingredient => (
              <Ingredient key={ingredient.id} ingredient={ingredient} />
            ))}
          </ul>
        </div>
      </div>

      <Suspense fallback="Loading...">
        <RecipeReviews id={id} />
      </Suspense>
    </section>
  );
}
