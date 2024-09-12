"use client";

import { useForm, ValidationError } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { format, isValid } from "date-fns";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { cn } from "@/utils/classNames";

export default function Page() {
  const form = useForm({
    defaultValues: {
      title: `Release ${format(new Date(), "dd/MM/yyyy")}`,
      date: format(new Date(), "yyyy-MM-dd"),
    },
    onSubmit: ({ value, formApi }) => {
      console.log("submit", value, formApi);
    },
    validatorAdapter: zodValidator(),
  });

  return (
    <main className="mx-auto max-w-screen-sm px-8 py-16">
      <Link
        href=".."
        className="flex items-center gap-2 group text-neutral-600"
      >
        <ChevronLeftIcon className="size-4 group-hover:-translate-x-0.5 transition" />
        Back to releases
      </Link>

      <h1 className="mt-12 text-5xl font-bold text-center text-balance">
        Add a new release to your Changelog
      </h1>

      <form
        noValidate
        className="flex flex-col gap-6 mt-12"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="title"
          validators={{
            onBlur: z.string().min(3),
          }}
        >
          {(field) => (
            <label>
              <div className="mb-1">Release title</div>
              <input
                className={cn(
                  "border rounded w-full px-3 py-2",
                  field.state.meta.errors.length > 0 && "border-red-500"
                )}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder={`Release ${format(new Date(), "dd/MM/yyyy")}`}
              />
              <FieldErrors className="mt-1" errors={field.state.meta.errors} />
            </label>
          )}
        </form.Field>

        <form.Field
          name="date"
          validators={{
            onBlur: z
              .string()
              .refine((value) => isValid(new Date(value)), {
                message: "Invalid date",
              }),
          }}
          children={(field) => (
            <label>
              <div className="mb-1">Release date</div>
              <input
                className={cn(
                  "border rounded w-full px-3 py-2",
                  field.state.meta.errors.length > 0 && "border-red-500"
                )}
                type="date"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              <FieldErrors className="mt-1" errors={field.state.meta.errors} />
            </label>
          )}
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="bg-neutral-100 text-neutral-800 px-4 py-2 rounded-lg hover:bg-neutral-200 transition"
            onClick={() => form.reset()}
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-neutral-800 text-white px-4 py-2 rounded-lg hover:bg-neutral-700 transition"
          >
            Create release
          </button>
        </div>
      </form>
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
