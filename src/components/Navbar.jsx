import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navItems, profile, resumes } from "../data/site";
import ResumeMenu from "./ResumeMenu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    const ids = ["hero", ...navItems.map((n) => n.id)];
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      // Last section whose top has passed the upper third of the viewport.
      const line = window.innerHeight * 0.35;
      let current = "hero";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // A short final section may never reach that line.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = ids[ids.length - 1];
      }
      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // While the mobile menu is open: lock page scroll and let Escape close it
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = (e) => e.matches && setIsOpen(false);
    window.addEventListener("keydown", handleKeyDown);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-40 transition-[background-color,padding,border-color] duration-300 border-b ${
          scrolled || isOpen ? "bg-black/80 backdrop-blur-md border-dark-border py-3" : "bg-transparent border-transparent py-5"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-12 flex justify-between items-center gap-6">
          <a href="#hero" onClick={close} className="font-display font-bold text-xl tracking-wide text-white">
            {profile.shortName}
          </a>

          <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={active ? "true" : undefined}
                  className={`relative px-4 py-2 rounded-full text-sm transition-colors duration-200 ${
                    active ? "text-black" : "text-dark-text-secondary hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      className="absolute inset-0 rounded-full bg-white"
                      layoutId="activeNav"
                      transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <ResumeMenu className="btn btn-ghost btn-sm" align="right" />
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 -mr-2 text-white cursor-pointer"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        <motion.div className="absolute bottom-[-1px] left-0 h-px w-full bg-white origin-left" style={{ scaleX: progress }} />
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-30 bg-black lg:hidden overflow-y-auto"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            <nav aria-label="Mobile" className="min-h-full flex flex-col justify-center gap-1 px-6 pt-24 pb-10">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={close}
                  className="font-display font-semibold text-4xl py-2.5 text-zinc-300 hover:text-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + idx * 0.05 }}
                >
                  {item.label}
                </motion.a>
              ))}
              <div className="mt-6 pt-6 border-t border-zinc-800 flex flex-col gap-3">
                {resumes.map((r) => (
                  <a key={r.id} href={r.href} target="_blank" rel="noopener noreferrer" onClick={close} className="flex items-center justify-between text-zinc-300 py-1.5">
                    {r.title} resume
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
