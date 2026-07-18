"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { requireUser } from "../auth/auth.data";

export async function toggleIsBought(groceryId: number, bool: boolean) {
  await requireUser("/groceries");

  const supabase = await createClient();

  if (!groceryId) return { success: false, error: "Grocery id is required." };

  const { error } = await supabase
    .from("groceries")
    .update({ is_bought: bool })
    .eq("id", groceryId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/groceries");

  return { success: true, error: null };
}

export async function deleteGrocery(groceryId: number) {
  await requireUser("/groceries");

  const supabase = await createClient();

  const { error } = await supabase
    .from("groceries")
    .delete()
    .eq("id", groceryId);

  if (error) throw error;

  return true;
}

export async function setGroceriesIsBought(
  groceryIds: number[],
  bool: boolean,
) {
  await requireUser();

  const supabase = await createClient();

  const { error } = await supabase
    .from("groceries")
    .update({ is_bought: bool })
    .in("id", groceryIds);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}
