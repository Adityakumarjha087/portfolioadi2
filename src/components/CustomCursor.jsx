import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Motion values for smooth trailing effect
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device supports hover (typically desktop)
    const mediaQuery = window.matchMedia("(any-hover: hover)");
    const handleMediaChange = (e) => {
      setIsMobile(!e.matches);
    };

    setIsMobile(!mediaQuery.matches);
    mediaQuery.addEventListener("change", handleMediaChange);

    if (isMobile) return;

    const moveMouse = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveMouse);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Dynamic hover listeners for links, buttons, and custom classes
    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, select, .project-card, .interactive-hover"
      );

      const onMouseOver = () => setIsHovered(true);
      const onMouseOut = () => setIsHovered(false);

      hoverables.forEach((el) => {
        el.addEventListener("mouseover", onMouseOver);
        el.addEventListener("mouseout", onMouseOut);
      });

      return () => {
        hoverables.forEach((el) => {
          el.removeEventListener("mouseover", onMouseOver);
          el.removeEventListener("mouseout", onMouseOut);
        });
      };
    };

    // Observe DOM changes to re-add listeners to dynamically generated content (like modals)
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    
    const removeListeners = addHoverListeners();

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      removeListeners();
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, [isMobile, cursorX, cursorY]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Central dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-50 mix-blend-screen -translate-x-1/2 -translate-y-1/2"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      />
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-white/40 pointer-events-none z-50 mix-blend-screen -translate-x-1/2 -translate-y-1/2"
        style={{ x: cursorXSpring, y: cursorYSpring }}
        animate={{
          width: isHovered ? 40 : 20,
          height: isHovered ? 40 : 20,
          backgroundColor: isHovered ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </>
  );
}
