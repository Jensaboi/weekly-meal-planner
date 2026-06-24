import { Star } from "lucide-react";

export default function ReviewStars({
  avgRating,
  size,
}: {
  avgRating: number | null | undefined;
  size?: number | undefined;
}) {
  if (!avgRating) avgRating = 0;

  const filledStars = Array.from({ length: Math.floor(avgRating) }, (_, i) => (
    <Star
      size={size}
      key={`filled-${i}`}
      className="fill-yellow-300"
      strokeWidth={1}
    />
  ));

  const transparentStars = Array.from(
    { length: 5 - Math.floor(avgRating) },
    (_, i) => <Star size={size} key={`empty-${i}`} strokeWidth={1} />,
  );

  const percent = Number(avgRating.toFixed(2).split(".").pop());

  const isHalfStar = percent && percent !== 0 ? true : false;

  if (isHalfStar) {
    transparentStars[0] = (
      <div key="partial-star" className="relative">
        <Star size={size} className="fill-transparent" strokeWidth={1} />

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${percent}%` }}
        >
          <Star size={size} className="fill-yellow-300" strokeWidth={1} />
        </div>
      </div>
    );
  }

  const stars = [...filledStars, ...transparentStars];
  return <div className="flex items-center gap-2">{stars}</div>;
}
