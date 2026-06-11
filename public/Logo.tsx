import clsx from "clsx";
import Link from "next/link";

export default function Logo({ className, ...rest }: { className?: string }) {
  return (
    <Link
      className={clsx("text-xl tracking-tight font-semibold", className)}
      href="/"
      {...rest}
    >
      <span>Munchy</span>
    </Link>
  );
}
