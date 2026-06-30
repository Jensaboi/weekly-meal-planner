"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { createHousehold } from "../household.action";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import useToggle from "@/hooks/useToggle";

export default function CreateHouseholdModal({
  onClick,
}: {
  onClick: () => void;
}) {
  const { isOpen, setIsOpen, close } = useToggle();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const res = await createHousehold(formData);
    if (res.success) {
      router.refresh();
      toast.success("Household created successfully!");
      close();
      onClick();
    }

    if (!res.success) {
      toast.error(res.error);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger title="Create household" asChild>
        <Button variant={"outline"}>
          <Plus /> Create household
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Create household</DialogTitle>
          <DialogDescription>
            Households let you share grocerylists and meal planning with other
            users.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Label htmlFor="name" className="flex flex-col items-start">
            Name
            <Input name="name" id="name" />
          </Label>

          <Button>Create household</Button>
        </form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
