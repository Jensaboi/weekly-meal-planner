"use client";

import { MealCardData } from "../meal.type";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import SelectedDay from "./SelectedDay";
import { useState } from "react";

export default function MonthView({
  meals,
  selectedDate,
  setSelectedDate,
  selectedDateMeals,
}: {
  meals: MealCardData[];
  selectedDateMeals: MealCardData[];
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
}) {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );

  return (
    <div className="md:grid md:grid-cols-2 gap-16">
      <Calendar
        className="p-0 [--cell-size:--spacing(9.5)] w-full"
        weekStartsOn={1}
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        month={currentMonth}
        components={{
          DayButton: ({ ...props }) => {
            const day = props.day.date.getDate();
            const currDate = props.day.date.toISOString().split("T")[0];

            const mealsOnDate = meals.filter(meal => {
              const mealDate = meal.date?.split("T")[0];

              if (mealDate === currDate) return true;
            });

            return (
              <CalendarDayButton {...props}>
                {day}
                <div className="flex items-center gap-2">
                  {mealsOnDate.map(meal => (
                    <div
                      className="size-3 bg-zinc-800 rounded-full"
                      key={meal.id}
                    ></div>
                  ))}
                </div>
              </CalendarDayButton>
            );
          },
        }}
        onMonthChange={setCurrentMonth}
      />
      <SelectedDay meals={selectedDateMeals} date={selectedDate} />
    </div>
  );
}
