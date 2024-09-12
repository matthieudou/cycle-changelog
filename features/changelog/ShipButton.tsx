"use client";

import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { getRandomElementInArray } from "@/utils/arrays";
import { getRandomNumberBetween } from "@/utils/numbers";

const COLORS = [
  "93 112 232", // #5D70E8
  "63 143 247", // #3F8FF7
  "44 160 132", // #2CA084
  "212 169 17", // #D4A911
  "234 126 48", // #EA7E30
  "232 93 110", // #E85D6E
  "231 90 174", // #E75AAE
  "197 69 243", // #C545F3
  "80 89 103", // #505967
];

const TAG_NAMES = [
  "feature",
  "improvement",
  "bug",
  "performance",
  "update",
  "API",
  "pro tip",
  "design",
];

const defaultTag = {
  color: COLORS[0],
  rotation: -6,
};

export function ShipButton({ children }: { children: ReactNode }) {
  const [tags, setTags] = useState<
    {
      title: string;
      posX: number;
      posY: number;
      color: string;
      rotation: number;
    }[]
  >([]);

  const handleNewTag = () => {
    setTags((prevTags) => [
      ...prevTags,
      {
        title: getRandomElementInArray(TAG_NAMES),
        posX: getRandomElementInArray([
          getRandomNumberBetween(200, 600),
          getRandomNumberBetween(-700, -400),
        ]),
        posY: getRandomNumberBetween(-200, 200),
        color: getRandomElementInArray(COLORS),
        rotation: getRandomNumberBetween(-15, 15),
      },
    ]);
  };

  return (
    <span className="relative">
      <motion.button
        animate={{
          y: [0, -5, 0, -5, 0],
          scale: [1, 1.05, 1, 1.05, 1],
          rotate: [0, defaultTag.rotation],
          transition: {
            duration: 1,
            delay: 2,
            repeat: Infinity,
            repeatDelay: 6,
            rotate: {
              delay: 0,
            },
          },
        }}
        className="rounded-xl whitespace-nowrap before:inset-0 p-0.5 mx-1 z-10 relative"
        onClick={handleNewTag}
        style={{
          color: `rgb(${defaultTag.color} / 1)`,
          background: `linear-gradient(0deg, rgba(${defaultTag.color} / 0.3), rgba(${defaultTag.color} / 0.3)) white`,
          borderRadius: "16px",
        }}
      >
        <span
          className="px-3 py-1 inline-block whitespace-nowrap font-semibold"
          style={{
            textShadow: `0 -0.5px 0.2px white, 0 0.5px 0.2px rgba(${defaultTag.color} / 0.5)`,
            background: `linear-gradient(0deg, rgba(${defaultTag.color} / 0.2), rgba(${defaultTag.color} / 0.1)) white`,
            borderRadius: "14px",
          }}
        >
          {children}
        </span>
      </motion.button>
      {tags.map((tag, index) => (
        <motion.span
          key={index}
          initial={{
            top: "50%",
            left: "50%",
            x: "-50%",
            y: "-50%",
            scale: 0.5,
          }}
          animate={{
            scale: 1,
            x: tag.posX,
            y: tag.posY,
            rotate: [0, 360 * (tag.posX > 0 ? 1 : -1) + tag.rotation],
          }}
          transition={{ duration: 1 }}
          className="absolute p-0.5 bg-white shadow-lg"
          drag
          style={{
            color: `rgb(${tag.color} / 1)`,
            background: `linear-gradient(0deg, rgba(${tag.color} / 0.3), rgba(${tag.color} / 0.3)) white`,
            borderRadius: "16px",
          }}
        >
          <span
            className="px-3 py-1 inline-block whitespace-nowrap font-semibold"
            style={{
              textShadow: `0 -0.5px 0.2px white, 0 0.5px 0.2px rgba(${tag.color} / 0.5)`,
              background: `linear-gradient(0deg, rgba(${tag.color} / 0.2), rgba(${tag.color} / 0.1)) white`,
              borderRadius: "14px",
            }}
          >
            {tag.title}
          </span>
        </motion.span>
      ))}
    </span>
  );
}
