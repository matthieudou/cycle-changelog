"use client";

import { cn } from "@/utils/classNames";
import Link from "next/link";
import { useEffect } from "react";

type SidebarLink = {
  id: string;
  title: string;
};

export function TableOfContents({
  className,
  links,
  activeId,
}: {
  className?: string;
  links: SidebarLink[];
  activeId: string;
}) {
  useEffect(() => {
    const activeElement = document.getElementById(`link-${activeId}`);
    if (activeElement) {
      activeElement.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [activeId]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={cn("relative", className)}>
      <div
        role="presentation"
        className="absolute h-8 inset-x-0 top-0 bg-gradient-to-b from-white via-white-/40 to-white/0"
      />
      <ul className="max-h-80 overflow-y-auto scrollbar-hidden py-6">
        {links.map((link) => (
          <li
            key={link.id}
            className={cn(
              "text-sm",
              link.id === activeId
                ? "text-neutral-900 font-medium my-6 first:mt-0 last:mb-0"
                : "my-2 text-neutral-500"
            )}
            id={`link-${link.id}`}
          >
            <button onClick={() => handleClick(link.id)}>{link.title}</button>
          </li>
        ))}
        <div
          role="presentation"
          className="absolute h-12 inset-x-0 bottom-0 bg-gradient-to-t from-white to-white/0"
        />
      </ul>
    </div>
  );
}
