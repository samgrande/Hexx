"use client";

import { motion } from "framer-motion";
import Marquee from "../Marquee";
import { techStack } from "@/data/content";

export default function Skills() {
  return (
    <section className="snap-section relative flex min-h-screen w-full flex-col justify-center gap-8 overflow-hidden bg-ink px-6 py-10 sm:px-10 md:px-16">
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="select-none font-body text-xs uppercase tracking-[0.3em] text-white/50"
      >
        &lt; Core Capabilities &gt;
      </motion.span>

      <Marquee speed={18} className="py-2">
        <span className="mx-6 select-none whitespace-nowrap font-display text-[clamp(2.5rem,9vw,9rem)] italic text-white">
          Python&nbsp;//&nbsp;JavaScript&nbsp;//&nbsp;TypeScript&nbsp;//
        </span>
      </Marquee>

      <div>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4 block select-none font-body text-xs uppercase tracking-[0.3em] text-white/50"
        >
          &lt; Tech Stack &gt;
        </motion.span>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.02 } },
          }}
          className="flex flex-wrap gap-2.5 sm:gap-3"
        >
          {techStack.map((pill, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.06, backgroundColor: "rgba(255,255,255,0.14)" }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-center rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 font-body text-[clamp(0.75rem,1vw,0.9rem)] text-white/85"
            >
              {pill.kind === "text" ? (
                pill.label
              ) : (
                <span role="img" aria-label={pill.label}>
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
