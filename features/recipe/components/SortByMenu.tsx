import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function SortByMenu() {
  const options = [];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size={"xs"}>
          Sort by <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end"></DropdownMenuContent>
    </DropdownMenu>
  );
}
