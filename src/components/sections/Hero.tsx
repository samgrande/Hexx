"use client";

import { motion } from "framer-motion";

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 40"
      className="h-8 w-5 text-white/90 sm:h-10 sm:w-6"
      fill="none"
    >
      <path
        d={direction === "left" ? "M20 2 4 20l16 18" : "M4 2l16 18-16 18"}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Section 1 — the centered HELLO intro.
export default function Hero() {
  return (
    <section className="snap-section relative flex min-h-[60vh] w-full flex-col overflow-hidden bg-ink px-6 pt-80 sm:px-10 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex items-center justify-center gap-6 sm:gap-10"
      >
        <button aria-label="Previous" className="shrink-0 transition-opacity hover:opacity-60">
          <Chevron direction="left" />
        </button>

        <div className="max-w-xs text-center font-body text-[clamp(0.8rem,1.1vw,1rem)] leading-relaxed text-white/75 sm:max-w-sm">
          <p className="tracking-wide">HELLO !</p>
          <p>I am Sayan, a frontend developer</p>
          <p className="tracking-widest">Welcome to my portfolio</p>
        </div>

        <button aria-label="Next" className="shrink-0 transition-opacity hover:opacity-60">
          <Chevron direction="right" />
        </button>
      </motion.div>
    </section>
  );
}
