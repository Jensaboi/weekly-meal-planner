import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { signOutAction } from "@/features/auth/auth.action";
import { capitalizeFirstLetter } from "@/lib/utils";
import { User } from "@supabase/supabase-js";
import { LogOutIcon, Settings, UserIcon } from "lucide-react";
import Link from "next/link";
import { Avatar } from "radix-ui";

export default function UserDropdown({ user }: { user: User | null }) {
  if (!user) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Avatar.Root>
            {/*<Avatar.Image alt="shadcn" />*/}
            <Avatar.Fallback>
              {user.email?.charAt(0).toUpperCase()}
            </Avatar.Fallback>
          </Avatar.Root>
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end">
        <PopoverTitle className="text-center py-4">
          {capitalizeFirstLetter(user.email ?? "Unknown")}
        </PopoverTitle>
        <div className="flex flex-col gap-4">
          <Button variant={"outline"} asChild>
            <Link className="w-full" href="/">
              <UserIcon />
              My profile
            </Link>
          </Button>

          <Button variant={"outline"} asChild>
            <Link className="w-full" href="/">
              <Settings />
              Settings
            </Link>
          </Button>

          <Button
            onClick={signOutAction}
            variant={"destructive"}
            className="w-full"
          >
            <LogOutIcon />
            Sign out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
