"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/data/content";
import CoolStuffsHandoff from "@/components/CoolStuffsHandoff";

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 40" className="h-5 w-3.5 text-white/50" fill="none">
      <path
        d={direction === "left" ? "M20 2 4 20l16 18" : "M4 2l16 18-16 18"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Section 2 — the projects section.
export default function Projects() {
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);

  // Responsive cards per page: 1 on mobile, 2 on sm, 3 on lg+
  const [cardsPerPage, setCardsPerPage] = useState(3);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setCardsPerPage((prev) => {
        const next = w < 640 ? 1 : w < 1024 ? 2 : 3;
        if (next !== prev) setPage(0); // reset page on breakpoint change
        return next;
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const totalPages = Math.max(1, Math.ceil(projects.length / cardsPerPage));
  const visible = projects.slice(
    page * cardsPerPage,
    page * cardsPerPage + cardsPerPage
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
    <section className="snap-section relative flex min-h-screen w-full flex-col items-center justify-center gap-8 overflow-hidden bg-ink px-4 py-16 sm:px-8 md:px-14">
      <CoolStuffsHandoff />

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="-mt-2 max-w-lg text-center font-body text-[clamp(0.85rem,1.4vw,1rem)] font-light leading-relaxed text-white/50"
      >
        Which is not limited to — but definitely includes — some of my projects below.
      </motion.p>

      <div className="mt-[10vh] flex w-full max-w-[90rem] items-center justify-center gap-3 sm:gap-6">
        <button
          aria-label="Previous projects"
          onClick={prev}
          className="shrink-0 rounded-full p-3 transition-all duration-200 hover:bg-white/[0.06] disabled:opacity-15"
          disabled={totalPages <= 1}
        >
          <Chevron direction="left" />
        </button>

        <div className="grid w-full grid-cols-1 gap-5 overflow-x-clip sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          <AnimatePresence mode="wait" custom={dir}>
            {visible.map((project, idx) => (
              <motion.article
                key={`${project.id}-${page}`}
                custom={dir}
                initial={{ opacity: 0, x: 30 * dir, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -20 * dir, filter: "blur(4px)" }}
                transition={{
                  duration: 0.42,
                  ease: [0.22, 1, 0.36, 1],
                  delay: idx * 0.06,
                }}
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
                className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0b0d0f] shadow-[0_16px_50px_-20px_rgba(0,0,0,0.9)] transition-colors duration-300 hover:border-white/25"
              >
                {/* Terminal title bar */}
                <div className="flex items-center gap-1.5 border-b border-white/[0.07] bg-white/[0.03] px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-2 font-mono text-[0.68rem] tracking-wide text-white/35">
                    ~/projects/{project.id}
                  </span>
                </div>

                {/* Terminal body — icon left of text */}
                <div className="flex flex-1 items-start gap-4 p-5 sm:gap-5 sm:p-6">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-white/[0.04] ring-1 ring-white/10 sm:h-11 sm:w-11">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="44px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <h3 className="font-body text-[clamp(1.05rem,1.6vw,1.35rem)] leading-tight tracking-[-0.01em] text-white">
                      {project.name}
                    </h3>
                    <p className="font-body text-[clamp(0.76rem,1vw,0.88rem)] font-light leading-[1.65] text-white/55">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Terminal footer */}
                <div className="flex items-center justify-between gap-3 border-t border-white/[0.07] px-5 py-2.5 font-mono text-[0.7rem]">
                  <span className="text-white/35">
                    ➜ <span className="text-white/60">~/projects</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-white/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    open {project.name.toLowerCase()}
                    <span className="inline-block h-3 w-1.5 animate-pulse bg-white/60" />
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        <button
          aria-label="Next projects"
          onClick={next}
          className="shrink-0 rounded-full p-3 transition-all duration-200 hover:bg-white/[0.06] disabled:opacity-15"
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
              className={`h-1 rounded-full transition-all duration-300 ${
                i === page ? "w-8 bg-white/70" : "w-1.5 bg-white/20 hover:bg-white/35"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
