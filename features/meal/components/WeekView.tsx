import { ChevronLeft } from "lucide-react";
import { MealCardData } from "../meal.type";

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
    today.getDay() === 1 ? today : today.getDay() - 7 + 1,
  );

  return (
    <div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {Array.from({ length: 7 }).map((_, index) => {
              const day = new Date(monday);
              day.setDate(monday.getDate() + index);

              const isSelected =
                selectedDate &&
                day.toISOString().split("T")[0] ===
                  selectedDate.toISOString().split("T")[0];

              const mealsOnDate = meals.filter(meal => {
                const mealDate = meal.date?.split("T")[0];
                const currDate = day.toISOString().split("T")[0];

                if (mealDate === currDate) return true;
              });

              return (
                <th key={index} className="border p-2">
                  <button
                    onClick={() => setSelectedDate(day)}
                    className={`w-full h-full p-2 rounded ${
                      isSelected ? "bg-zinc-800 text-white" : ""
                    }`}
                  >
                    {day.toLocaleDateString("en-US", {
                      weekday: "short",
                      day: "numeric",
                    })}
                    <div className="flex items-center gap-2 justify-center mt-1">
                      {mealsOnDate.map(meal => (
                        <div
                          className="size-3 bg-zinc-800 rounded-full"
                          key={meal.id}
                        ></div>
                      ))}
                    </div>
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
      </table>
    </div>
  );
}
