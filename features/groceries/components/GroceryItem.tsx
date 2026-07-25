"use client";
import { Item, ItemActions } from "@/components/ui/item";
import { GroceryType } from "../groceries.type";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Check, Loader, Trash } from "lucide-react";
import { useTransition } from "react";
import { deleteGrocery, setIsBought } from "../groceries.action";
import ActionButton from "@/components/ActionButton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function GroceryItem({ grocery }: { grocery: GroceryType }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Item variant={grocery.is_bought ? "muted" : "outline"} asChild>
      <li className="flex items-center justify-between">
        <span>
          {grocery.amount} {grocery.unit}{" "}
          {capitalizeFirstLetter(grocery.name ?? "Unknown")}
        </span>
        <ItemActions className="flex items-center gap-2">
          <ActionButton
            variant={"secondary"}
            action={() => {
              if (!grocery.id) {
                toast.error("Failed to check grocery, grocery id is required.");
                return;
              }

              setIsBought(grocery.id, !grocery.is_bought);
            }}
            size={"icon-xs"}
            className="hover:cursor-pointer flex items-center justify-center"
          >
            {grocery.is_bought && !isPending && <Check />}
            {isPending && <Loader className="animate-spin" />}
          </ActionButton>
          <ActionButton
            action={() => {
              if (!grocery.id) {
                toast.error(
                  "Failed to delete grocery, grocery id is required.",
                );
                return;
              }
              deleteGrocery(grocery.id);
            }}
            size={"icon-sm"}
            variant={"ghost"}
            className="hover:cursor-pointer"
          >
            <Trash size={20} />
          </ActionButton>
        </ItemActions>
      </li>
    </Item>
  );
}
