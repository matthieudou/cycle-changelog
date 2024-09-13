import { cn } from "@/utils/classNames";
import { ComponentPropsWithoutRef } from "react";

export function DialogActions({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={cn(
        className,
        "mt-8 flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:flex-row sm:*:w-auto"
      )}
    />
  );
}
