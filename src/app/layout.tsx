import type { Metadata } from "next";
import { Roboto, Roboto_Condensed, Bodoni_Moda } from "next/font/google";
import "./globals.css";

// Bodoni Moda stands in for the Figma file's "Triodion" display face —
// Triodion is not a licensed web font. Swap the import below for your
// licensed Triodion font-face (see the comment in tailwind.config.ts)
// once you have the files, and this substitution disappears everywhere.
const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-triodion",
  display: "swap",
});

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-roboto-condensed",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sayan Biswas — Portfolio",
  description: "Frontend developer portfolio — Sayan Biswas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bodoniModa.variable} ${robotoCondensed.variable} ${roboto.variable} bg-ink text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
