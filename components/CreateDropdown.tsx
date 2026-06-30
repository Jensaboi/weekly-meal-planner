import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

export default function CreateDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger title="create" asChild>
        <Button variant={"ghost"}>
          <Plus />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-medium">Recipe</DropdownMenuLabel>

          <DropdownMenuItem asChild>
            <Link href={"/recipes/create/new"}>Create new recipe</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/recipes/create/import"}>Import recipe</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
