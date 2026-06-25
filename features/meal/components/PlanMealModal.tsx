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

export default function PlanMealModal({ recipeId }: { recipeId: number }) {
  const [date, setDate] = useState<Date | undefined>(
    new Date(new Date().getFullYear(), 1, 12),
  );
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
  }

  return (
    <Dialog>
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
