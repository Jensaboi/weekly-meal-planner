"use client";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";

export default function ActionButton({
  action,
  children,
  className,
  variant,
  size,
}: {
  action: () => Promise<unknown> | void;
  children?: React.ReactNode;
  className?: string;
  variant?:
    | "default"
    | "link"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | null
    | undefined;
  size?:
    | "default"
    | "xs"
    | "sm"
    | "lg"
    | "icon"
    | "icon-xs"
    | "icon-sm"
    | "icon-lg"
    | null
    | undefined;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={() =>
        startTransition(async () => {
          await action();
        })
      }
    >
      {!isPending && children}
      {isPending && <Loader className="animate-spin" />}
    </Button>
  );
}
