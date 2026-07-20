import { Calendar } from "@/components/ui/calendar";
import { DayButton, DayButtonProps, UI, useDayPicker } from "@daypicker/react";
import clsx from "clsx";
import { MealCardType } from "../meal.type";
import { formatDate } from "@/lib/utils";

export default function MealsCalendar({
  className,
  selected,
  onSelect,
  month,
  onMonthChange,
  meals = [],
  ...rest
}: {
  className?: string | undefined;
  selected: Date | undefined;
  onSelect: React.Dispatch<React.SetStateAction<Date | undefined>>;
  month: Date;
  onMonthChange: React.Dispatch<React.SetStateAction<Date>>;
  rest?: unknown;
  meals: MealCardType[];
}) {
  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={onSelect}
      month={month}
      onMonthChange={onMonthChange}
      components={{
        DayButton: (props: DayButtonProps) => {
          const { classNames } = useDayPicker();

          const currDate = props.day.date;

          const mealsOnDate = meals.filter(meal => {
            if (!meal.date) return false;

            const mealDate = new Date(meal.date);

            if (formatDate(currDate) === formatDate(mealDate)) return true;

            return false;
          });

          return (
            <DayButton
              {...props}
              className={clsx(
                classNames[UI.DayButton],
                "w-full h-full hover:cursor-pointer flex flex-col justify-between p-2 rounded-md",
              )}
            >
              {props.day.date.getDate()}
              <div className="flex items-center justify-center gap-2 h-3">
                {mealsOnDate.map(meal => (
                  <span
                    className={clsx(
                      meal.meal_type === "breakfast" && "bg-blue-500",
                      meal.meal_type === "lunch" && "bg-green-600",
                      meal.meal_type === "dinner" && "bg-red-500",
                      meal.meal_type === "snack" && "bg-purple-500",
                      "block rounded-full w-full h-full",
                    )}
                    key={meal.id}
                  ></span>
                ))}
              </div>
            </DayButton>
          );
        },
      }}
      className={clsx("p-0 [--cell-size:--spacing(9.5)] w-full", className)}
      classNames={{
        selected: "border border-1 border-accent rounded-md",
        today: "rounded-md bg-accent-foreground",
      }}
      {...rest}
    />
  );
}
