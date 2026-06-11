"use server";
import { NewUser, User } from "./auth.schema";
import { createClient } from "../../lib/supabase/server";
import { redirect } from "next/navigation";

export async function signInAction(
  prevState: unknown,
  formData: FormData,
): Promise<{
  message: string;
  success: boolean;
  input: {
    email: string | null;
    password: string | null;
  };
  field?: "email" | "password";
}> {
  const input = {
    email: formData.get("email") as string | null,
    password: formData.get("password") as string | null,
  };

  const user = User.safeParse(input);

  if (user.error) {
    const error = user.error.issues[0];
    const field = error.path[0];
    let newInput = { ...input };
    if (field === "email") newInput.email = null;
    if (field === "password") newInput.password = null;
    const message = error.message;
    return {
      message,
      success: false,
      input: newInput,
      field: field as "email" | "password",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(user.data);

  if (error) {
    return { message: error.message, success: false, input };
  }

  redirect("/dashboard");
}

export async function signUpAction(
  prevSate: unknown,
  formData: FormData,
): Promise<{
  message: string;
  success: boolean;
  input: {
    email: string | null;
    password: string | null;
    name: string | null;
  };
  field?: "email" | "password";
}> {
  const input = {
    email: formData.get("email") as string | null,
    password: formData.get("password") as string | null,
    name: formData.get("name") as string | null,
  };

  const user = NewUser.safeParse(input);

  if (user.error) {
    const error = user.error.issues[0];
    const field = error.path[0];
    let newInput = { ...input };
    if (field === "email") newInput.email = null;
    if (field === "password") newInput.password = null;
    if (field === "name") newInput.name = null;
    const message = error.message;
    return {
      message,
      success: false,
      input: newInput,
      field: field as "email" | "password",
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp(user.data);

  console.log("Prased data: ", user.data);
  console.log("user created: ", data);
  if (error) {
    return {
      message: error.message,
      success: false,
      input: user.data,
    };
  }

  redirect("/dashboard");
}

export async function signOutAction(prevState: unknown, formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
  } else {
    redirect("/");
  }
}
