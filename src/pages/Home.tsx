import { homeMeta } from "../lib/pageMeta";
import { useMeta } from "../lib/useMeta";
import { About } from "./home/About";
import { Contact } from "./home/Contact";
import { Experience } from "./home/Experience";
import { Expertise } from "./home/Expertise";
import { GraphicWork } from "./home/GraphicWork";
import { Hero } from "./home/Hero";
import { MoreWork } from "./home/MoreWork";
import { SelectedWork } from "./home/SelectedWork";

export function Home() {
  useMeta(homeMeta);
  return (
    <>
      <Hero />
      <SelectedWork />
      <MoreWork />
      <GraphicWork />
      <About />
      <Expertise />
      <Experience />
      <Contact />
    </>
  );
}
