import { ArrowUpRight } from "lucide-react";
import { Github } from "./Icons";

const external = { target: "_blank", rel: "noopener noreferrer" };

export default function ProjectLinks({ project, size = "btn-sm", className = "" }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {project.demo && (
        <a href={project.demo} {...external} aria-label={`${project.title} live demo`} className={`btn btn-primary ${size}`}>
          Live demo
          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
        </a>
      )}
      <a href={project.github} {...external} aria-label={`${project.title} source code`} className={`btn btn-ghost ${size}`}>
        <Github className="w-4 h-4" />
        {project.githubBackend ? "Frontend" : "Code"}
      </a>
      {project.githubBackend && (
        <a href={project.githubBackend} {...external} aria-label={`${project.title} backend source code`} className={`btn btn-ghost ${size}`}>
          <Github className="w-4 h-4" />
          Backend
        </a>
      )}
    </div>
  );
}
