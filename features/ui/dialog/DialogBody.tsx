import { cn } from "@/utils/classNames";
import { ComponentPropsWithoutRef } from "react";

export function DialogBody({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return <div {...props} className={cn(className, "mt-6")} />;
}
