"use client";

import { useRef, useCallback, useEffect, ReactNode } from "react";

interface GlitchTextProps {
  children: ReactNode;
  /** Extra classes applied to the outer wrapper div */
  className?: string;
  /** Unused — kept for API compatibility with existing callers. */
  strength?: number;
}

/**
 * Hover-only cycling neon glow on text:
 * • At rest   — invisible; no layout impact whatsoever.
 * • On hover  — multi-layer text-shadow fades in on ALL descendant text,
 *               slowly cycling hue (R→G→B→R, ~16 s per cycle).
 * • On leave  — decays smoothly back to nothing.
 *
 * Uses CSS text-shadow (an inherited property) so every child text
 * element glows uniformly — not just the part near the cursor.
 * No blob, no SVG filter, no extra DOM nodes.
 */
export default function GlitchText({
  children,
  className = "",
}: GlitchTextProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef  = useRef<number | null>(null);
  const st      = useRef({ intensity: 0, hovering: false });

  // ─── Animation loop ───────────────────────────────────────────────────────
  const tick = useCallback(() => {
    const s    = st.current;
    const wrap = wrapRef.current;
    if (!wrap) return;

    const target = s.hovering ? 1 : 0;
    const rate   = s.hovering ? 0.05 : 0.025;
    s.intensity += (target - s.intensity) * rate;

    const t   = s.intensity;
    const hue = Math.round((performance.now() * 0.001 * 22) % 360); // 22 deg/s

    if (t > 0.004) {
      // Multi-layer text-shadow — large radii for display-size text (up to 12 rem)
      // text-shadow is inherited so every child <h1>, <span>, etc. receives it.
      wrap.style.textShadow = [
        `0 0  10px hsla(${hue},100%,82%,${(t * 0.90).toFixed(3)})`,  // bright core
        `0 0  32px hsla(${hue},100%,72%,${(t * 0.60).toFixed(3)})`,  // inner halo
        `0 0  80px hsla(${hue},100%,65%,${(t * 0.35).toFixed(3)})`,  // wide glow
        `0 0 160px hsla(${hue}, 90%,60%,${(t * 0.16).toFixed(3)})`,  // far bleed
      ].join(", ");

      rafRef.current = requestAnimationFrame(tick);
    } else {
      wrap.style.textShadow = "none";
      rafRef.current = null;
    }
  }, []);

  const startLoop = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const onEnter = useCallback(() => { st.current.hovering = true;  startLoop(); }, [startLoop]);
  const onLeave = useCallback(() => {
    st.current.hovering = false;
    if (rafRef.current === null) startLoop(); // resume decay if already idle
  }, [startLoop]);

  useEffect(() => () => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      ref={wrapRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={className}
    >
      {children}
    </div>
  );
}
