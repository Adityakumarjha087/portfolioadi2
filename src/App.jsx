import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Scene3D from "./components/Scene3D";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Achievements from "./sections/Achievements";
import Contact from "./sections/Contact";
import "./App.css";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="relative min-h-screen text-dark-text-primary bg-dark-bg selection:bg-white/20 selection:text-white">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-full focus:bg-white focus:text-black focus:text-sm focus:font-medium"
          >
            Skip to main content
          </a>

          {/* Custom Trail Cursor */}
          <CustomCursor />

          {/* Sticky Header Nav */}
          <Navbar />

          {/* Fixed Interactive 3D Backdrop Canvas */}
          <Scene3D />

          {/* Single-Page Layout Sections */}
          <main id="main-content" className="relative z-10">
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Achievements />
            <Contact />
          </main>
        </div>
      )}
    </>
  );
}
