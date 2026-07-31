"use client";

import { motion } from "framer-motion";

export default function Intro() {
  return (
    <section className="snap-section relative flex min-h-[60vh] w-full flex-col justify-between overflow-hidden bg-ink px-6 pt-16 pb-10 sm:px-10 sm:pt-20 md:px-16">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-3xl font-display text-[clamp(0.95rem,1.8vw,1.6rem)] leading-loose text-white/90 sm:mx-8"
      >
        I believe design and engineering goes hand in hand, one cannot
        survive on its own and that is what I try to implement through my
        work in every project. With my 5 years&nbsp;
        <span className="text-white">+</span>&nbsp;experience and my not so
        recent found interest in software engineering I try to blend
        engineering and design in a product that is not only useful but
        feels good to use.
      </motion.p>
    </section>
  );
}
