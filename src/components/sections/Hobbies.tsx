"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DraggablePhotoStrip from "../DraggablePhotoStrip";
import { collagePhotos } from "@/data/content";

// Section 4 — the hobbies section: a drag-to-move photo carousel of
// gaming/cars shots with a caption that follows the centered card.
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

      {/* scrim so the caption stays legible over the photos */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-ink via-ink/70 to-transparent" />

      <div className="pointer-events-none absolute inset-x-0 bottom-[6%] z-20 px-6 text-center sm:bottom-[8%]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h2 className="font-display text-[clamp(1.8rem,5vw,4rem)] italic leading-none text-white">
              {hobbies[active].title}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl font-body text-[clamp(0.85rem,1.2vw,1.1rem)] leading-relaxed text-white/70">
              {hobbies[active].text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
