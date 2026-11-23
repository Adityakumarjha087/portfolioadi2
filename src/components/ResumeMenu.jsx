import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, FileText } from "lucide-react";
import { resumes } from "../data/site";

// Button that reveals both resumes; each opens in a new tab.
export default function ResumeMenu({ className = "btn btn-ghost", align = "left" }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const listId = useId();
  const listRef = useRef(null);

  // Keep the menu inside the viewport on narrow screens. Uses offsetWidth, which
  // ignores the opening scale animation.
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!open || !list) return;
    const root = rootRef.current.getBoundingClientRect();
    const width = list.offsetWidth;
    const wanted = align === "right" ? root.right - width : root.left;
    const max = document.documentElement.clientWidth - width - 16;
    const left = Math.max(16, Math.min(wanted, max));
    list.style.left = `${left - root.left}px`;
  }, [open, align]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative inline-flex"
      onBlur={(e) => {
        if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        className={className}
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
      >
        <FileText className="w-4 h-4" aria-hidden="true" />
        Resume
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            ref={listRef}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full mt-2 z-30 w-64 p-1.5 rounded-2xl border border-zinc-800 bg-[#0a0a0a] shadow-2xl shadow-black"
          >
            {resumes.map((r) => (
              <li key={r.id}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between gap-3 px-3.5 py-3 rounded-xl hover:bg-zinc-900 transition-colors text-left"
                >
                  <span>
                    <span className="block text-sm font-semibold text-white">{r.title}</span>
                    <span className="block text-xs text-zinc-400">{r.source}</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 shrink-0" aria-hidden="true" />
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
