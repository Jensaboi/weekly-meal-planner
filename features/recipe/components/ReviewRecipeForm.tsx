"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Star } from "lucide-react";
import { sendReviewAction } from "../recipe.action";

export function ReviewRecipeForm({ id }: { id: number }) {
  const [stars, setStars] = useState<number>(0);
  const [isPending, startTransition] = useTransition();

  const toggleStars = (val: number) => {
    setStars(prev => {
      if (prev === val) {
        setStars(0);
      } else {
        setStars(val);
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await sendReviewAction(formData);

      if (res.success) {
        toast.success("Review submitted!");
        setStars(0);
        e.currentTarget.reset();
      } else {
        toast.error(res.error ?? "Something went wrong");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-start">
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
            <button
              className="hover:cursor-pointer"
              type="button"
              key={i}
              onClick={() => toggleStars(i + 1)}
            >
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
