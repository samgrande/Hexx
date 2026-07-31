"use client";

import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Photo {
  id: string;
  src: string;
  rotate: number;
}

interface DraggablePhotoStripProps {
  photos: Photo[];
  className?: string;
  onActiveChange?: (index: number) => void;
}

const cardPositions = [
  { x: -40, y: 65, rotate: -24, scale: 0.6, z: 0 },
  { x: 20, y: 52, rotate: -24, scale: 1.3, z: 1 },
  { x: 50, y: 41, rotate: 0, scale: 1.3, z: 2 },
  { x: 80, y: 52, rotate: 24, scale: 1.3, z: 1 },
  { x: 140, y: 65, rotate: 24, scale: 0.6, z: 0 },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/**
 * Interpolates smoothly between the keyframe positions above for any
 * fractional offset (not just whole numbers), so the coverflow can
 * follow the user's finger in real time during a drag instead of only
 * snapping into place after release.
 */
function posForFraction(offset: number) {
  const clamped = Math.max(-2, Math.min(2, offset));
  const idx = clamped + 2; // 0..4, fractional
  const lo = Math.floor(idx);
  const hi = Math.min(4, lo + 1);
  const t = idx - lo;
  const a = cardPositions[lo];
  const b = cardPositions[hi];

  return {
    x: `${lerp(a.x, b.x, t)}%`,
    y: `${lerp(a.y, b.y, t)}%`,
    rotate: lerp(a.rotate, b.rotate, t),
    scale: lerp(a.scale, b.scale, t),
    z: t < 0.5 ? a.z : b.z,
  };
}

export default function DraggablePhotoStrip({
  photos,
  className = "",
  onActiveChange,
}: DraggablePhotoStripProps) {
  const items = useMemo(() => {
    const result: Photo[] = [];
    for (let i = 0; i < 5; i++) {
      result.push(photos[i % photos.length]);
    }
    return result;
  }, [photos]);

  const limit = items.length - 2;
  const [scroll, setScroll] = useState(1);
  const [insta, setInsta] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPx, setDragPx] = useState(0);

  const advance = useCallback(
    (dir: number) => {
      setScroll((prev) => {
        const next = prev + dir;
        if (next > limit) {
          setInsta(true);
          requestAnimationFrame(() => setInsta(false));
          return 1;
        }
        if (next < 1) {
          setInsta(true);
          requestAnimationFrame(() => setInsta(false));
          return limit;
        }
        return next;
      });
    },
    [limit],
  );

  const startX = useRef(0);
  const dragging = useRef(false);
  const elRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    startX.current = e.clientX;
    dragging.current = true;
    setIsDragging(true);
    setDragPx(0);
    elRef.current?.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    setDragPx(e.clientX - startX.current);
  }, []);

  const finishDrag = useCallback(
    (dx: number) => {
      dragging.current = false;
      setIsDragging(false);
      setDragPx(0);
      if (Math.abs(dx) > 30) advance(dx > 0 ? -1 : 1);
    },
    [advance],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      finishDrag(e.clientX - startX.current);
    },
    [finishDrag],
  );

  const handlePointerCancel = useCallback(() => {
    if (!dragging.current) return;
    finishDrag(0);
  }, [finishDrag]);

  // Report the card sitting in the center so the parent can update its
  // per-card caption. The center card at position `scroll` is
  // photos[scroll % photos.length] (items cycles through the originals).
  useEffect(() => {
    onActiveChange?.(scroll % photos.length);
  }, [scroll, photos.length]);

  // How much of the container's width one full "step" between cards
  // corresponds to — smaller fraction = more sensitive drag.
  const containerWidth = elRef.current?.clientWidth ?? 800;
  const dragUnits = dragPx / (containerWidth * 0.32);

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 400 160"
        className="absolute top-[45%] left-1/2 w-full -translate-x-1/2 -translate-y-1/2 h-auto text-white/40 pointer-events-none"
        fill="none"
      >
        <path
          d="M 0 130 Q 200 30 400 130"
          stroke="currentColor"
          strokeWidth="0.75"
        />
      </svg>

      <div className="absolute inset-0 pointer-events-none">
        {items.map((photo, i) => {
          const offset = i - scroll + dragUnits;
          const pos = posForFraction(offset);
          return (
            <motion.div
              key={`${photo.id}-${i}`}
              animate={{
                left: pos.x,
                top: pos.y,
                x: "-50%",
                y: "-50%",
                rotate: pos.rotate,
                scale: pos.scale,
              }}
              transition={
                isDragging || insta
                  ? { type: false }
                  : { type: "spring", stiffness: 1400, damping: 55 }
              }
              style={{ zIndex: pos.z }}
              className="absolute h-[48vh] w-[32vw] max-h-[480px] max-w-[340px] overflow-hidden rounded-[24px] bg-white/10 shadow-2xl shadow-black/40"
            >
              <Image
                src={photo.src}
                alt=""
                fill
                sizes="220px"
                className="object-cover"
                draggable={false}
              />
            </motion.div>
          );
        })}
      </div>

      <div
        ref={elRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        className={`absolute inset-0 z-10 touch-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      />

      <p className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 select-none font-body text-xs uppercase tracking-widest text-white/40">
        drag ⇄
      </p>
    </div>
  );
}
