"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { CalendarIcon, List } from "lucide-react";
import { useState } from "react";
import { MealCardData } from "../meal.type";
import MonthView from "./MonthView";
import WeekView from "./WeekView";

export default function MealsCalendar({ meals }: { meals: MealCardData[] }) {
  const [calendarType, setCalendarType] = useState<"list" | "month">("month");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  const selectedDateMeals = meals.filter(
    meal =>
      meal.date?.split("T")[0] === selectedDate?.toISOString().split("T")[0],
  );

  return (
    <section className="mx-auto container px-4">
      <div className="flex justify-end items-center py-4">
        <div className="flex items-center">
          <Button
            onClick={() => setCalendarType("list")}
            title="List"
            variant={"ghost"}
            className={clsx(calendarType === "list" && "bg-muted")}
          >
            <List />
          </Button>
          <Button
            onClick={() => setCalendarType("month")}
            title="Monthly"
            variant={"ghost"}
            className={clsx(calendarType === "month" && "bg-muted")}
          >
            <CalendarIcon />
          </Button>
        </div>
      </div>

      {calendarType === "list" && (
        <WeekView
          meals={meals}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedDateMeals={selectedDateMeals}
        />
      )}

      {calendarType === "month" && (
        <MonthView
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
          meals={meals}
          selectedDateMeals={selectedDateMeals}
        />
      )}
    </section>
  );
}
