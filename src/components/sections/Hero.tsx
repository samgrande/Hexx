"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ─── Name cycling data ─────────────────────────────────────────────────────
const NAMES = ["Sayan", "सयान", "সায়ন"] as const;

// Scramble character pools — one per script
const POOL: Record<number, string> = {
  0: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  1: "अआइईउऊएकखगघचछजझटठडढतथदधनपफबभमयरलवशसह",
  2: "অআইউএওকখগঘচছজঝটঠডঢতথদধনপফবভমযরলশসহ",
};

const SCRAMBLE_FRAMES   = 18;  // total frames of scramble
const FRAME_INTERVAL_MS = 55;  // ~18 fps — readable scramble speed
const HOLD_MS           = 2800; // how long to display each name

function useNameCycle() {
  const [display, setDisplay] = useState<string>(NAMES[0]);
  const idxRef      = useRef(0);
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const clear = () => {
      if (timerRef.current)    clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    const scrambleTo = (nextIdx: number) => {
      const target = NAMES[nextIdx];
      const pool   = POOL[nextIdx];
      let frame    = 0;

      intervalRef.current = setInterval(() => {
        frame++;
        const settled = Math.floor((frame / SCRAMBLE_FRAMES) * target.length);

        // Build the displayed string: left chars are settled, rest are random
        let result = "";
        // Use spread to handle multi-byte chars (Bengali diacritics etc.)
        const targetChars = [...target];
        for (let i = 0; i < targetChars.length; i++) {
          if (i < settled) {
            result += targetChars[i];
          } else {
            result += pool[Math.floor(Math.random() * pool.length)];
          }
        }
        setDisplay(result);

        if (frame >= SCRAMBLE_FRAMES) {
          clearInterval(intervalRef.current!);
          setDisplay(target);          // ensure exact final value
          idxRef.current = nextIdx;
          // Hold, then scramble to next
          timerRef.current = setTimeout(() => {
            scrambleTo((nextIdx + 1) % NAMES.length);
          }, HOLD_MS);
        }
      }, FRAME_INTERVAL_MS);
    };

    // Wait a beat after mount before the first transition
    timerRef.current = setTimeout(() => {
      scrambleTo(1);
    }, HOLD_MS);

    return clear;
  }, []);

  return display;
}

// ─── Framer Motion variants ───────────────────────────────────────────────
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
} as const;

const word = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const greeting = "HELLO !".split(" ");

// Section 1 — the centered HELLO intro.
export default function Hero() {
  const name = useNameCycle();

  return (
    <section className="snap-section relative flex min-h-[60vh] w-full flex-col overflow-hidden bg-ink px-6 pt-72 sm:px-10 md:px-16">
      {/* Subtle spotlight behind the text */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-start justify-center pt-48"
      >
        <div className="h-64 w-64 rounded-full bg-white/[0.03] blur-3xl" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center gap-5 text-center"
      >
        {/* HELLO greeting — staggered word reveal */}
        <div className="flex gap-3">
          {greeting.map((w, i) => (
            <motion.span
              key={i}
              variants={word}
              className="font-body text-[clamp(0.65rem,1vw,0.8rem)] font-semibold uppercase tracking-[0.35em] text-white/40"
            >
              {w}
            </motion.span>
          ))}
        </div>

        {/* Main introduction — "I am <cycling name>," */}
        <motion.p
          variants={word}
          className="font-display text-[clamp(1.6rem,3.5vw,3rem)] italic leading-[1.15] tracking-[-0.01em] text-white"
        >
          {"I am "}
          {/* Monospaced container keeps width stable during scramble */}
          <span
            className="inline-block font-mono"
            style={{ minWidth: "4.5ch" }}
            aria-label={`Sayan — also written as सयान or সায়ন`}
          >
            {name}
          </span>
          {","}
        </motion.p>

        <motion.p
          variants={word}
          className="max-w-xs font-body text-[clamp(0.85rem,1.3vw,1.05rem)] font-light leading-relaxed text-white/55 sm:max-w-sm"
        >
          a frontend developer&nbsp;&amp;&nbsp;designer
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          variants={word}
          className="mt-2 flex flex-col items-center gap-2"
        >
          <span className="font-body text-[0.65rem] uppercase tracking-[0.3em] text-white/25">
            scroll
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="block h-4 w-px bg-gradient-to-b from-white/30 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
