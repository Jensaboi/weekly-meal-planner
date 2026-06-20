import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function RecipeFilters() {
  const filters: {
    trigger: string;
    content: React.ReactNode;
    align: "start" | "end" | "center";
  }[] = [
    { trigger: "Course", content: "", align: "start" },
    { trigger: "Cuisine", content: "", align: "start" },
    { trigger: "Dietary", content: "", align: "start" },
    { trigger: "Holidays", content: "", align: "start" },
    { trigger: "Rating", content: "", align: "start" },
    { trigger: "Portions", content: "", align: "end" },
    { trigger: "With ingredients", content: "", align: "end" },
    { trigger: "Without ingredients", content: "", align: "end" },
    { trigger: "Cooking time", content: "", align: "end" },
    { trigger: "Prep time", content: "", align: "end" },
  ];

  return (
    <div className="flex items-center gap-2 mb-4">
      {filters.map(filter => (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"outline"}>{filter.trigger}</Button>
          </PopoverTrigger>
          <PopoverContent align={filter.align}>{filter.content}</PopoverContent>
        </Popover>
      ))}
    </div>
  );
}
