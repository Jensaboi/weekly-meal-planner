"use client";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { signInAction } from "../auth.action";
import { useActionState } from "react";

export default function SignInForm() {
  const [state, action, isPending] = useActionState(signInAction, null);
  console.log(state, isPending);
  return (
    <Card className="w-full max-w-md mx-auto py-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold mb-2">
          Sign in to your account
        </CardTitle>

        <CardDescription>
          Enter your email and password to sign in to your account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form action={action} className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>

            <Input
              defaultValue={state?.input?.email ?? ""}
              name="email"
              id="email"
              type="email"
              className={state?.field === "email" ? "border-red-500" : ""}
              placeholder="Enter your email address"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>

            <Input
              name="password"
              id="password"
              min={8}
              type="password"
              placeholder="Enter your password"
              defaultValue={state?.input?.password ?? ""}
              className={state?.field === "password" ? "border-red-500" : ""}
            />
          </div>

          <div className="text-center">
            {state?.message && <p className="text-red-500">{state?.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Button
              className="w-full block"
              size={"lg"}
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Signing in..." : "Sign in"}
            </Button>

            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Button asChild variant="link" className="p-0">
                <Link href="/sign-up" className="text-blue-500 hover:underline">
                  Sign up
                </Link>
              </Button>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
