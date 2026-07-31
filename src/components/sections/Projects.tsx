"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/data/content";
import CoolStuffsHandoff from "@/components/CoolStuffsHandoff";

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 40" className="h-6 w-4 text-white/80" fill="none">
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

const CARDS_PER_PAGE = 3;

// Section 2 — the projects section. Opens with the "cool stuffs" headline,
// then the project cards.
export default function Projects() {
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);

  const totalPages = Math.max(1, Math.ceil(projects.length / CARDS_PER_PAGE));
  const visible = projects.slice(
    page * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE + CARDS_PER_PAGE
  );

  const next = () => {
    setDir(1);
    setPage((p) => (p + 1) % totalPages);
  };
  const prev = () => {
    setDir(-1);
    setPage((p) => (p - 1 + totalPages) % totalPages);
  };

  return (
    <section className="snap-section relative flex min-h-screen w-full flex-col items-center justify-center gap-10 overflow-hidden bg-ink px-6 py-16 sm:px-10 md:px-16">
      <CoolStuffsHandoff />

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="-mt-4 max-w-2xl text-center font-body text-[clamp(1.1rem,2vw,1rem)] text-white/80"
      >
        Which is not limited to but definitely includes some of my projects
        below.
      </motion.p>

      <div className="flex items-center justify-center gap-4 sm:gap-8">
        <button
          aria-label="Previous projects"
          onClick={prev}
          className="shrink-0 rounded-full p-2 transition-opacity hover:opacity-60 disabled:opacity-20"
          disabled={totalPages <= 1}
        >
          <Chevron direction="left" />
        </button>

        <div className="grid w-full max-w-[100rem] grid-cols-1 gap-6 overflow-hidden sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          <AnimatePresence mode="wait" custom={dir}>
            {visible.map((project) => (
              <motion.article
                key={project.id}
                custom={dir}
                initial={{ opacity: 0, x: 24 * dir }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 * dir }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                whileHover={{ y: -3 }}
                className="flex min-h-[20rem] flex-col items-start gap-8 rounded-2xl bg-white/[0.03] p-8 transition-colors duration-300 hover:bg-white/[0.06] sm:flex-row sm:items-center"
              >
                <div className="relative h-[106px] w-[106px] shrink-0 overflow-hidden rounded-full bg-white/[0.02]">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="106px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-[clamp(1.512rem,2.16vw,2.16rem)] text-white">
                    {project.name}
                  </h3>
                  <p className="font-body text-[clamp(0.81rem,1.026vw,0.972rem)] leading-relaxed text-white/60">
                    {project.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        <button
          aria-label="Next projects"
          onClick={next}
          className="shrink-0 rounded-full p-2 transition-opacity hover:opacity-60 disabled:opacity-20"
          disabled={totalPages <= 1}
        >
          <Chevron direction="right" />
        </button>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              aria-label={`Go to page ${i + 1}`}
              onClick={() => {
                setDir(i > page ? 1 : -1);
                setPage(i);
              }}
              className={`h-1.5 rounded-full transition-all ${
                i === page ? "w-6 bg-white/80" : "w-1.5 bg-white/25 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
