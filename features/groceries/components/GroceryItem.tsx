"use client";
import { Item, ItemActions } from "@/components/ui/item";
import { GroceryType } from "../groceries.type";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Check, Loader, Trash } from "lucide-react";
import { useTransition } from "react";
import { deleteGrocery, toggleIsBought } from "../groceries.action";
import ActionButton from "@/components/ActionButton";
import { Button } from "@/components/ui/button";

export default function GroceryItem({ grocery }: { grocery: GroceryType }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Item variant={grocery.is_bought ? "muted" : "outline"} asChild>
      <li className="flex items-center justify-between">
        <span>
          {grocery.amount} {grocery.unit} {capitalizeFirstLetter(grocery.name)}
        </span>
        <ItemActions className="flex items-center gap-2">
          <Button
            variant={"secondary"}
            onClick={() =>
              startTransition(async () => {
                if (!grocery.id) return;

                await toggleIsBought(grocery.id, !grocery.is_bought);
              })
            }
            className="hover:cursor-pointer size-5 border rounded-sm flex items-center justify-center"
          >
            {grocery.is_bought && !isPending && <Check />}
            {isPending && <Loader className="animate-spin" />}
          </Button>
          <ActionButton
            action={() => deleteGrocery(grocery.id)}
            className="hover:cursor-pointer"
          >
            <Trash size={20} />
          </ActionButton>
        </ItemActions>
      </li>
    </Item>
  );
}
