"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

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
    <div className="mt-10 flex w-full flex-col items-center gap-2 px-6 pb-16 sm:pb-24">
      <span className="mr-60 select-none font-display text-[clamp(1.3rem,2.3vw,1.3rem)] italic text-white/90">
        and I make
      </span>

      <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-10">
        <h1 className="select-none font-display text-[clamp(8rem,15vw,13rem)] italic leading-none text-white">
          cool
        </h1>

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

        <h1 className="select-none font-display text-[clamp(8rem,15vw,13rem)] italic leading-none text-white">
          stuffs
        </h1>
      </div>
    </div>
  );
}
