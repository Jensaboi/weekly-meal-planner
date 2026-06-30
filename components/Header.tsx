import Link from "next/link";
import { Button } from "./ui/button";
import MainNavigation from "./MainNavigation";
import MobileNavigation from "./MobileNavigation";
import Logo from "@/public/Logo";
import UserMenuDropdown from "@/features/user/components/UserMenuDropdown";
import HouseholdDropdown from "@/features/household/components/HouseholdPopover";
import { getUser } from "@/features/user/user.data";
import { getHousehold } from "@/features/household/household.data";
import CreateDropdown from "./CreateDropdown";

export default async function Header() {
  const user = await getUser();

  const household = await getHousehold();

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
        <div className="flex items-center gap-2">
          <CreateDropdown />
          <HouseholdDropdown household={household} />
          <UserMenuDropdown user={user} />
        </div>
      )}
    </header>
  );
}
