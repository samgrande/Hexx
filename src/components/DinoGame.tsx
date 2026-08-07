"use client";

import { useRef, useEffect, useCallback, useState } from "react";

type GameState = "idle" | "running" | "over";

interface Obstacle {
  x: number;
  w: number;
  h: number;
  counted?: boolean;
}

interface Game {
  visible: boolean;
  state: GameState;
  W: number;
  humanY: number;
  vy: number;
  onGround: boolean;
  frame: number;
  speed: number;
  obstacles: Obstacle[];
  spawnAt: number;
  overAt: number;
  blinkT: number;
  score: number;
}

// Logical canvas geometry (CSS px). The bottom edge of the canvas sits
// directly on the divider line in Contact.tsx, which acts as the ground.
const H = 200;
const GROUND = H;
const HUMAN_W = 13;
const HUMAN_H = 21;
const HUMAN_X = 30;
const GRAVITY = 620; // px / s^2
const JUMP_V = -200; // px / s
const REF_WIDTH = 700; // reference width for pacing across screen sizes
const PIXEL = 2.5; // CSS px per rendered pixel — retro 8-bit resolution

// Fully rounded rect path (no fill).
function rr(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Rounded top, square bottom — classic cactus / chunky retro silhouette.
function rrTop(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x, y + h);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h);
  ctx.closePath();
  ctx.fill();
}

function drawCactus(ctx: CanvasRenderingContext2D, o: Obstacle) {
  const x = o.x;
  const y = GROUND - o.h;
  const w = o.w;
  const h = o.h;
  ctx.save();
  ctx.globalAlpha = 0.35;
  ctx.fillStyle = "#fff";
  rrTop(ctx, x, y, w, h, w / 2);
  rrTop(ctx, x - w * 0.45, y + h * 0.3, w * 0.42, h * 0.32, w * 0.16);
  rrTop(ctx, x + w * 0.8, y + h * 0.5, w * 0.42, h * 0.32, w * 0.16);
  ctx.restore();
}

