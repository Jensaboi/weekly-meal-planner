import clsx from "clsx";
import { Star } from "lucide-react";

export default function ClickableReviewStars({
  state,
  setState,
  starSize,
}: {
  state: number;
  starSize?: number;
  setState: React.Dispatch<React.SetStateAction<number>>;
}) {
  const toggleStars = (val: number) => {
    setState(prev => {
      if (prev === val) {
        return 0;
      } else {
        return val;
      }
    });
  };

  return (
    <div className="flex justify-center items-center gap-2">
      {Array.from({ length: 5 }, (_, i) => {
        return (
          <button
            className="hover:cursor-pointer"
            type="button"
            key={i}
            onClick={() => toggleStars(i + 1)}
          >
            <Star
              size={starSize}
              strokeWidth={1}
              className={clsx(
                i < state && "fill-yellow-300",
                "hover:fill-yellow-300",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
