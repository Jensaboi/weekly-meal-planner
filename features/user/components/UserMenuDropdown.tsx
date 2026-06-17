import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutAction } from "@/features/auth/auth.action";
import type { User } from "@supabase/supabase-js";
import { LogOutIcon, Settings } from "lucide-react";
import Link from "next/link";
import { Avatar } from "radix-ui";

export default function UserMenuDropdown({ user }: { user: User | null }) {
  if (!user) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Avatar.Root>
            {/*<Avatar.Image alt="shadcn" />*/}
            <Avatar.Fallback>
              {user.email?.charAt(0).toUpperCase()}
            </Avatar.Fallback>
          </Avatar.Root>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              className="flex items-center justify-start gap-2 w-full"
              href="/"
            >
              <Settings />
              Settings
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <form action={signOutAction}>
              <button className="flex items-center justify-start gap-2 w-full">
                <LogOutIcon />
                Sign out
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
