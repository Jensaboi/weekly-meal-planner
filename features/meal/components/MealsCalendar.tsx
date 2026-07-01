"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { CalendarIcon, List, RefreshCw } from "lucide-react";
import { useState } from "react";
import { MealCard } from "../meal.type";
import MonthView from "./MonthView";

export default function MealsCalendar({ meals }: { meals: MealCard[] }) {
  const [calendarType, setCalendarType] = useState<"list" | "week" | "month">(
    "week",
  );

  return (
    <section className="mx-auto container px-4">
      <div className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-medium">Meals</h1>

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
            onClick={() => setCalendarType("week")}
            title="Weekly"
            variant={"ghost"}
            className={clsx(calendarType === "week" && "bg-muted")}
          >
            <RefreshCw />
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

      {calendarType === "list" && <div></div>}

      {calendarType === "week" && <div></div>}

      {calendarType === "month" && <MonthView meals={meals} />}
    </section>
  );
}
