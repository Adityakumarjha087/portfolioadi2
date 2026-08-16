import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X, ExternalLink, Cpu } from "lucide-react";

// Inline Github Icon Component
const Github = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={props.className} style={props.style}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    
    // Lock scroll when modal is open
    document.body.style.overflow = "hidden";
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  // Trap focus within the modal for accessibility
  useEffect(() => {
    if (!modalRef.current) return;
    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex="0"]'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleFocus = (e) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    const currentModal = modalRef.current;
    if (currentModal) {
      currentModal.addEventListener("keydown", handleFocus);
    }
    firstElement?.focus();

    return () => {
      if (currentModal) {
        currentModal.removeEventListener("keydown", handleFocus);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-hidden">
      {/* Backdrop overlay */}
      <motion.div
        className="absolute inset-0 bg-dark-bg/85 backdrop-blur-md cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal Container */}
      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative w-full max-w-4xl max-h-[90vh] bg-dark-surface border border-white/5 rounded-3xl overflow-y-auto no-scrollbar shadow-2xl flex flex-col items-stretch z-10"
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
      >
        {/* Top visual hero image */}
        <div className="relative aspect-video md:aspect-[2.2/1] w-full overflow-hidden bg-dark-bg border-b border-dark-border">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          {/* Glass close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full glass-panel border border-white/10 text-white hover:text-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Info Details */}
        <div className="p-6 md:p-10 flex flex-col gap-6 text-left">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs text-zinc-500 tracking-widest uppercase font-semibold">{project.subtitle}</span>
            <h2 id="modal-title" className="font-display font-bold text-2xl md:text-4xl text-white leading-tight">
              {project.title}
            </h2>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase font-semibold">Overview:</span>
            <p className="font-sans text-sm md:text-base text-dark-text-secondary leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Features */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase font-semibold">Key Capabilities:</span>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-dark-bg/40 border border-white/5 text-xs md:text-sm text-dark-text-secondary leading-relaxed">
                  <Cpu className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase font-semibold">Technologies Utilized:</span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-mono tracking-wide bg-dark-bg border border-white/5 text-dark-text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 border-t border-dark-border pt-6 mt-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-white text-black font-sans font-semibold text-sm tracking-wider hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-transform flex items-center gap-2 cursor-pointer"
            >
              <Github className="w-4 h-4" />
              Source Code
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full border border-zinc-800 bg-zinc-900/20 text-white font-sans font-semibold text-sm tracking-wider hover:scale-105 active:scale-95 transition-transform flex items-center gap-2 cursor-pointer hover:border-zinc-500"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
