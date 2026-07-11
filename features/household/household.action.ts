"use server";

import { redirect } from "next/navigation";
import { getUser } from "../user/user.data";
import { NewHouseholdRpc } from "./household.schema";
import { createClient } from "@/lib/supabase/server";

export async function createHousehold(formData: FormData) {
  const user = await getUser();

  if (!user) redirect("/sign-in");

  const input = {
    name: formData.get("name") as string,
    user_id: user.id,
  };

  const { data, success, error } = NewHouseholdRpc.safeParse(input);

  if (!success) {
    return { success: false, error: error.issues[0].message };
  }

  const supabase = await createClient();

  const { error: insertError } = await supabase.rpc("create_household", {
    name: data.name,
  });

  if (insertError) {
    return { success: false, error: "Failed to create household" };
  }

  return { success: true, error: null };
}

export async function leaveHousehold() {
  const user = await getUser();

  if (!user) redirect("/sign-in");

  const supabase = await createClient();

  const { error } = await supabase.rpc("leave_household");

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}

export async function joinHousehold(formData: FormData) {
  const inviteCode = formData.get("inviteCode") as string;

  if (!inviteCode || inviteCode.trim() === "") {
    return { success: false, error: "Invalid invite code." };
  }

  const supabase = await createClient();

  const { error } = await supabase.rpc("join_household", {
    code: inviteCode,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}

export async function sendInvitationEmail(formData: FormData) {}
