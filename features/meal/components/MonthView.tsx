"use client";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { useState } from "react";
import { MealCard } from "../meal.type";

export default function MonthView({ meals }: { meals: MealCard[] }) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );

  return (
    <div>
      <div></div>
      <Calendar
        weekStartsOn={1}
        animate
        mode="single"
        selected={date}
        onSelect={setDate}
        month={currentMonth}
        components={{
          DayButton: ({ ...props }) => {
            const day = props.day.date.getDate();
            return <CalendarDayButton {...props}>{day}</CalendarDayButton>;
          },
        }}
        onMonthChange={setCurrentMonth}
        className="p-0 [--cell-size:--spacing(9.5)] w-full"
      />
    </div>
  );
}
