import Link from "next/link";
import { Button } from "./ui/button";
import MainNavigation from "./MainNavigation";
import MobileNavigation from "./MobileNavigation";
import Logo from "@/public/Logo";
import UserMenuDropdown from "@/features/user/components/UserMenuDropdown";
import { User } from "@supabase/supabase-js";

export default function Header({ user }: { user: User }) {
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

      {user && <UserMenuDropdown user={user} />}
    </header>
  );
}
