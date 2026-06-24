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
    console.error(review.error.issues[0].message);
    return { success: false, error: review.error.issues[0].message };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("recipe_reviews").insert(review.data);

  if (error) {
    console.error(error.message);
    return { success: false, error: error.message };
  }

  revalidatePath(`/recipes/${review.data.recipe_id}`);

  return { success: true, error: null };
}
