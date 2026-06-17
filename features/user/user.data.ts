import { createClient } from "@/lib/supabase/server";

export async function getUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user) return null;

  if (error) return null;

  if (user) return user;

  return null;
}
