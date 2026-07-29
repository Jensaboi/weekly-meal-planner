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
import { formatDate } from "@/lib/utils";
import MealsCalendar from "./MealsCalendar";
import { MealCardType } from "../meal.type";

export default function PlanMealModal({
  recipeId = null,
  recipePortions,
  meals,
}: {
  recipeId: number | null;
  recipePortions: number;
  meals: MealCardType[];
}) {
  const currentHour = new Date().getHours();

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
        <MealsCalendar
          selected={date}
          onSelect={setDate}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          meals={meals}
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
                name="date"
                id="date"
                value={formatDate(date ?? new Date()) ?? ""}
              />
              <div className="flex items-center gap-8">
                <label
                  htmlFor="mealType"
                  className="flex flex-col font-medium gap-2"
                >
                  Select meal:
                  <Select
                    defaultValue={currentHour < 12 ? "lunch" : "dinner"}
                    name="mealType"
                  >
                    <SelectTrigger className="mb-4 w-full">
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breakfast">Breakfast</SelectItem>
                      <SelectItem value="lunch">Lunch</SelectItem>
                      <SelectItem value="dinner">Dinner</SelectItem>
                      <SelectItem value="snack">Snack</SelectItem>
                    </SelectContent>
                  </Select>
                </label>

                <label
                  htmlFor="portion"
                  className="flex flex-col font-medium gap-2"
                >
                  Select portions:
                  <Select defaultValue={recipePortions + ""} name="portions">
                    <SelectTrigger className="mb-4 w-full">
                      <SelectValue placeholder="Select portion size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="6">6</SelectItem>
                    </SelectContent>
                  </Select>
                </label>
              </div>

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
