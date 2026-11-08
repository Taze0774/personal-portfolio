import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import SectionNav from "@/components/SectionNav";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Hero />
      <SectionNav />
      <Reveal>
        <About />
      </Reveal>
      <Reveal>
        <Skills />
      </Reveal>
      <Reveal>
        <Projects />
      </Reveal>
      <Reveal>
        <Achievements />
      </Reveal>
      <Reveal>
        <Contact />
      </Reveal>
    </>
  );
}
