"use server";

import { createClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export async function requireUser(redirectTo?: string): Promise<User> {
  if (!redirectTo) redirectTo = "/sign-in";

  const supabase = await createClient();

  const {
    data: { claims },
    error,
  } = await supabase.auth.getClaims();

  if (error) redirect(redirectTo);

  if (!claims) redirect(redirectTo);

  return claims;
}
