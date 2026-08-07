"use client";

import React from "react";
import { motion } from "framer-motion";
import { socials } from "@/data/content";
import GlitchText from "@/components/GlitchText";
import DinoGame from "@/components/DinoGame";

const icons: Record<string, React.ReactElement> = {
  Github: (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.13-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  ),
  Linkedin: (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
      <path
        d="M6.5 8.5v9M6.5 5.51v.01M11 17.5v-5.2c0-1.8 1.2-3.3 3-3.3s3 1.2 3 3.3v5.2M11 9.5v8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
      <rect x="4" y="4" width="16" height="16" rx="4.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="3.3" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="16.3" cy="7.7" r="0.9" fill="currentColor" />
    </svg>
  ),
};

export default function Contact() {
  return (
    <section className="snap-section relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-ink px-6 pt-14 pb-28 sm:px-10 md:px-16 lg:px-20">
      {/* Top content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl"
      >
        <span className="mb-5 block font-body text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-white/35">
          &lt;&nbsp;Get in touch&nbsp;&gt;
        </span>

        <p className="font-body text-[clamp(1rem,1.7vw,1.3rem)] font-light leading-relaxed text-white/55">
          Want to build something together?
        </p>

        <h2 className="mt-5 flex items-center gap-2 font-mono text-[clamp(0.9rem,1.4vw,1.1rem)] leading-tight tracking-[-0.01em] text-white">
          <span className="font-bold">&lt;</span>
          <span>Let&apos;s Work Together</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-[1em] w-[1em] shrink-0 text-white/60"
            aria-hidden
          >
            <path
              d="M5 19 19 5M19 5v6M19 5h-6"
              stroke="currentColor"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-bold">&gt;</span>
        </h2>
      </motion.div>

      {/* Bottom — divider, links, giant name */}
      <div className="flex flex-col gap-7">
        {/* Mini runner game — the divider line below is its ground */}
        <div className="relative w-full">
          <DinoGame />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="h-px w-full origin-left bg-white/35"
          />
        </div>

        {/* Social links */}
        <motion.ul
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="flex flex-wrap gap-x-8 gap-y-3 font-body text-[clamp(0.72rem,0.9vw,0.88rem)] font-semibold uppercase tracking-[0.22em] text-white/50"
        >
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 transition-colors duration-200 hover:text-white"
              >
                <span className="text-white/35 transition-colors duration-200 group-hover:text-white/70">
                  {icons[social.label]}
                </span>
                <span className="relative">
                  {social.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-white/60 transition-all duration-300 group-hover:w-full" />
                </span>
              </a>
            </li>
          ))}
        </motion.ul>

        {/* Giant name with glitch-liquid effect */}
        <GlitchText className="block" strength={35}>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="select-none font-display text-[clamp(3.2rem,13.5vw,17rem)] italic leading-[0.82] tracking-[-0.03em] text-white/90"
          >
            Sayan Biswas
          </motion.h1>
        </GlitchText>
      </div>
    </section>
  );
}
