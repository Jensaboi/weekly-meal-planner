import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RecipeCardType, RecipeCategoryType } from "../recipe.types";

import { createClient } from "@/lib/supabase/client";
import { Clock, CookingPot, MessageSquare, Utensils } from "lucide-react";
import Image from "next/image";
import ReviewStars from "@/components/ReviewStars";
import { Badge } from "@/components/ui/badge";

export default function RecipeCard({ recipe }: { recipe: RecipeCardType }) {
  const categories = recipe.categories as RecipeCategoryType[];

  const supabase = createClient();

  const {
    data: { publicUrl },
  } = supabase.storage.from("recipe_images").getPublicUrl(recipe.image ?? "");

  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-col gap-4">
        <div className="relative w-full h-80">
          <Image
            objectFit="cover"
            fill
            loading="eager"
            alt={recipe.name ?? ""}
            src={publicUrl}
          />
        </div>

        <div className="flex flex-col gap-1">
          <CardTitle>{recipe.name}</CardTitle>

          <div className="flex justify-start items-center gap-4">
            <div className="flex items-center gap-2">
              <ReviewStars starSize={14} rating={recipe.avg_rating} />
              <span className="text-xs">{recipe.total_reviews}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare size={14} />
              <span className="text-xs">{recipe.total_review_comments}</span>
            </div>
          </div>
        </div>

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

        <CardAction className="w-full flex gap-1 flex-wrap">
          {categories.map(category => (
            <Badge variant={"secondary"} key={category.id}>
              {category.name}
            </Badge>
          ))}
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <CardDescription className="line-clamp-3">
          {recipe.description}
        </CardDescription>
      </CardContent>

      <CardFooter></CardFooter>
    </Card>
  );
}
