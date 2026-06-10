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
import { signUpAction } from "../auth.action";
import { useActionState } from "react";

export default function SignUpForm() {
  const [state, action, isPending] = useActionState(signUpAction, null);
  console.log(state, isPending);
  return (
    <Card className="w-full max-w-md mx-auto py-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold mb-2">Sign up</CardTitle>

        <CardDescription>
          Enter your email, password and name to create an account.
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

          <div className="flex flex-col gap-2">
            <Label htmlFor="name">name</Label>

            <Input
              name="name"
              id="name"
              min={1}
              type="text"
              placeholder="Enter your name"
              defaultValue={state?.input?.name ?? ""}
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
              {isPending ? "Signing up..." : "Sign up"}
            </Button>

            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Button asChild variant="link" className="p-0">
                <Link href="/sign-in" className="text-blue-500 hover:underline">
                  Sign in here
                </Link>
              </Button>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
