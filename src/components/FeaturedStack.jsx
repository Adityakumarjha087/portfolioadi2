import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import ProjectCover from "./ProjectCover";
import ProjectLinks from "./ProjectLinks";

function StackItem({ project, index, total, progress, onOpen }) {
  const anchorRef = useRef(null);
  const reduced = useReducedMotion();
  const scale = useTransform(progress, [index / total, 1], [1, reduced ? 1 : 1 - (total - index - 1) * 0.025]);

  // Keyboard focus can land on a card covered by later ones; bring it forward.
  const onFocus = (e) => {
    if (e.target.matches(":focus-visible")) anchorRef.current?.scrollIntoView({ block: "start" });
  };

  return (
    <>
      <div ref={anchorRef} className="h-0 scroll-mt-28" />
      <div className="stack-item" style={{ top: `calc(5.5rem + ${index * 12}px)` }} onFocus={onFocus}>
        <motion.article
          style={{ scale }}
          className="group origin-top grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden border border-zinc-800 bg-[#0a0a0a] lg:h-[27rem]"
        >
          <div className="p-6 md:p-10 flex flex-col justify-between gap-6 order-2 lg:order-1">
            <div>
              <p className="text-sm text-zinc-400">{project.kind}</p>
              <h3 className="font-display font-bold text-2xl md:text-[2.1rem] text-white leading-tight mt-2">{project.title}</h3>
              <p className="text-sm md:text-base text-dark-text-secondary leading-relaxed mt-4">{project.description}</p>
              <ul className="flex flex-wrap gap-x-4 gap-y-1.5 mt-5 text-sm text-zinc-300">
                {project.technologies.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <ProjectLinks project={project} />
              <button
                type="button"
                aria-haspopup="dialog"
                onClick={() => onOpen(project)}
                className="btn btn-sm text-zinc-300 hover:text-white underline underline-offset-4 decoration-zinc-700 hover:decoration-white"
              >
                Details<span className="sr-only"> about {project.title}</span>
              </button>
            </div>
          </div>
          <div className="order-1 lg:order-2 aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden border-b lg:border-b-0 lg:border-l border-zinc-800">
            <ProjectCover project={project} />
          </div>
        </motion.article>
      </div>
    </>
  );
}

export default function FeaturedStack({ projects, onOpen }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <div ref={ref}>
      {projects.map((p, i) => (
        <StackItem key={p.id} project={p} index={i} total={projects.length} progress={scrollYProgress} onOpen={onOpen} />
      ))}
    </div>
  );
}
