import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const EASE = [0.2, 0.7, 0.2, 1];

// Fade and rise once when scrolled into view.
export function Reveal({ children, delay = 0, y = 28, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// Section title whose words slide up from behind a mask.
export function SectionHeading({ title, children }) {
  return (
    <div className="mb-12 md:mb-16 flex flex-col gap-4 max-w-4xl">
      <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight text-white leading-[1.08]">
        <span className="sr-only">{title}</span>
        <motion.span
          aria-hidden="true"
          className="block"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          transition={{ staggerChildren: 0.07 }}
        >
          {title.split(" ").map((word, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em] mr-[0.26em]">
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { y: "110%" },
                  show: { y: 0, transition: { duration: 0.8, ease: EASE } },
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.span>
      </h2>
      {children && (
        <Reveal delay={0.15} y={16}>
          <p className="text-base md:text-lg text-dark-text-secondary leading-relaxed">{children}</p>
        </Reveal>
      )}
    </div>
  );
}

// Pulls its child slightly toward the pointer.
export function Magnetic({ children, strength = 0.25 }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });

  const onMove = (e) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset} className="inline-flex">
      {children}
    </motion.div>
  );
}

// Surface lit from the pointer position (see .spotlight in index.css).
export function SpotlightCard({ as: Tag = "div", className = "", children, ...rest }) {
  const onPointerMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <Tag className={`spotlight glass-panel ${className}`} onPointerMove={onPointerMove} {...rest}>
      {children}
    </Tag>
  );
}
