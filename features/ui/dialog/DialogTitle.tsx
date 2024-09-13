import { cn } from "@/utils/classNames";
import {
  DialogTitleProps,
  DialogTitle as HeadlessuiDialogTitle,
} from "@headlessui/react";

export function DialogTitle({
  className,
  ...props
}: { className?: string } & Omit<DialogTitleProps, "as" | "className">) {
  return (
    <HeadlessuiDialogTitle
      {...props}
      className={cn(
        className,
        "text-balance text-lg/6 font-semibold text-zinc-950 sm:text-base/6 dark:text-white"
      )}
    />
  );
}
