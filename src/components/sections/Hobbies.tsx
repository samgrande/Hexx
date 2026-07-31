"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DraggablePhotoStrip from "../DraggablePhotoStrip";
import { collagePhotos } from "@/data/content";

// Section 4 — the hobbies section: drag-to-move photo carousel.
const hobbies = [
  {
    title: "GYM",
    text: "I try to hit the gym a few times a week — it clears my head and keeps me strong and disciplined.",
  },
  {
    title: "GAMING",
    text: "I am very much invested into video games, be it single player or multiplayer.",
  },
  {
    title: "MOVIES",
    text: "I love watching movies, from slow character-driven dramas to big, loud blockbusters.",
  },
];

export default function Hobbies() {
  const [active, setActive] = useState(0);

  return (
    <section className="snap-section relative h-screen w-full overflow-hidden bg-ink">
      <DraggablePhotoStrip
        photos={collagePhotos.slice(2, 5)}
        className="h-full w-full"
        onActiveChange={setActive}
      />

      {/* Bottom scrim for legibility */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-ink via-ink/75 to-transparent" />

      {/* Caption overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[7%] z-20 px-6 text-center sm:bottom-[9%]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Section label above title */}
            <span className="mb-3 block font-body text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-white/35">
              &lt;&nbsp;When I&apos;m not coding&nbsp;&gt;
            </span>

            <h2 className="font-display text-[clamp(2.2rem,6vw,5rem)] italic leading-[0.95] tracking-[-0.02em] text-white">
              {hobbies[active].title}
            </h2>

            <p className="mx-auto mt-4 max-w-md font-body text-[clamp(0.82rem,1.15vw,1rem)] font-light leading-[1.7] text-white/60">
              {hobbies[active].text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
