"use client";

import { motion } from "framer-motion";
import Marquee from "../Marquee";
import { techStack } from "@/data/content";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.018, delayChildren: 0.1 },
  },
};

const pillVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
};

export default function Skills() {
  return (
    <section className="snap-section relative flex min-h-screen w-full flex-col justify-center gap-10 overflow-hidden bg-ink px-6 py-12 sm:px-10 md:px-16">
      {/* Section label */}
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="select-none font-body text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-white/35"
      >
        &lt;&nbsp;Core Capabilities&nbsp;&gt;
      </motion.span>

      {/* Scrolling languages marquee */}
      <div className="-mx-6 py-3 sm:-mx-10 md:-mx-16">
        <Marquee speed={22} className="py-4">
          <span className="mx-8 select-none whitespace-nowrap font-display text-[clamp(2.8rem,9vw,9rem)] italic leading-[1.15] text-white">
            Python&nbsp;//&nbsp;JavaScript&nbsp;//&nbsp;TypeScript&nbsp;//
          </span>
        </Marquee>
      </div>

      {/* Tech stack pills */}
      <div>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-5 block select-none font-body text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-white/35"
        >
          &lt;&nbsp;Tech Stack&nbsp;&gt;
        </motion.span>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-wrap gap-2 sm:gap-2.5"
        >
          {techStack.map((pill, i) => (
            <motion.span
              key={i}
              variants={pillVariants}
              whileHover={{
                scale: 1.08,
                backgroundColor: "rgba(255,255,255,0.1)",
                borderColor: "rgba(255,255,255,0.18)",
                transition: { duration: 0.2 },
              }}
              className="flex cursor-default items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.05] px-4 py-[7px] font-body text-[clamp(0.72rem,0.95vw,0.85rem)] font-medium text-white/75 transition-colors duration-200"
            >
              {pill.kind === "text" ? (
                pill.label
              ) : (
                <span role="img" aria-label={pill.label} className="leading-none">
                  {pill.emoji}
                </span>
              )}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
