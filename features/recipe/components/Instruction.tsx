"use client";

import { useState } from "react";
import { InstructionData } from "../recipe.types";
import { Item, ItemDescription, ItemTitle } from "@/components/ui/item";

export default function Instruction({
  instruction,
}: {
  instruction: InstructionData;
}) {
  const [isChecked, setIsChecked] = useState();
  return (
    <Item variant={isChecked ? "muted" : "outline"} asChild>
      <li>
        <ItemTitle>{instruction.step}</ItemTitle>
        <ItemDescription>{instruction.description}</ItemDescription>
      </li>
    </Item>
  );
}
