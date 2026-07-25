"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { requireUser } from "../auth/auth.data";
import { getHousehold } from "../household/household.data";

export async function setIsBought(groceryId: number, bool: boolean) {
  const userId = await requireUser("/groceries");
  const household = await getHousehold();

  const supabase = await createClient();

  if (!groceryId) return { success: false, error: "Grocery id is required." };

  const query = supabase
    .from("groceries")
    .update({ is_bought: bool })
    .eq("id", groceryId);

  if (household?.id) {
    query.eq("household_id", household.id);
  } else {
    query.eq("user_id", userId);
  }

  const { error } = await query;

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/groceries");

  return { success: true, error: null };
}

export async function deleteGrocery(groceryId: number) {
  const userId = await requireUser("/groceries");
  const household = await getHousehold();

  const supabase = await createClient();

  const query = supabase.from("groceries").delete().eq("id", groceryId);

  if (household?.id) {
    query.eq("household_id", household.id);
  } else {
    query.eq("user_id", userId);
  }

  const { error } = await query;

  if (error) throw error;

  return true;
}

export async function setGroceriesIsBought(
  groceryIds: number[],
  bool: boolean,
) {
  const userId = await requireUser();

  const household = await getHousehold();

  const supabase = await createClient();

  const query = supabase
    .from("groceries")
    .update({ is_bought: bool })
    .in("id", groceryIds);

  if (household?.id) {
    query.eq("household_id", household.id);
  } else {
    query.eq("user_id", userId);
  }

  const { error } = await query;

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}

export async function deleteGroceries(groceryIds: number[]) {
  const userId = await requireUser();

  const household = await getHousehold();

  const supabase = await createClient();

  const query = supabase.from("groceries").delete().in("id", groceryIds);

  if (household?.id) {
    query.eq("household_id", household.id);
  } else {
    query.eq("user_id", userId);
  }

  const { error } = await query;

  if (error) throw error;

  return true;
}
