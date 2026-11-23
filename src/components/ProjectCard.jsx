import { SpotlightCard } from "./Motion";
import ProjectCover from "./ProjectCover";
import ProjectLinks from "./ProjectLinks";

export default function ProjectCard({ project, onOpen }) {
  return (
    <SpotlightCard as="article" className="group h-full rounded-2xl overflow-hidden flex flex-col">
      <div className="aspect-[16/10] overflow-hidden border-b border-dark-border">
        <ProjectCover project={project} />
      </div>
      <div className="p-6 flex flex-col gap-4 grow">
        <div className="grow">
          <p className="text-xs text-zinc-400">{project.kind}</p>
          <h3 className="font-display font-semibold text-lg text-white mt-1.5">
            {/* Stretched button: the whole card opens the details dialog. */}
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => onOpen(project)}
              className="text-left cursor-pointer after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-white"
            >
              {project.title}
            </button>
          </h3>
          <p className="text-sm text-dark-text-secondary leading-relaxed mt-2">{project.description}</p>
        </div>
        <p className="text-xs text-zinc-400">{project.technologies.slice(0, 4).join(", ")}</p>
        <ProjectLinks project={project} className="relative z-10" />
      </div>
    </SpotlightCard>
  );
}
