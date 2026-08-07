"use client";

import {
  useRef,
  useCallback,
  useEffect,
  Children,
  isValidElement,
  cloneElement,
} from "react";
import type { ReactNode, ReactElement } from "react";

interface GlitchTextProps {
  children: ReactNode;
  /** Extra classes applied to the outer wrapper div */
  className?: string;
  /** Unused — kept for API compatibility with existing callers. */
  strength?: number;
  /** Glow radius in px — only characters inside this distance from the
   *  cursor light up. Defaults to 150. */
  radius?: number;
}

/**
 * Mouse-tracking neon glow on text:
 * • At rest        — invisible; no layout impact whatsoever.
 * • On hover       — a localized neon halo. Only the characters inside
 *                    `radius` px of the cursor glow, brightest at the
 *                    cursor and tapering to nothing at the edge, so the
 *                    glow follows the mouse across the text.
 * • On leave       — decays smoothly back to nothing.
 *
 * Every string child is split into per-character <span>s (data-glow-char)
 * so each glyph can be lit independently; non-text children (images, etc.)
 * pass through untouched.
 */
export default function GlitchText({
  children,
  className = "",
  radius = 150,
}: GlitchTextProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const st = useRef({ intensity: 0, hovering: false, mx: 0, my: 0 });

  const tick = useCallback(() => {
    const s = st.current;
    const wrap = wrapRef.current;
    if (!wrap) return;

    const hue = Math.round((performance.now() * 0.001 * 22) % 360); // 22 deg/s
    const nodes = wrap.querySelectorAll<HTMLElement>("[data-glow-char]");
    let anyActive = false;

    for (const node of nodes) {
      const r = node.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dist = Math.hypot(s.mx - cx, s.my - cy);

      const target = s.hovering ? Math.max(0, 1 - dist / radius) : 0;
      const rate = s.hovering ? 0.25 : 0.1;
      const t = Number(node.dataset.glow || 0);
      const next = t + (target - t) * rate;

      node.dataset.glow = String(next);
      if (next > 0.004) {
        anyActive = true;
        node.style.textShadow = [
          `0 0  10px hsla(${hue},100%,82%,${(next * 0.9).toFixed(3)})`, // bright core
          `0 0  32px hsla(${hue},100%,72%,${(next * 0.6).toFixed(3)})`, // inner halo
          `0 0  80px hsla(${hue},100%,65%,${(next * 0.35).toFixed(3)})`, // wide glow
          `0 0 160px hsla(${hue}, 90%,60%,${(next * 0.16).toFixed(3)})`, // far bleed
        ].join(", ");
      } else {
        node.dataset.glow = "0";
        node.style.textShadow = "none";
      }
    }

    if (anyActive || s.hovering) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      rafRef.current = null;
    }
  }, [radius]);

  const startLoop = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const onEnter = useCallback(() => {
    st.current.hovering = true;
    startLoop();
  }, [startLoop]);

  const onMove = useCallback((e: React.MouseEvent) => {
    st.current.mx = e.clientX;
    st.current.my = e.clientY;
  }, []);

  const onLeave = useCallback(() => {
    st.current.hovering = false;
    if (rafRef.current === null) startLoop(); // resume decay if already idle
  }, [startLoop]);

  useEffect(() => () => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
  }, []);

  const decorate = (child: ReactNode): ReactNode =>
    Children.map(child, (c) => {
      if (typeof c === "string" || typeof c === "number") {
        return String(c)
          .split("")
          .map((ch, i) => (
            <span key={i} data-glow-char>
              {ch}
            </span>
          ));
      }
      if (isValidElement(c)) {
        return cloneElement(
          c as ReactElement<{ children?: ReactNode }>,
          {},
          decorate((c as ReactElement<{ children?: ReactNode }>).props.children),
        );
      }
      return c;
    });

  return (
    <div
      ref={wrapRef}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
    >
      {decorate(children)}
    </div>
  );
}
