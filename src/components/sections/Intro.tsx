"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const text =
  "I believe design and engineering go hand in hand — one cannot survive on its own, and that is what I try to implement through my work in every project. With 5+ years of experience, I blend engineering precision with design craft to build products that are not just useful, but feel exceptional to use.";

const words = text.split(" ");

// Section 3 — the philosophy / about-me paragraph with word-by-word reveal.
export default function Intro() {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section className="snap-section relative flex min-h-[60vh] w-full flex-col justify-start overflow-hidden bg-ink px-6 pt-20 pb-14 sm:px-10 sm:pt-24 md:px-16 lg:px-20">
      {/* Section label */}
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-4 block select-none font-body text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-white/35"
      >
        &lt;&nbsp;About me&nbsp;&gt;
      </motion.span>

      {/* Word-by-word reveal paragraph */}
      <p
        ref={ref}
        className="max-w-4xl font-body text-[clamp(1.05rem,2vw,1.4rem)] font-light leading-[1.7] tracking-[-0.005em] text-white/80 sm:mx-4 md:mx-0"
      >
        {words.map((w, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.022,
            }}
            className="inline-block mr-[0.28em]"
          >
            {w}
          </motion.span>
        ))}
      </p>
    </section>
  );
}
