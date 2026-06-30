"use client";

import useToggle from "@/hooks/useToggle";
import { sendInvitationEmail } from "../household.action";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InviteMemberModal({
  inviteCode,
}: {
  inviteCode: string | null;
}) {
  const { isOpen, setIsOpen, close } = useToggle();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const res = await sendInvitationEmail(formData);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger title="Create household" asChild>
        <Button variant={"outline"}>
          <User /> Invite member
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Invite member</DialogTitle>
          <DialogDescription>
            Send an invitation email to a user:
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Label htmlFor="email" className="flex flex-col items-start">
            Email
            <Input name="email" id="email" />
          </Label>

          <Button>Send email</Button>
        </form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
