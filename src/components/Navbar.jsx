import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navItems = [
    { label: "About", id: "about" },
    { label: "Experience", id: "experience" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Contact", id: "contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Background scroll check
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Active Section tracker
      const sections = ["hero", "about", "experience", "projects", "skills", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled 
            ? "bg-dark-bg/75 backdrop-blur-md border-b border-dark-border py-4" 
            : "bg-transparent py-6"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo / Branding */}
          <button 
            onClick={() => scrollToSection("hero")} 
            className="font-display font-bold text-xl md:text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 select-none cursor-pointer"
          >
            ADITYA JHA
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-sans text-sm tracking-wide transition-colors duration-200 cursor-pointer relative ${
                  activeSection === item.id 
                    ? "text-white" 
                    : "text-dark-text-secondary hover:text-dark-text-primary"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-white"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Let's Talk CTA (Desktop) */}
          <button
            onClick={() => scrollToSection("contact")}
            className="hidden md:flex items-center gap-1.5 px-5 py-2 rounded-full border border-zinc-800 text-sm font-medium tracking-wide bg-zinc-950/40 hover:border-zinc-500 text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            Let's Talk
            <ArrowUpRight className="w-4 h-4" />
          </button>

          {/* Hamburger Icon (Mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-dark-text-primary hover:text-white transition-colors cursor-pointer"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-dark-bg/95 flex flex-col justify-center items-center md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex flex-col gap-8 text-center">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="font-display font-semibold text-2xl tracking-wide text-dark-text-secondary hover:text-white transition-colors cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  {item.label}
                </motion.button>
              ))}
              
              <motion.button
                onClick={() => scrollToSection("contact")}
                className="mt-4 px-8 py-3 rounded-full bg-white text-black font-sans text-sm font-semibold tracking-wider cursor-pointer hover:bg-zinc-200 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.08 }}
              >
                Let's Talk
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
