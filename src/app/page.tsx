import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Intro from "@/components/sections/Intro";
import Hobbies from "@/components/sections/Hobbies";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import SmoothScrollSnap from "@/components/SmoothScrollSnap";

// One continuous, normal-flow scrolling page divided into: Hero, Projects,
// Intro, Hobbies, Skills and Contact sections.
export default function Home() {
  return (
    <main className="flex flex-col bg-ink">
      <SmoothScrollSnap />
      <Hero />
      <Projects />
      <Intro />
      <Hobbies />
      <Skills />
      <Contact />
    </main>
  );
}
