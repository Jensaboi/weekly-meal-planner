import { MealCardData } from "../meal.type";
import { formatDate } from "@/lib/utils";
import SelectedDay from "./SelectedDay";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

export default function WeekView({
  meals,
  selectedDate,
  setSelectedDate,
  selectedDateMeals,
}: {
  meals: MealCardData[];
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  selectedDateMeals: MealCardData[];
}) {
  const today = new Date();

  const monday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() + 1,
  );

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 gap-16">
      <table className="w-full border-collapse">
        <thead>
          <tr className="grid grid-cols-7">
            {Array.from({ length: 7 }).map((_, index) => {
              const day = new Date(monday);
              day.setDate(monday.getDate() + index);

              const isSelected =
                selectedDate &&
                formatDate(day ?? new Date()) === formatDate(selectedDate);

              const isToday = formatDate(day) === formatDate(new Date());

              const mealsOnDate = meals.filter(meal => {
                const mealDate = formatDate(new Date(meal.date || ""));
                const currDate = formatDate(day);

                console.log(mealDate, currDate, mealDate === currDate);

                if (mealDate === currDate) return true;
              });
              console.log(day);
              return (
                <th className="aspect-square" key={index}>
                  <Button
                    variant={isSelected ? "default" : "ghost"}
                    onClick={() => setSelectedDate(day)}
                    className={clsx(
                      `w-full h-full flex flex-col justify-center items-center`,
                      isToday && "bg-muted",
                      isSelected && "bg-primary text-primary-foreground",
                    )}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-muted-foreground">
                        {day.toLocaleDateString("en-US", {
                          weekday: "short",
                        })}
                      </span>
                      <span>
                        {day.toLocaleDateString("en-US", {
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 justify-center mt-1">
                      {mealsOnDate.map(meal => (
                        <div
                          className="size-3 bg-zinc-800 rounded-full"
                          key={meal.id}
                        ></div>
                      ))}
                    </div>
                  </Button>
                </th>
              );
            })}
          </tr>
        </thead>
      </table>
      <SelectedDay meals={selectedDateMeals} date={selectedDate} />
    </div>
  );
}
