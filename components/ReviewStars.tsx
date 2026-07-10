import { Star } from "lucide-react";

export default function ReviewStars({
  rating,
  starSize,
}: {
  rating?: number | null | undefined;
  starSize?: number;
}) {
  if (!rating) rating = 0;

  const filledStars = Array.from({ length: Math.floor(rating) }, (_, i) => (
    <Star
      size={starSize}
      key={`filled-${i}`}
      className="fill-yellow-300"
      strokeWidth={1}
    />
  ));

  const transparentStars = Array.from(
    { length: 5 - Math.floor(rating) },
    (_, i) => <Star size={starSize} key={`empty-${i}`} strokeWidth={1} />,
  );

  const percent = Number(rating.toFixed(2).split(".").pop());

  const isHalfStar = percent && percent !== 0 ? true : false;

  if (isHalfStar) {
    transparentStars[0] = (
      <div key="partial-star" className="relative">
        <Star size={starSize} className="fill-transparent" strokeWidth={1} />

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${percent}%` }}
        >
          <Star size={starSize} className="fill-yellow-300" strokeWidth={1} />
        </div>
      </div>
    );
  }

  const stars = [...filledStars, ...transparentStars];
  return <div className="flex items-center gap-2">{stars}</div>;
}
