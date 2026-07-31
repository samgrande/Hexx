"use client";

import { motion } from "framer-motion";
import { socials } from "@/data/content";

const icons: Record<string, JSX.Element> = {
  Gmail: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
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
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
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
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <rect x="4" y="4" width="16" height="16" rx="4.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="3.3" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="16.3" cy="7.7" r="0.9" fill="currentColor" />
    </svg>
  ),
};

export default function Contact() {
  return (
    <section className="snap-section relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-ink px-6 py-10 sm:px-10 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-xl"
      >
        <p className="font-body text-[clamp(1rem,1.8vw,1.35rem)] text-white/60">
          Want to build something together?
        </p>
        <h2 className="mt-6 flex items-center font-display text-[clamp(1rem,1.6vw,1.35rem)] italic leading-none text-white">
          <span>&lt; Let&apos;s Work Together</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="mx-1.5 h-[1em] w-[1em] text-white"
            aria-hidden
          >
            <path
              d="M5 19 19 5M19 5v6M19 5h-6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>&gt;</span>
        </h2>
      </motion.div>

      <div className="flex flex-col gap-6">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-px w-full origin-left bg-white/15"
        />

        <ul className="flex flex-wrap gap-x-10 gap-y-3 font-body text-[clamp(0.85rem,1vw,1rem)] uppercase tracking-widest text-white/70">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 transition-colors hover:text-white"
              >
                <span className="text-white/50 transition-colors group-hover:text-white">
                  {icons[social.label]}
                </span>
                <span className="relative">
                  {social.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10 select-none font-display text-[clamp(3rem,14vw,18rem)] italic leading-[0.85] text-white"
        >
          Sayan Biswas
        </motion.h1>
      </div>
    </section>
  );
}
