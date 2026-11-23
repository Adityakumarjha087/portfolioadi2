import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";

export default function Projects() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [activeProject, setActiveProject] = useState(null);
  const triggerRef = useRef(null);

  const openProject = (project) => {
    triggerRef.current = document.activeElement;
    setActiveProject(project);
  };

  const closeProject = () => {
    setActiveProject(null);
    // Return focus to the card that opened the modal.
    triggerRef.current?.focus?.();
    triggerRef.current = null;
  };

  const filters = ["All", "AI & Data", "Cloud & DevOps", "Frontend & Web"];

  const filteredProjects = projects.filter((project) => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "AI & Data") {
      return project.technologies.some((t) => 
        ["LangChain", "OpenAI API", "FastAPI", "PySpark", "LLM Orchestration", "pgvector", "LLM Testing", "Clinical AI Assisting", "Python"].includes(t)
      );
    }
    if (selectedFilter === "Cloud & DevOps") {
      return project.technologies.some((t) => 
        ["Docker", "Kubernetes", "AWS EKS", "AWS", "Apache Kafka", "Redis", "MongoDB", "REST APIs", "Node.js", "Express.js", "Caching"].includes(t)
      );
    }
    if (selectedFilter === "Frontend & Web") {
      return project.technologies.some((t) => 
        ["React", "React.js", "Next.js", "Tailwind CSS", "WebSockets", "WebRTC", "TypeScript", "HTML5", "CSS3", "Responsive UI"].includes(t)
      );
    }
    return true;
  });

  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-dark-border relative">
      {/* Title */}
      <div className="flex flex-col items-center mb-12 text-center">
        <span className="font-mono text-xs text-zinc-500 tracking-widest uppercase">// portfolio assets</span>
        <h2 className="font-display font-bold text-3xl md:text-5xl text-white mt-1">
          Featured Projects
        </h2>
      </div>

      {/* Filter Tabs */}
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap justify-center gap-2 mb-12">
        {filters.map((filter) => {
          const isActive = selectedFilter === filter;
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={isActive}
              onClick={() => setSelectedFilter(filter)}
              className={`px-5 py-2 rounded-full font-sans text-xs tracking-wider font-medium transition-all duration-300 relative cursor-pointer border ${
                isActive 
                  ? "border-zinc-800 text-white bg-zinc-900/40" 
                  : "border-white/5 text-dark-text-secondary hover:text-dark-text-primary hover:border-white/10"
              }`}
            >
              {filter}
              {isActive && (
                <motion.span
                  className="absolute inset-0 rounded-full border border-zinc-500 pointer-events-none"
                  layoutId="activeFilterIndicator"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Dynamic Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <ProjectCard
                project={project}
                onClick={() => openProject(project)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Detailed Modal Trigger */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={closeProject}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