function drawHuman(ctx: CanvasRenderingContext2D, g: Game, t: number) {
  const state = g.state;
  const bob = state === "idle" ? Math.sin(t * 2.2) * 0.35 : 0;
  ctx.save();
  ctx.translate(0, -bob);

  const cx = HUMAN_X + HUMAN_W / 2;
  const top = g.humanY;
  const lean = state === "idle" ? 0 : 0.8;
  const headX = cx + lean * 0.6;
  const headY = top + 3.2;
  const shX = cx + lean * 0.7;
  const shY = top + 7.4;
  const hipX = cx + lean * 1.2;
  const hipY = top + 13.6;

  ctx.lineCap = "round";
  ctx.lineWidth = 1.8;
  ctx.fillStyle = "#fff";

  // head, sitting upright on the neck
  ctx.beginPath();
  ctx.arc(headX, headY, 2.9, 0, Math.PI * 2);
  ctx.fill();

  // torso — upright rounded block
  rr(ctx, cx - 3.2, shY - 0.5, 6.4, hipY - shY + 1.5, 2.4);
  ctx.fill();

  let legF = 0;
  let legB = 0;
  let armF = 0;
  let armB = 0;
  const p = g.frame;

  if (state === "running") {
    const la = Math.sin(p) * 0.65;
    legF = la;
    legB = -la;
    armF = -la * 0.8;
    armB = la * 0.8;
    if (!g.onGround) {
      // tuck up on the jump
      legF = 0.6;
      legB = -1.3;
      armF = 1.9;
      armB = -1.9;
    }
  } else if (state === "over") {
    legF = 0.7;
    legB = -0.7;
    armF = 2.2;
    armB = -2.2;
  }

  const thighLen = 3.4;
  const shinLen = 3.6;
  const uarmLen = 2.2;
  const farmLen = 2.4;
  // knees extend when the thigh swings forward, heel kicks up when it swings back
  const knee = (a: number) => a - (0.6 + Math.max(0, -a) * 0.9);
  const elbow = (a: number) => a - 1.2;

  const limbStyle = "rgba(255,255,255,0.85)";
  ctx.strokeStyle = limbStyle;

  const limb2 = (
    x: number,
    y: number,
    a1: number,
    l1: number,
    a2: number,
    l2: number,
  ): [number, number] => {
    const mx = x + Math.sin(a1) * l1;
    const my = y + Math.cos(a1) * l1;
    const ex = mx + Math.sin(a2) * l2;
    const ey = my + Math.cos(a2) * l2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(mx, my);
    ctx.lineTo(ex, ey);
    ctx.stroke();
    return [ex, ey];
  };

  const footF = limb2(hipX, hipY, legF, thighLen, knee(legF), shinLen);
  const footB = limb2(hipX, hipY, legB, thighLen, knee(legB), shinLen);
  const handF = limb2(shX, shY, armF, uarmLen, elbow(armF), farmLen);
  const handB = limb2(shX, shY, armB, uarmLen, elbow(armB), farmLen);

  ctx.fillStyle = limbStyle;
  for (const [ex, ey] of [footF, footB]) {
    ctx.beginPath();
    ctx.arc(ex, ey, 0.8, 0, Math.PI * 2);
    ctx.fill();
  }
  for (const [ex, ey] of [handF, handB]) {
    ctx.beginPath();
    ctx.arc(ex, ey, 0.65, 0, Math.PI * 2);
    ctx.fill();
  }

  if (state === "over") {
    ctx.strokeStyle = "rgba(255,255,255,0.95)";
    ctx.lineWidth = 1.1;
    for (const [ex, ey] of [
      [headX + 1.2, headY - 0.4],
      [headX + 1.2, headY + 0.9],
    ]) {
      ctx.beginPath();
      ctx.moveTo(ex - 0.8, ey - 0.8);
      ctx.lineTo(ex + 0.8, ey + 0.8);
      ctx.moveTo(ex + 0.8, ey - 0.8);
      ctx.lineTo(ex - 0.8, ey + 0.8);
      ctx.stroke();
    }
  } else if (state !== "idle" || g.blinkT % 3 < 2.7) {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(headX + 1.2, headY - 0.5, 0.65, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

/**
 * A tiny "run me" game that plays along the divider line above the giant
 * name in the Contact section. A stick runner idles until you jump (Space,
 * ArrowUp, click or tap), then dodges scrolling cacti. Pauses off-screen.
 */
export default function DinoGame() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  const [ui, setUi] = useState<GameState>("idle");
  const [score, setScore] = useState(0);

  const game = useRef<Game>({
    visible: true,
    state: "idle",
    W: 0,
    humanY: GROUND - HUMAN_H,
    vy: 0,
    onGround: true,
    frame: 0,
    speed: 150,
    obstacles: [],
    spawnAt: 0,
    overAt: 0,
    blinkT: Math.random() * 2,
    score: 0,
  });

  const jump = useCallback(() => {
    const g = game.current;
    if (g.state === "idle") {
      g.state = "running";
      setUi("running");
    }
    if (g.state === "running" && g.onGround) {
      g.vy = JUMP_V;
      g.onGround = false;
    } else if (g.state === "over") {
      if (performance.now() - g.overAt > 450) {
        g.state = "running";
        g.humanY = GROUND - HUMAN_H;
        g.vy = JUMP_V;
        g.onGround = false;
        g.frame = 0;
        g.speed = 150;
        g.obstacles = [];
        g.spawnAt = 0;
        g.score = 0;
        setScore(0);
        setUi("running");
      }
    }
  }, []);

  const draw = useCallback(
    (ts: number) => {
      const g = game.current;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      rafRef.current = requestAnimationFrame(draw);

      if (!canvas || !ctx || !g.visible) return;

      ctx.setTransform(1 / PIXEL, 0, 0, 1 / PIXEL, 0, 0);
      ctx.clearRect(0, 0, g.W, H);

      const dt = Math.min((ts - lastRef.current) / 1000, 0.05);
      lastRef.current = ts;

      if (g.state === "running") {
        g.speed = Math.min(280, g.speed + 4 * dt);
        const scale = Math.max(0.55, Math.min(2.2, g.W / REF_WIDTH));
        const spd = g.speed * scale;

        g.frame += dt * (6 + spd / 26);

        if (!g.onGround) {
          g.vy += GRAVITY * dt;
          g.humanY += g.vy * dt;
          if (g.humanY >= GROUND - HUMAN_H) {
            g.humanY = GROUND - HUMAN_H;
            g.vy = 0;
            g.onGround = true;
          }
        }

        g.spawnAt += spd * dt;
        if (g.spawnAt > g.W * (0.45 + Math.random() * 0.15)) {
          g.spawnAt = 0;
          const tall = Math.random() < 0.5;
          g.obstacles.push({ x: g.W + 10, w: tall ? 11 : 9, h: tall ? 22 : 15 });
        }

        for (const o of g.obstacles) o.x -= spd * dt;

        for (const o of g.obstacles) {
          if (!o.counted && o.x + o.w < HUMAN_X) {
            o.counted = true;
            g.score += 1;
            setScore(g.score);
          }
        }

        g.obstacles = g.obstacles.filter((o) => o.x + o.w > -10);

        const hb = { x: HUMAN_X + 3, y: g.humanY + 3, w: HUMAN_W - 6, h: HUMAN_H - 4 };
        for (const o of g.obstacles) {
          const ob = { x: o.x + 2, y: GROUND - o.h + 2, w: o.w - 4, h: o.h - 4 };
          if (
            hb.x < ob.x + ob.w &&
            hb.x + hb.w > ob.x &&
            hb.y < ob.y + ob.h &&
            hb.y + hb.h > ob.y
          ) {
            g.state = "over";
            g.overAt = ts;
            setUi("over");
            break;
          }
        }
      } else if (g.state === "idle") {
        g.blinkT += dt;
      }

      for (const o of g.obstacles) drawCactus(ctx, o);
      drawHuman(ctx, g, ts / 1000);
    },
    [],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const w = Math.max(200, rect.width);
      canvas.width = Math.max(80, Math.round(w / PIXEL));
      canvas.height = Math.round(H / PIXEL);
      game.current.W = w;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const io = new IntersectionObserver(([entry]) => {
      game.current.visible = entry.isIntersecting;
    });
    io.observe(wrap);

    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Space" && e.code !== "ArrowUp") return;
      if (!game.current.visible) return;
      e.preventDefault();
      jump();
    };
    window.addEventListener("keydown", onKey);

    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("keydown", onKey);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [draw, jump]);

  return (
    <div
      ref={wrapRef}
      onPointerDown={jump}
      className="relative w-full cursor-pointer select-none touch-manipulation"
    >
      <canvas ref={canvasRef} className="block w-full [image-rendering:pixelated]" />

      {ui === "idle" && (
        <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-col items-center">
          <span className="font-mono text-[0.72rem] tracking-[0.25em] text-white/30">
            Take me for a run
          </span>
          <span className="mt-2 font-mono text-[0.6rem] tracking-[0.25em] text-white/20">
            press space to start
          </span>
        </div>
      )}

      {ui === "over" && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center pt-1">
          <span className="font-mono text-[0.72rem] tracking-[0.25em] text-white/60">
            You scored
          </span>
          <span className="mt-2 rounded-full bg-white px-3 py-1 font-mono text-[0.72rem] font-bold tracking-[0.2em] text-black">
            {score}
          </span>
          <span className="mt-3 font-mono text-[0.6rem] tracking-[0.25em] text-white/30">
            press again to give another try
          </span>
        </div>
      )}
    </div>
  );
}
