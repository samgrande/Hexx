"use client";

import React from "react";
import { motion } from "framer-motion";
import { socials } from "@/data/content";
import GlitchText from "@/components/GlitchText";

const icons: Record<string, React.ReactElement> = {
  Gmail: (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
      <path
        d="M3 6.5 12 13l9-6.5M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
    <section className="snap-section relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-ink px-6 py-14 sm:px-10 md:px-16 lg:px-20">
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

        <h2 className="mt-5 flex items-center gap-2 font-display text-[clamp(1.2rem,2vw,1.7rem)] italic leading-tight tracking-[-0.01em] text-white">
          <span>&lt; Let&apos;s Work Together</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-[1em] w-[1em] shrink-0 text-white/60"
            aria-hidden
          >
            <path
              d="M5 19 19 5M19 5v6M19 5h-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>&gt;</span>
        </h2>
      </motion.div>

      {/* Bottom — divider, links, giant name */}
      <div className="flex flex-col gap-7">
        {/* Animated divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="h-px w-full origin-left bg-white/10"
        />

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
