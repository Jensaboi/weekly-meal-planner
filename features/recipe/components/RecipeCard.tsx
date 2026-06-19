import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RecipeCardData, RecipeCategory } from "../recipe.types";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { Clock, CookingPot, MessageSquare, Star, Utensils } from "lucide-react";

export default function RecipeCard({ recipe }: { recipe: RecipeCardData }) {
  const categories = recipe.categories as RecipeCategory[];

  const supabase = createClient();

  const {
    data: { publicUrl },
  } = supabase.storage.from("recipe_images").getPublicUrl(recipe.image ?? "");

  return (
    <Card>
      <CardHeader className="">
        <div className="relative w-full h-80">
          <Image
            objectFit="cover"
            fill
            loading="eager"
            alt={recipe.name ?? ""}
            src={publicUrl}
          />
        </div>

        <CardTitle>{recipe.name}</CardTitle>
        <div className="flex justify-start items-center gap-4">
          <div className="flex items-center gap-1">
            <Star fill="yellow" strokeWidth={1} size={14} />
            <span className="text-xs">{recipe.avg_rating} / 5</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare size={14} />
            <span className="text-xs">{recipe.total_reviews} reviews</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <CardAction className="w-full">
          {categories.map(category => (
            <Badge key={category.id}>{category.name}</Badge>
          ))}
        </CardAction>
        <div className="flex justify-start items-center gap-4">
          <div className="flex items-center gap-1" title="Portions amount">
            <Utensils size={14} />
            <span className="text-xs font-medium">{recipe.portions}</span>
          </div>
          <div className="flex items-center gap-2" title="Cooking time">
            <CookingPot size={14} />
            <span className="text-xs font-medium">
              {recipe.cooking_time} min
            </span>
          </div>
          <div className="flex items-center gap-2" title="Preparation time">
            <Clock size={14} />
            <span className="text-xs font-medium">{recipe.prep_time} min</span>
          </div>
        </div>

        <CardDescription>{recipe.description}</CardDescription>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
