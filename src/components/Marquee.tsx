"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  speed?: number; // seconds for one full loop
  direction?: "left" | "right";
  className?: string;
}

/**
 * Infinite horizontal marquee. Renders the content twice back-to-back and
 * animates a continuous -50% translate so the loop is seamless, regardless
 * of viewport width.
 */
export default function Marquee({
  children,
  speed = 22,
  direction = "left",
  className = "",
}: MarqueeProps) {
  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <motion.div
        className="flex w-max items-center"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <span className="flex shrink-0 items-center">{children}</span>
        <span className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </span>
      </motion.div>
    </div>
  );
}
