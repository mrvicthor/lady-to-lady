import { MotionConfig } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ConferenceBanner from "./components/ConferenceBanner";
import About from "./components/About";
import VisionStatement from "./components/VisionStatement";
import Mission from "./components/Mission";
import Speakers from "./components/Speakers";
import RegisterBand from "./components/RegisterBand";
import Footer from "./components/Footer";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded-full focus:bg-sun focus:px-4 focus:py-2 focus:font-semibold"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <ConferenceBanner />
        <About />
        <VisionStatement />
        <Mission />
        <Speakers />
        <RegisterBand />
      </main>
      <Footer />
    </MotionConfig>
  );
}
