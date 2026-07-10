"use client";

import ClickableReviewStars from "@/components/ClickableReviewStars";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition } from "react";
import { sendReviewAction } from "../recipe.action";
import { toast } from "sonner";
import ReviewStars from "@/components/ReviewStars";

export default function CreateReviewModal({ recipeId }: { recipeId: number }) {
  const [stars, setStars] = useState<number>(0);

  const [isPending, startTransition] = useTransition();

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
    <Dialog>
      <DialogTrigger>
        <div className="bg-muted p-4 rounded-md min-w-80 flex flex-col items-center justify-center gap-4">
          <h3 className="tracking-wide text-lg font-medium">
            What did you think?
          </h3>

          <ReviewStars rating={stars} />
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">
            Leave a review
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 items-start"
        >
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
          <Input type="hidden" id="recipeId" name="recipeId" value={recipeId} />
          <ClickableReviewStars state={stars} setState={setStars} />
          <Button disabled={isPending} className="mt-4" type="submit">
            Leave a review
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
