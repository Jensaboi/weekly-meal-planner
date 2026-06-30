"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useToggle from "@/hooks/useToggle";
import { Users } from "lucide-react";

export default function JoinHouseholdModal({
  onClick,
}: {
  onClick: () => void;
}) {
  const { isOpen, close, setIsOpen } = useToggle();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger title="Join household" asChild>
        <Button variant={"outline"}>
          <Users /> Join household
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join household</DialogTitle>
          <DialogDescription>
            Enter the invite code sent to you to join household
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input type="text" id="inviteCode" name="inviteCode" />

          <Button>Join household</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
