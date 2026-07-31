import type { Metadata } from "next";
import { Bodoni_Moda, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Bodoni Moda — editorial display face for headlines.
const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-triodion",
  display: "swap",
});

// Plus Jakarta Sans — clean, geometric sans for body copy & labels.
// Replaces Roboto Condensed for a more premium feel.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sayan Biswas — Portfolio",
  description:
    "Frontend developer & designer — Sayan Biswas. Building things that feel as good as they look.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bodoniModa.variable} ${jakarta.variable} bg-ink text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
