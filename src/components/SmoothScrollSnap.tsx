"use client";

import { useEffect } from "react";
import { animate } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const SNAP_LOCK = 700;

/**
 * Smooth scroll snapping for the page's `.snap-section` blocks.
 *
 * The native CSS scroll-snap (`scroll-snap-type: y mandatory` on <html>)
 * snaps instantly and feels abrupt, so wheel gestures are intercepted and
 * animated to the next/previous section with a gentle easing instead.
 * CSS snap is only switched off for the duration of the animation so it
 * doesn't fight the eased motion; it stays active for touch/keyboard.
 */
export default function SmoothScrollSnap() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(".snap-section")
    );
    if (sections.length === 0) return;

    let locked = false;
    let lockTimer: ReturnType<typeof setTimeout> | null = null;

    const currentIndex = () => {
      const mid = window.scrollY + window.innerHeight / 2;
      let idx = 0;
      for (let i = 0; i < sections.length; i++) {
        if (mid >= sections[i].offsetTop) idx = i;
        else break;
      }
      return idx;
    };

    const goTo = (index: number) => {
      const target = sections[index];
      if (!target) return;
      const targetY = Math.max(0, target.offsetTop);
      if (Math.abs(window.scrollY - targetY) < 2) return;

      locked = true;
      document.documentElement.style.scrollSnapType = "none";

      animate(window.scrollY, targetY, {
        duration: 0.8,
        ease: EASE,
        onUpdate: (v) => window.scrollTo(0, v),
        onComplete: () => {
          document.documentElement.style.scrollSnapType = "";
          if (lockTimer) clearTimeout(lockTimer);
          lockTimer = setTimeout(() => {
            locked = false;
          }, 200);
        },
      });
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;

      const idx = currentIndex();
      const section = sections[idx];
      if (section && section.offsetHeight > window.innerHeight + 1) return;

      e.preventDefault();
      if (locked) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      goTo(Math.max(0, Math.min(sections.length - 1, idx + dir)));

      if (lockTimer) clearTimeout(lockTimer);
      lockTimer = setTimeout(() => {
        locked = false;
      }, SNAP_LOCK);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      if (lockTimer) clearTimeout(lockTimer);
      document.documentElement.style.scrollSnapType = "";
    };
  }, []);

  return null;
}
