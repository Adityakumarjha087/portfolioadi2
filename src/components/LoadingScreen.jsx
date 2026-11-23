import { useEffect, useRef } from "react";
import { animate, motion } from "framer-motion";
import { profile } from "../data/site";

export default function LoadingScreen({ onComplete }) {
  const countRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const controls = animate(0, 100, {
      duration: 1.2,
      ease: [0.6, 0, 0.2, 1],
      onUpdate: (v) => {
        if (countRef.current) countRef.current.textContent = Math.round(v);
        if (barRef.current) barRef.current.style.transform = `scaleX(${v / 100})`;
      },
      onComplete,
    });
    return () => {
      controls.stop();
      document.body.style.overflow = previous;
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] bg-black flex flex-col justify-between p-6 md:p-12 select-none"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      aria-hidden="true"
    >
      <span className="font-display font-bold text-xl text-white">{profile.name}</span>
      <div className="flex flex-col gap-6">
        <div className="font-display font-bold text-white leading-none tabular-nums text-[28vw] md:text-[16vw]">
          <span ref={countRef}>0</span>
        </div>
        <div className="h-px w-full bg-zinc-800">
          <div ref={barRef} className="h-full bg-white origin-left" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </motion.div>
  );
}
