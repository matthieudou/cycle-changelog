"use client";

import { cn } from "@/utils/classNames";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

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
  activeId?: string;
}) {
  const containerRef = useRef<HTMLUListElement>(null);
  const activeElementIndex = useMemo(
    () => links.findIndex((link) => link.id === activeId),
    [activeId, links]
  );

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
        className="absolute h-8 inset-x-0 top-0 bg-gradient-to-b from-white via-white-/40 to-white/0 pointer-events-none z-10"
      />
      <div className="max-h-80 overflow-y-hidden py-4">
        <motion.ul
          ref={containerRef}
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
              id={`link-${link.id}`}
            >
              <button onClick={() => handleClick(link.id)}>{link.title}</button>
            </motion.li>
          ))}
        </motion.ul>
      </div>
      <div
        role="presentation"
        className="absolute h-8 inset-x-0 bottom-0 bg-gradient-to-t from-white to-white/0 pointer-events-none z-10"
      />
    </div>
  );
}
