import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { requireUser } from "@/features/auth/auth.data";
import Link from "next/link";

export default async function CreateRecipePage() {
  await requireUser();
  return (
    <section className="container mx-auto px-4 lg:px-8 py-16">
      <h1 className="text-3xl font-bold">Create recipe</h1>

      <p>Create a new recipe or import a existing one.</p>

      <div className="grid gap-4 md:grid-cols-2 md:gap-16 py-16">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Create new recipe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Create a new recipe from scratch</CardDescription>
          </CardContent>
          <CardFooter>
            <CardAction>
              <Button size={"lg"}>
                <Link href={"/recipes/create/new"}>Create new recipe</Link>
              </Button>
            </CardAction>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Import existing recipe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Import a recipe from an existing website.
            </CardDescription>
          </CardContent>
          <CardFooter>
            <CardAction>
              <Button size={"lg"}>
                <Link href={"/recipes/create/import"}>Import recipe</Link>
              </Button>
            </CardAction>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
