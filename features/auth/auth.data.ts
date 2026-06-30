"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function requireUser(redirectTo?: string) {
  if (!redirectTo) redirectTo = "/";

  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (error) redirect(`/sign-in?redirectTo=${redirectTo}`);

  if (!data?.claims) redirect(`/sign-in?redirectTo=${redirectTo}`);
}
