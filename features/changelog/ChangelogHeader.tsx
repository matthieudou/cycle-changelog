"use client";

import { motion } from "framer-motion";
import { ShipButton } from "./ShipButton";

export function ChangelogHeader() {
  return (
    <motion.header
      className="pt-8 md:pt-24 pb-24 md:pb-12 flex flex-col justify-center text-center overflow-x-clip"
      initial={
        {
          "--gradient-center": "50%",
          "--color-from": "#E4F0FC",
          "--color-to": "#E7E2FA",
        } as any
      }
      style={{
        background: `
          linear-gradient(to bottom, #FFFFFF00 0%, #FFFFFFFF 80% ),
          linear-gradient(to right, white calc(var(--gradient-center) - 50%), var(--color-from) calc(var(--gradient-center) - 25%), var(--color-to) calc(var(--gradient-center) + 25%), white calc(var(--gradient-center) + 50%))
        `,
      }}
      animate={
        {
          "--gradient-center": ["50%", "80%", "50%", "20%"],
          "--color-from": [
            "#E4F0FC",
            "#EDF8EE",
            "#F8E3F7",
            "#E7E2FA",
            "#D2E2FC",
            "#ECFCFD",
          ],
          "--color-to": [
            "#E7E2FA",
            "#D2E2FC",
            "#ECFCFD",
            "#E4F0FC",
            "#EDF8EE",
            "#F8E3F7",
          ],
          transition: {
            duration: 20,
            repeat: Infinity,
          },
        } as any
      }
    >
      <h1 className="text-6xl text-gray-900 font-sans font-bold">Changelog</h1>
      <p className="mt-10 font-medium text-2xl">
        What did you <ShipButton>Ship</ShipButton> this week ?
      </p>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:gap-4 justify-center items-center">
        <motion.a
          href="https://x.com/CycleProduct"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-cycle origin-bottom-right"
          whileHover={{
            y: -2,
            scale: 1.03,
            rotate: -1,
          }}
        >
          Subscribe for updates
        </motion.a>
        <div
          role="presentation"
          className="size-1 rounded-full bg-neutral-200"
        />
        <motion.a
          href="https://x.com/CycleProduct"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-cycle origin-bottom-left"
          whileHover={{
            y: -2,
            scale: 1.03,
            rotate: 1,
          }}
        >
          Follow us on X (Twitter)
        </motion.a>
      </div>
    </motion.header>
  );
}
