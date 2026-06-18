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

export default function RecipeCard({ recipe }: { recipe: RecipeCardData }) {
  const categories = recipe.categories as RecipeCategory[];

  return (
    <Card>
      <CardHeader>
        {/*<Image alt={recipe.name ?? ""} />*/}
        <CardTitle>{recipe.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardAction className="w-full">
          {categories.map(category => (
            <Badge key={category.id}>{category.name}</Badge>
          ))}
        </CardAction>

        <CardDescription>{recipe.description}</CardDescription>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
