"use client";

import { Connection, Release } from "@/services/models";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { format } from "date-fns";
import { cn } from "@/utils/classNames";
import { motion } from "framer-motion";
import { Plus } from "@/features/ui/icons";
import { Dialog, DialogBody, DialogTitle } from "@/features/ui/dialog";
import { useState } from "react";

export function ChangelogMenu({
  releasesConnection,
  activeId,
}: {
  releasesConnection: Connection<Release>;
  activeId: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const links = releasesConnection.edges.map((edge) => ({
    id: edge.node.id,
    title: format(edge.node.date, "MMMM dd, yyyy"),
  }));
  const activeElementIndex = links.findIndex((link) => link.id === activeId);

  const handleElementClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <aside className="sticky self-start top-12 w-64 hidden md:block">
        <Link
          href={`${pathname}/release/create`}
          className="text-blue-cycle -mx-3 inline-block px-3 py-1 hover:bg-blue-50 rounded-lg transition"
        >
          Add release
        </Link>

        <div className="relative mt-2">
          <div
            role="presentation"
            className="absolute h-8 inset-x-0 top-0 bg-gradient-to-b from-white via-white-/40 to-white/0 pointer-events-none z-10"
          />
          <div className="max-h-80 overflow-y-hidden">
            <motion.ul
              animate={{
                y: Math.min(0, -(activeElementIndex * 28 - 100)),
              }}
            >
              {links.map((link) => (
                <motion.li
                  key={link.id}
                  className={cn(
                    "text-sm",
                    link.id === activeId
                      ? "text-neutral-900 font-medium"
                      : "text-neutral-500"
                  )}
                  initial={{
                    marginTop: link.id === activeId ? 24 : 8,
                    marginBottom: link.id === activeId ? 24 : 8,
                  }}
                  animate={{
                    marginTop: link.id === activeId ? 24 : 8,
                    marginBottom: link.id === activeId ? 24 : 8,
                  }}
                >
                  <button onClick={() => handleElementClick(link.id)}>
                    {link.title}
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </div>
          <div
            role="presentation"
            className="absolute h-8 inset-x-0 bottom-0 bg-gradient-to-t from-white to-white/0 pointer-events-none z-10"
          />
        </div>
      </aside>

      <div className="md:hidden fixed bottom-0 inset-x-0 flex gap-2 justify-center p-4">
        <button
          className="px-4 h-10 flex items-center bg-white rounded-full shadow-lg font-medium border border-neutral-100"
          onClick={() => {
            setOpen(true);
            setTimeout(() => {
              document
                .getElementById(`link-${activeId}`)
                ?.scrollIntoView({ block: "center" });
            }, 150);
          }}
        >
          {links[activeElementIndex].title}
        </button>
        <Link
          href={`${pathname}/release/create`}
          className="h-10 shrink-0 aspect-square grid place-items-center bg-white rounded-full shadow-lg font-medium border border-neutral-100"
        >
          <Plus />
          <span className="sr-only">Add new release</span>
        </Link>
        <Dialog
          open={open}
          onClose={setOpen}
          className="max-h-80 flex flex-col"
        >
          <DialogTitle>Find a release</DialogTitle>
          <DialogBody className="flex-1 overflow-y-auto">
            <ul>
              {links.map((link) => (
                <li key={link.id} id={`link-${link.id}`}>
                  <button
                    className={cn(
                      "my-1.5",
                      link.id === activeId
                        ? "text-neutral-900 font-medium"
                        : "text-neutral-500"
                    )}
                    onClick={() => {
                      setOpen(false);
                      setTimeout(() => {
                        handleElementClick(link.id);
                      }, 150);
                    }}
                  >
                    {link.title}
                  </button>
                </li>
              ))}
            </ul>
          </DialogBody>
        </Dialog>
      </div>
    </>
  );
}
