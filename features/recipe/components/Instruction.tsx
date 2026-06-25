"use client";

import { useState } from "react";
import { InstructionData } from "../recipe.types";
import { Item, ItemDescription } from "@/components/ui/item";
import { Check } from "lucide-react";
import clsx from "clsx";

export default function Instruction({
  instruction,
}: {
  instruction: InstructionData;
}) {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Item variant={isChecked ? "muted" : "outline"} asChild>
      <li className="grid grid-cols-[20px_1fr]">
        <button
          onClick={() => setIsChecked(prev => !prev)}
          className="size-4 border border-border hover:cursor-pointer flex items-center justify-center"
        >
          {isChecked && <Check />}
        </button>

        <ItemDescription className={clsx(isChecked && "line-through")}>
          <strong>{instruction.step}.</strong> {instruction.description}
        </ItemDescription>
      </li>
    </Item>
  );
}
