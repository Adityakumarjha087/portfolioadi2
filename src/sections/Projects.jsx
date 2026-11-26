import { useCallback, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Search, X } from "lucide-react";
import { categories, projects } from "../data/projects";
import { profile } from "../data/site";
import { Reveal, SectionHeading } from "../components/Motion";
import { Github } from "../components/Icons";
import FeaturedStack from "../components/FeaturedStack";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";

const PAGE = 9;
const featured = projects.filter((p) => p.featured);
const rest = projects.filter((p) => !p.featured);
const liveCount = projects.filter((p) => p.demo).length;

export default function Projects() {
  const [category, setCategory] = useState("All");
  const [liveOnly, setLiveOnly] = useState(false);
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState(null);
  const triggerRef = useRef(null);
  const searchRef = useRef(null);

  const open = (project) => {
    triggerRef.current = document.activeElement;
    setActive(project);
  };

  const close = useCallback(() => {
    setActive(null);
    // Return focus to the control that opened the dialog.
    triggerRef.current?.focus?.({ preventScroll: true });
    triggerRef.current = null;
  }, []);

  // Browsing shows everything below the showcase; filtering searches all projects.
  const filtering = category !== "All" || liveOnly || query.trim() !== "";
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (filtering ? projects : rest).filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (!liveOnly || p.demo) &&
        (!q || [p.title, p.kind, p.description, ...p.technologies].join(" ").toLowerCase().includes(q))
    );
  }, [category, liveOnly, query, filtering]);

  const shown = expanded || filtering ? matches : matches.slice(0, PAGE);

  const chip = (on) =>
    `px-4 py-2 rounded-full text-sm border transition-colors duration-200 cursor-pointer ${
      on ? "bg-white text-black border-white" : "border-zinc-800 text-zinc-300 hover:border-zinc-500 hover:text-white"
    }`;

  return (
    <section id="projects" className="py-24 md:py-32 px-5 md:px-12 max-w-7xl mx-auto">
      <SectionHeading title="Selected projects">
        {projects.length} projects from my GitHub, {liveCount} of them live. These six show the range.
      </SectionHeading>

      <FeaturedStack projects={featured} onOpen={open} />

      <div className="mt-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-8">
          <h3 className="font-display font-bold text-3xl md:text-4xl text-white">Everything else</h3>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
            <Github className="w-4 h-4" />
            All repositories
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </Reveal>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
            {["All", ...categories].map((c) => (
              <button key={c} type="button" aria-pressed={category === c} onClick={() => setCategory(c)} className={chip(category === c)}>
                {c}
              </button>
            ))}
            <button type="button" aria-pressed={liveOnly} onClick={() => setLiveOnly((v) => !v)} className={`${chip(liveOnly)} flex items-center gap-2`}>
              <span className="live-dot" />
              Live demo
            </button>
          </div>
          <div className="relative lg:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" aria-hidden="true" />
            <input
              ref={searchRef}
              type="search"
              aria-label="Search projects"
              placeholder="Search by name or tech"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape" && query) {
                  e.preventDefault();
                  setQuery("");
                }
              }}
              className="field !pl-11 !pr-10 !py-2.5 !rounded-full"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => {
                  setQuery("");
                  // The button unmounts once the query is empty, so keep focus in the field.
                  searchRef.current?.focus();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        <p role="status" className={filtering ? "mb-6 text-sm text-zinc-400" : "sr-only"}>
          {filtering
            ? `${shown.length} of ${projects.length} projects match`
            : `${shown.length} projects shown`}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((project) => (
              <motion.div
                key={project.id}
                layout="position"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.35 }}
              >
                <ProjectCard project={project} onOpen={open} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {shown.length === 0 && (
          <p className="py-16 text-center text-zinc-400">
            No projects match.{" "}
            <button
              type="button"
              className="underline underline-offset-4 text-white cursor-pointer"
              onClick={() => {
                setCategory("All");
                setLiveOnly(false);
                setQuery("");
              }}
            >
              Clear filters
            </button>
          </p>
        )}

        {!filtering && matches.length > PAGE && (
          <div className="mt-10 flex justify-center">
            <button type="button" aria-expanded={expanded} onClick={() => setExpanded((v) => !v)} className="btn btn-ghost">
              {expanded ? "Show fewer" : `Show all ${matches.length}`}
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>{active && <ProjectModal key={active.id} project={active} onClose={close} />}</AnimatePresence>
    </section>
  );
}
