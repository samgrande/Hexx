"use client";

import { useRef, ReactNode, createContext, useContext } from "react";
import { useScroll, MotionValue, useMotionValue } from "framer-motion";

const StickyProgressContext = createContext<MotionValue<number> | null>(null);

/** Read the 0→1 pin progress from inside a StickyHandoff's children. */
export function useStickyProgress() {
  const ctx = useContext(StickyProgressContext);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const fallback = useMotionValue(0);
  return ctx ?? fallback;
}

interface StickyHandoffProps {
  /** How much extra scroll room (in vh) the element stays pinned for. */
  extraVh?: number;
  children: ReactNode;
}

/**
 * Pins its content to the screen for an extra stretch of scroll, then
 * releases it back into normal document flow.
 *
 * How it works: the outer div reserves `100vh + extraVh` of real scroll
 * space. The inner div is `position: sticky; top: 0; height: 100vh`, so
 * it stays pinned to the viewport for exactly that reserved distance.
 * Once the user scrolls past it, the outer div runs out of height, the
 * sticky element naturally un-pins, and whatever comes next in the page
 * scrolls up over it like normal content — no manual toggling needed.
 *
 * Progress across the pin is shared with descendants via context (not a
 * render-prop function) so this component can be used directly from a
 * Server Component like page.tsx — only plain JSX crosses that
 * boundary cleanly, functions don't.
 */
export default function StickyHandoff({
  extraVh = 70,
  children,
}: StickyHandoffProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      style={{ height: `calc(100vh + ${extraVh}vh)` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen w-full items-start justify-center overflow-hidden bg-ink">
        <StickyProgressContext.Provider value={scrollYProgress}>
          {children}
        </StickyProgressContext.Provider>
      </div>
    </div>
  );
}
