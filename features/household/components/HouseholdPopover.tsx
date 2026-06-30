"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, House, User } from "lucide-react";
import { HouseholdWithMembers } from "../household.type";
import CreateHouseholdModal from "./CreateHouseholdModal";
import useToggle from "@/hooks/useToggle";
import JoinHouseholdModal from "./JoinHouseholdModal";
import LeaveHouseholdButton from "./LeaveHouseholdButton";
import InviteMemberModal from "./InviteMemberModal";

export default function HouseholdDropdown({
  household,
}: {
  household: HouseholdWithMembers | null;
}) {
  const { isOpen, setIsOpen, close } = useToggle();

  if (household)
    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger title="household" asChild>
          <Button variant={"ghost"}>
            <House />
            <span className="truncate">
              {household?.name ?? "No household"}
            </span>
            <ChevronDown />
          </Button>
        </PopoverTrigger>

        <PopoverContent align="end">
          <PopoverHeader className="text-center">
            <PopoverTitle>{household.name}</PopoverTitle>

            <span className="flex items-center justify-center gap-2 text-center my-2 font-medium">
              <User />
              {household.members.length} member
            </span>
          </PopoverHeader>
          <div className="flex flex-col gap-4">
            <InviteMemberModal inviteCode={household.invite_code} />

            <LeaveHouseholdButton close={close} />
          </div>
        </PopoverContent>
      </Popover>
    );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger title="household" asChild>
        <Button variant={"ghost"}>
          <House />
          No household
          <ChevronDown />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end">
        <PopoverHeader>
          <PopoverTitle>Household</PopoverTitle>
          <PopoverDescription>
            You are not part of a household.
          </PopoverDescription>
        </PopoverHeader>
        <div className="flex flex-col gap-4">
          <CreateHouseholdModal onClick={close} />

          <JoinHouseholdModal onClick={close} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
