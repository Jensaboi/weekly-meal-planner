"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import clsx from "clsx";
import { Star } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { sendReviewAction } from "../recipe.action";
import { toast } from "sonner";

export default function ReviewRecipeForm({ id }: { id: number }) {
  const [stars, setStars] = useState<number>(0);

  const [state, action, isPending] = useActionState(sendReviewAction, null);

  useEffect(() => {
    if (state?.success) {
      setStars(0);
      toast.success("Recipe review created successfully!");
    }

    if (state?.error) {
      toast.warning(state?.error);
    }
  }, [state?.success]);

  return (
    <form action={action} className="flex flex-col gap-2 items-start">
      <Textarea
        id="comment"
        name="comment"
        placeholder="Leave a review here..."
      ></Textarea>
      <Input
        type="hidden"
        id="rating"
        name="rating"
        value={JSON.stringify(stars)}
      />
      <Input type="hidden" id="recipeId" name="recipeId" value={id} />
      <div className="flex items-center gap-2">
        {Array.from({ length: 5 }, (_, i) => {
          return (
            <button type="button" key={i} onClick={() => setStars(i + 1)}>
              <Star
                strokeWidth={1}
                className={clsx(i < stars && "fill-yellow-300")}
              />
            </button>
          );
        })}
      </div>
      <Button disabled={isPending} className="mt-4" type="submit">
        Leave a review
      </Button>
    </form>
  );
}
