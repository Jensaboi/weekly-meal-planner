"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { CalendarIcon, List } from "lucide-react";
import { useState } from "react";
import { MealCardType } from "../meal.type";
import { formatDate } from "@/lib/utils";
import MealsCalendar from "./MealsCalendar";
import MealsWeekCalendar from "./MealsWeekCalendar";
import SelectedDay from "./SelectedDay";

export default function CalendarView({ meals }: { meals: MealCardType[] }) {
  const [calendarMode, setCalendarMode] = useState<"list" | "month">("month");

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [month, setMonth] = useState<Date>(new Date());

  const selectedDateMeals = selectedDate
    ? meals.filter(
        meal =>
          formatDate(new Date(meal.date || "")) ===
          formatDate(selectedDate || new Date()),
      )
    : [];

  return (
    <section className="mx-auto container px-4">
      <div className="flex justify-end items-center py-4">
        <div className="flex items-center">
          <Button
            onClick={() => {
              setCalendarMode("list");
              setSelectedDate(new Date());
            }}
            title="List"
            variant={"ghost"}
            className={clsx(calendarMode === "list" && "bg-muted")}
          >
            <List />
          </Button>
          <Button
            onClick={() => {
              setCalendarMode("month");
              setSelectedDate(new Date());
            }}
            title="Monthly"
            variant={"ghost"}
            className={clsx(calendarMode === "month" && "bg-muted")}
          >
            <CalendarIcon />
          </Button>
        </div>
      </div>

      {calendarMode === "month" ? (
        <div className="md:grid md:grid-cols-2 gap-16 md:gap-4 lg:gap-16">
          <MealsCalendar
            month={month}
            onMonthChange={setMonth}
            selected={selectedDate}
            onSelect={setSelectedDate}
            meals={meals}
          />
          <SelectedDay
            setSelectedDate={setSelectedDate}
            date={selectedDate}
            meals={selectedDateMeals}
          />
        </div>
      ) : (
        <div className="max-w-160 mx-auto flex flex-col gap-16">
          <MealsWeekCalendar
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
            meals={meals}
          />
          <SelectedDay
            setSelectedDate={setSelectedDate}
            date={selectedDate}
            meals={selectedDateMeals}
          />
        </div>
      )}
    </section>
  );
}
