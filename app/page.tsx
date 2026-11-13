import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import SectionNav from "@/components/SectionNav";
import BackgroundDesign from "@/components/BackgroundDesign";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative isolate">
        <BackgroundDesign />
        <SectionNav />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </div>
    </>
  );
}
