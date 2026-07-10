import { notFound } from "next/navigation";
import {
  getMyReview,
  getRecipeDetails,
  getRecipeImageUrl,
} from "../recipe.data";
import {
  IngredientType,
  InstructionType,
  RecipeCategoryType,
  RecipeImageType,
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
import CreateReviewModal from "./CreateReviewModal";
import Review from "./Review";

export default async function RecipeDetails({ id }: { id: number }) {
  const recipe = await getRecipeDetails(id);

  const myReview = await getMyReview(id);

  if (!recipe) return notFound();

  const categories = (recipe.categories as RecipeCategoryType[]) ?? [];
  const ingredients = (recipe?.ingredients as IngredientType[]) ?? [];
  const instructions = (recipe?.instructions as InstructionType[]) ?? [];
  const images = (recipe?.images as RecipeImageType[]) ?? [];
  const defaultImage = images.find(img => img.is_default) ?? images[0];
  const defaultImageUrl = await getRecipeImageUrl(defaultImage.path);

  //Multiple images??

  return (
    <section className="mx-auto container flex flex-col gap-16 py-16 p-4 lg:p-8">
      <article className="min-h-140 grid md:grid-cols-2 gap-16 md:[grid-template-areas:'left_right']">
        <div className="relative h-full min-h-100 w-full md:[grid-area:right]">
          <Image
            fill
            className="object-fit"
            alt={recipe.name ?? ""}
            src={defaultImageUrl}
          />
        </div>

        <div className="md:[grid-area:left] flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <ReviewStars rating={recipe.avg_rating} />
                <span>{recipe.total_reviews}</span>
              </div>

              <div className="flex items-center gap-2">
                <MessageSquare />
                <span>{recipe.total_review_comments}</span>
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

              <div
                title="Total ingredients"
                className="flex items-center gap-2"
              >
                <Ham size={18} />
                <span>{ingredients.length}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 my-4">
              {categories.map(category => (
                <Badge key={category.id}>{category.name}</Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="tracking-wide leading-relaxed mb-8">
              {recipe.description}
            </p>

            <div className="flex items-center gap-4 my-4">
              <PlanMealModal recipeId={id} />

              <Button variant={"secondary"} size={"lg"}>
                <Heart />
                Save recipe
              </Button>
            </div>
          </div>

          <Suspense fallback={"Loading..."}>
            {myReview ? (
              <div>
                <span className="text-sm text-muted-foreground font-semibold mb-4 block">
                  My review
                </span>
                <Review review={myReview} />
              </div>
            ) : (
              <CreateReviewModal recipeId={id} />
            )}
          </Suspense>
        </div>
      </article>

      <div className="grid md:grid-cols-2 gap-16 min-h-140">
        <div className="md:order-2">
          <h2 className="text-2xl font-semibold mb-8">Ingredients</h2>
          <ul className="flex flex-col gap-4">
            {ingredients.map(ingredient => (
              <Ingredient key={ingredient.id} ingredient={ingredient} />
            ))}
          </ul>
        </div>

        <div className="md:order-1">
          <h2 className="text-2xl font-semibold mb-8">Instructions</h2>
          <ol className="flex flex-col gap-4">
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
