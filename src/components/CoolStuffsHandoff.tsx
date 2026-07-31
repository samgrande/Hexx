"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import GlitchText from "@/components/GlitchText";

/**
 * The "and I make / cool [portrait] stuffs" headline. Rendered once,
 * directly below the Hero intro, so the greeting and the headline share
 * the first screen.
 */
export default function CoolStuffsHandoff() {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);

  return (
    <div className="mt-8 flex w-full flex-col items-center gap-1.5 px-4 pb-12 sm:pb-20">
      {/* "and I make" sub-label */}
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-1 mr-48 select-none self-center font-body text-[clamp(0.7rem,1.1vw,0.95rem)] font-light italic text-white/45 sm:mr-60"
      >
        and I make
      </motion.span>

      <GlitchText className="flex items-center justify-center gap-4 sm:gap-7 md:gap-10" strength={28}>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="select-none font-display text-[clamp(7rem,14vw,12rem)] italic leading-none tracking-[-0.03em] text-white"
        >
          cool
        </motion.h1>

        {/* Parallax portrait */}
        <div
          ref={imgRef}
          className="relative h-[18vh] w-[24vw] max-h-[160px] max-w-[280px] shrink-0 overflow-hidden rounded-[2rem] sm:h-[22vh] sm:w-[28vw]"
        >
          <motion.div
            style={{ y: parallaxY }}
            className="absolute inset-x-0 -top-[25%] h-[150%]"
          >
            <Image
              src="/images/hero/avatar.png"
              alt="Portrait of Sayan Biswas"
              fill
              sizes="280px"
              className="object-cover"
              priority
            />
          </motion.div>
        </div>

        <motion.h1
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
          className="select-none font-display text-[clamp(7rem,14vw,12rem)] italic leading-none tracking-[-0.03em] text-white"
        >
          stuffs
        </motion.h1>
      </GlitchText>
    </div>
  );
}
