import Link from "next/link";
import { Button } from "./ui/button";
import MainNavigation from "./MainNavigation";
import MobileNavigation from "./MobileNavigation";
import Logo from "@/public/Logo";

export default function Header({ user }) {
  return (
    <header className="p-4 flex justify-between items-center">
      <div className="flex items-center">
        {user && <MobileNavigation user={user} />}
        <Logo />
      </div>

      {user && <MainNavigation />}

      {!user && (
        <div className="flex items-center">
          <Button asChild variant={"link"}>
            <Link href={"/sign-in"}>Sign in</Link>
          </Button>
          <Button asChild size={"sm"}>
            <Link href={"/sign-up"}>Sign up</Link>
          </Button>
        </div>
      )}

      {user && (
        <div>
          <p>User card here goes here</p>
        </div>
      )}
    </header>
  );
}
