import { useCallback, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import BackToTop from "./components/BackToTop";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Achievements from "./sections/Achievements";
import Resume from "./sections/Resume";
import Contact from "./sections/Contact";

// Show the intro once per session, and never when motion is reduced.
function shouldShowIntro() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return !sessionStorage.getItem("intro-seen");
  } catch {
    return true;
  }
}

export default function App() {
  const [isLoading, setIsLoading] = useState(shouldShowIntro);

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem("intro-seen", "1");
    } catch {
      // Storage unavailable; the intro simply plays again next time.
    }
    setIsLoading(false);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loader" onComplete={finishIntro} />}
      </AnimatePresence>

      <div className="relative min-h-screen bg-dark-bg text-dark-text-primary">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-full focus:bg-white focus:text-black focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>
        <CustomCursor />
        <Navbar />
        <main id="main-content" tabIndex={-1} className="relative outline-none">
          <Hero ready={!isLoading} />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Achievements />
          <Resume />
          <Contact />
        </main>
        <BackToTop />
      </div>
    </MotionConfig>
  );
}
