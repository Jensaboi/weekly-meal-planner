import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { MealCardType } from "../meal.type";
import { Clock, FileCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { capitalizeFirstLetter } from "@/lib/utils";
import Link from "next/link";

export default function MealItem({ meal }: { meal: MealCardType }) {
  return (
    <Item>
      <ItemContent>
        <ItemHeader className="flex flex-col items-start gap-1">
          <ItemTitle className="text-lg font-semibold">
            {capitalizeFirstLetter(meal.meal_type ?? "unknown")}
          </ItemTitle>
          <span className=" font-medium">{meal.name}</span>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div title="Cooking Time" className="flex items-center gap-2">
              <Clock size={16} />
              <span>{meal.cooking_time} min</span>
            </div>
            <div title="Preparation Time" className="flex items-center gap-2">
              <FileCog size={16} />
              <span>{meal.prep_time} min</span>
            </div>
          </div>
          <ItemDescription className=" my-2 text-sm text-muted-foreground">
            {meal.description}
          </ItemDescription>
        </ItemHeader>
        <ItemFooter>
          <ItemActions className="flex items-center gap-2 py-2">
            <Button variant={"default"}>Cook meal</Button>
            <Button variant={"secondary"} asChild>
              <Link href={`/recipes/${meal.recipe_id}`}>View recipe</Link>
            </Button>
          </ItemActions>
        </ItemFooter>
      </ItemContent>
    </Item>
  );
}
