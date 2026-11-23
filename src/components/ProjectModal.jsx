import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import ProjectCover from "./ProjectCover";
import ProjectLinks from "./ProjectLinks";

export default function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null);

  // Close on Escape and lock page scroll while open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  // Trap focus within the dialog
  useEffect(() => {
    const modal = modalRef.current;
    const focusable = modal.querySelectorAll("button, [href]");
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const handleTab = (e) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    };
    modal.addEventListener("keydown", handleTab);
    first.focus({ preventScroll: true });
    return () => modal.removeEventListener("keydown", handleTab);
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6">
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="group relative w-full max-w-3xl max-h-[92svh] bg-dark-surface border border-zinc-800 rounded-t-3xl sm:rounded-3xl overflow-y-auto no-scrollbar overscroll-contain"
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
      >
        <button
          type="button"
          onClick={onClose}
          className="sticky top-4 z-10 ml-auto mr-4 mt-4 mb-[-3.75rem] w-11 h-11 rounded-full bg-black border border-zinc-700 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="aspect-[16/9] w-full overflow-hidden border-b border-dark-border">
          <ProjectCover project={project} eager />
        </div>
        <div className="p-6 md:p-10 flex flex-col gap-7">
          <div>
            <p className="text-sm text-zinc-400">{project.kind}</p>
            <h2 id="modal-title" className="font-display font-bold text-2xl md:text-4xl text-white leading-tight mt-2">{project.title}</h2>
            <p className="text-dark-text-secondary leading-relaxed mt-4">{project.description}</p>
          </div>
          <ul className="flex flex-col gap-3">
            {project.features.map((f) => (
              <li key={f} className="flex gap-3 text-sm md:text-base text-zinc-300 leading-relaxed">
                <Check className="w-4 h-4 mt-1 text-zinc-500 shrink-0" aria-hidden="true" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <li key={t} className="px-3 py-1 rounded-full text-sm border border-zinc-800 text-zinc-300">{t}</li>
            ))}
          </ul>
          <ProjectLinks project={project} size="" className="pt-6 border-t border-dark-border" />
        </div>
      </motion.div>
    </div>,
    document.body
  );
}
