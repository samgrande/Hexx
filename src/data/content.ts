export const projects = [
  {
    id: "yaadu",
    name: "YAADU",
    description:
      "A fully client-side Android dashboard that communicates with a physical device over USB via the WebUSB API. No backend, no companion app, no native binaries — just a browser tab. Built with React 19 and Material 3.",
    image:
      "https://github.com/samgrande/YAADU/raw/main/assets/hero.png",
    languages: ["TypeScript", "CSS", "HTML"],
  },
  {
    id: "ringr",
    name: "RINGR",
    description:
      "RingR lets you convert YouTube videos into ringtones directly on your device — no server uploads, no file transfers, no accounts. Everything happens locally, so your audio never leaves your phone.",
    image:
      "https://github.com/samgrande/RingR/raw/master/app/src/main/banner.png",
    languages: ["Kotlin", "Java"],
  },
  {
    id: "futoshiki",
    name: "FUTOSHIKI",
    description:
      "A clean, modern Futoshiki puzzle game built with Kotlin and Jetpack Compose, with full-fledged animations thanks to the KorGE engine and custom theming.",
    image:
      "https://github.com/samgrande/Simple-Futoshiki/raw/main/fastlane/metadata/android/en-US/images/icon.png",
    languages: ["Kotlin", "Jetpack Compose"],
  },
];

// Placeholder photo-collage images (Hobbies section).
// Drop real photos into public/images/collage and update these paths.
export const collagePhotos = [
  { id: "p1", src: "/images/collage/photo-1.jpg", rotate: -7 },
  { id: "p2", src: "/images/collage/photo-2.jpg", rotate: 3 },
  { id: "p3", src: "/images/collage/photo-3.jpg", rotate: -4 },
  { id: "p4", src: "/images/collage/photo-4.jpg", rotate: 6 },
  { id: "p5", src: "/images/collage/photo-5.jpg", rotate: -2 },
];

// Tech stack pills. "kind: text" renders a label, "kind: emoji" renders
// a single emoji glyph — mirrors the mixed pill sizes from the Figma file.
export type TechPill =
  | { kind: "text"; label: string }
  | { kind: "emoji"; emoji: string; label: string };

export const techStack: TechPill[] = [
  { kind: "text", label: "React" },
  { kind: "emoji", emoji: "⚛️", label: "React" },
  { kind: "text", label: "Next.js" },
  { kind: "text", label: "TypeScript" },
  { kind: "emoji", emoji: "🐍", label: "Python" },
  { kind: "text", label: "JavaScript" },
  { kind: "emoji", emoji: "🟩", label: "Node.js" },
  { kind: "text", label: "Tailwind CSS" },
  { kind: "emoji", emoji: "🎨", label: "Figma" },
  { kind: "text", label: "Git" },
  { kind: "emoji", emoji: "🐳", label: "Docker" },
  { kind: "text", label: "PostgreSQL" },
  { kind: "emoji", emoji: "🍃", label: "MongoDB" },
  { kind: "text", label: "Framer Motion" },
  { kind: "emoji", emoji: "🔌", label: "REST API" },
  { kind: "text", label: "GraphQL" },
  { kind: "emoji", emoji: "☁️", label: "AWS" },
  { kind: "text", label: "Vercel" },
  { kind: "emoji", emoji: "🔧", label: "WebUSB" },
  { kind: "text", label: "Material 3" },
  { kind: "emoji", emoji: "🐧", label: "Linux" },
  { kind: "text", label: "Redux" },
  { kind: "emoji", emoji: "🔥", label: "Firebase" },
  { kind: "text", label: "HTML / CSS" },
];

export const socials = [
  { label: "Github", href: "https://github.com/samgrande" },
  { label: "Linkedin", href: "https://www.linkedin.com/in/sayan-biswas-4b3a79152/" },
  { label: "Instagram", href: "https://www.instagram.com/_aerez_/" },
];
