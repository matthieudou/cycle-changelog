"use client";

import { useForm, ValidationError } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { format, isValid } from "date-fns";
import Link from "next/link";
import { cn } from "@/utils/classNames";
import { CycleLogo } from "@/features/ui/icons";
import { createAndPublishRelease } from "./actions";

export default function Page() {
  const form = useForm({
    defaultValues: {
      title: "",
      date: "",
    },
    onSubmit: async ({ value }) => {
      const response = await createAndPublishRelease(value.title, value.date);
      console.log(response);
    },
    validatorAdapter: zodValidator(),
  });

  return (
    <main className="h-screen flex items-center justify-center relative">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl px-4 pt-4 pb-8">
        <div className="rounded-2xl flex flex-col items-center gap-2 py-10 bg-neutral-200">
          <CycleLogo className="size-6"></CycleLogo>
          Powered by Cycle
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
            Create release
          </button>
        </form>

        <Link
          href=".."
          className="p-2 block text-center hover:text-neutral-700 text-neutral-900 transition"
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
