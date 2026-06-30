"use client";
import { Button } from "@/components/ui/button";
import { leaveHousehold } from "../household.action";
import { useRouter } from "next/navigation";

export default function LeaveHouseholdButton({ close }: { close: () => void }) {
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await leaveHousehold();

    if (res.success) {
      router.refresh();
      close();
    } else {
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <Button className="w-full" type="submit" variant={"destructive"}>
        Leave household
      </Button>
    </form>
  );
}
