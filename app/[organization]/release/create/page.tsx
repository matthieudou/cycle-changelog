"use client";

import { useForm, ValidationError } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { format, isValid } from "date-fns";
import Link from "next/link";
import { cn } from "@/utils/classNames";
import { CycleLogo } from "@/features/ui/icons";
import { createAndPublishRelease } from "./actions";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      title: "",
      date: "",
    },
    onSubmit: async ({ value }) => {
      await createAndPublishRelease(value.title, value.date);
      router.push("/");
    },
    validatorAdapter: zodValidator(),
  });

  return (
    <main className="md:h-screen flex flex-col md:items-center md:justify-center relative">
      <div className="relative w-full md:max-w-lg bg-white md:rounded-2xl md:shadow-xl px-4 pt-4 pb-8">
        <div className="relative ">
          <CardHeader className="absolute inset-0 rounded-2xl" />
          <div className="flex flex-col items-center gap-2 py-10 relative opacity-80">
            <CycleLogo className="size-6"></CycleLogo>
            Powered by Cycle
          </div>
        </div>

        <h1 className="mt-8 text-2xl font-bold text-center text-balance">
          New release
        </h1>
        <p className="text-neutral-600 text-center mt-2">
          What have you been cooking ?
        </p>

        <form
          noValidate
          className="flex flex-col gap-6 mt-12 max-w-sm mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="title"
            validators={{
              onSubmit: z.string().min(3),
            }}
          >
            {(field) => (
              <label>
                <div className="mb-1 font-medium">Release title</div>
                <input
                  type="text"
                  className={cn(
                    "border rounded-lg w-full px-3 py-2",
                    field.state.meta.errors.length > 0 && "border-red-500"
                  )}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={`Release ${format(new Date(), "dd/MM/yyyy")}`}
                />
                <FieldErrors
                  className="mt-1"
                  errors={field.state.meta.errors}
                />
              </label>
            )}
          </form.Field>

          <form.Field
            name="date"
            validators={{
              onSubmit: z.string().refine((value) => isValid(new Date(value)), {
                message: "Invalid date",
              }),
            }}
            children={(field) => (
              <label>
                <div className="mb-1 font-medium">Release date</div>
                <input
                  className={cn(
                    "border rounded-lg w-full px-3 py-2",
                    field.state.meta.errors.length > 0 && "border-red-500"
                  )}
                  type="date"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldErrors
                  className="mt-1"
                  errors={field.state.meta.errors}
                />
              </label>
            )}
          />

          <button
            type="submit"
            className="bg-blue-cycle text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-cycle/90 transition"
          >
            {form.state.isSubmitting ? "Creating release..." : "Create release"}
          </button>
        </form>

        <Link
          href=".."
          className="p-2 block text-center hover:text-neutral-900 text-neutral-500 transition"
        >
          Cancel
        </Link>
      </div>
    </main>
  );
}

function FieldErrors({
  errors,
  className,
}: {
  errors: ValidationError[];
  className?: string;
}) {
  if (errors.length === 0) return null;

  return (
    <em role="alert" className={cn("block text-red-500", className)}>
      {errors.join(", ")}
    </em>
  );
}

function CardHeader({ className }: { className?: string }) {
  return (
    <div className={cn("bg-[#ECF7FF] overflow-clip", className)}>
      <div className="absolute size-64 rounded-full blur-3xl bg-[#E7B6F4]/20 top-0 left-0"></div>
      <div className="absolute size-64 rounded-full blur-3xl bg-[#F6F3FD] bottom-0 right-0"></div>
    </div>
  );
}
