"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { planMealAction } from "../meal.action";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useToggle from "@/hooks/useToggle";
import { toast } from "sonner";

export default function PlanMealModal({
  recipeId = null,
  householdId = null,
}: {
  recipeId: number | null;
  householdId: number | null;
}) {
  const { isOpen, setIsOpen } = useToggle();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );

  const options = [
    { label: "Today", value: 0 },
    { label: "Tomorrow", value: 1 },
    { label: "In 3 days", value: 3 },
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const res = await planMealAction(formData);

    {
      /* do stuff with the response */
    }
    if (res.success) {
      setIsOpen(false);
      toast.success("Successfully planed recipe as meal!");
    }
    if (!res.success) {
      toast.error(res.error);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="hover:cursor-pointer" size={"lg"}>
          <CalendarIcon /> Plan as meal
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg">Plan recipe</DialogTitle>
          <DialogDescription>
            Choose a date to plan this recipe on:
          </DialogDescription>
        </DialogHeader>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          className="p-0 [--cell-size:--spacing(9.5)] w-full"
        />
        <DialogFooter>
          <div className="w-full flex flex-col gap-8">
            <div className="w-full flex items-center gap-4">
              {options.map(preset => (
                <Button
                  key={preset.value}
                  variant="outline"
                  size="sm"
                  className="flex-1 hover:cursor-pointer"
                  onClick={() => {
                    const newDate = addDays(new Date(), preset.value);
                    setDate(newDate);
                    setCurrentMonth(
                      new Date(newDate.getFullYear(), newDate.getMonth(), 1),
                    );
                  }}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
            <form onSubmit={handleSubmit}>
              <Input
                type="hidden"
                name="recipeId"
                id="recipeId"
                value={recipeId ?? ""}
              />
              <Input
                type="hidden"
                name="householdId"
                id="householdId"
                value={householdId ?? ""}
              />

              <Input
                type="hidden"
                name="date"
                id="date"
                value={date?.toISOString() ?? ""}
              />

              <Select name="mealType">
                <SelectTrigger className="mb-4">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                  <SelectItem value="snack">Snack</SelectItem>
                </SelectContent>
              </Select>

              <Button
                type="submit"
                size={"lg"}
                className="w-full hover:cursor-pointer"
              >
                Plan meal
              </Button>
            </form>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
