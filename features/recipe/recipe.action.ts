"use server";

import { redirect } from "next/navigation";
import { getUser } from "../user/user.data";
import { NewReview } from "./recipe.schema";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function sendReviewAction(prevState: unknown, formData: FormData) {
  const user = await getUser();

  if (!user) redirect("/sign-in");

  const input = {
    author_id: user.id,
    rating: Number(formData.get("rating") as string),
    comment: formData.get("comment") as string | null,
    recipe_id: Number(formData.get("recipeId") as string),
  };

  const review = NewReview.safeParse(input);

  if (!review.success) {
    return { success: false, error: review.error.issues[0].message };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("recipe_reviews").insert(review.data);

  console.log(error);
  if (error) {
    if (error.code === "23514")
      return {
        success: false,
        error: "You must leave a star between 1 - 5 to leave a review.",
      };

    if (error.code === "23505")
      return {
        success: false,
        error: "You have already left a review for this recipe.",
      };

    return { success: false, error: error.message };
  }

  revalidatePath(`/recipes/${review.data.recipe_id}`);

  return {
    success: true,
    error: null,
  };
}
