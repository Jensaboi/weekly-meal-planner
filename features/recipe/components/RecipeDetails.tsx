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
import { Heart } from "lucide-react";
import Image from "next/image";

export default async function RecipeDetails({ id }: { id: number }) {
  const recipe = await getRecipeDetails(id);

  if (!recipe) return notFound();

  console.log(recipe);

  const ingredients = (recipe?.ingredients as IngredientData[]) ?? [];
  const instructions = (recipe?.instructions as InstructionData[]) ?? [];
  const images = (recipe?.images as RecipeImageData[]) ?? [];
  //need to update recipe_details view to include categories correctly.

  const defaultImage = images.find(img => img.is_default) ?? images[0];

  const defaultImageUrl = await getRecipeImageUrl(defaultImage.img_path);
  return (
    <section className="mx-auto container flex flex-col gap-4 lg:gap-8 p-4">
      <article className="min-h-120 grid md:grid-cols-2 gap-4 lg:gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <Button size={"lg"}>Plan as meal</Button>
            <Button variant={"ghost"} size={"icon-lg"} className="rounded-full">
              <Heart />
            </Button>
          </div>
          <p>{recipe.description}</p>
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
    </section>
  );
}
