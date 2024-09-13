import { cn } from "@/utils/classNames";
import { Description, DescriptionProps } from "@headlessui/react";
import { ComponentPropsWithoutRef } from "react";

export function DialogDescription({
  className,
  ...props
}: { className?: string } & ComponentPropsWithoutRef<"div">) {
  return (
    <Description {...props} className={cn(className, "mt-2 text-pretty")} />
  );
}
