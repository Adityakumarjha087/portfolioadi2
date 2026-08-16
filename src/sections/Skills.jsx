import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories } from "../data/skills";
import { Search, Server, Monitor, Code, Database, Cloud, Brain } from "lucide-react";

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const iconMap = {
    "Languages": <Code className="w-4 h-4 text-brand-purple" />,
    "Frontend": <Monitor className="w-4 h-4 text-brand-blue" />,
    "Backend Technologies": <Server className="w-4 h-4 text-brand-accent" />,
    "Databases": <Database className="w-4 h-4 text-brand-blue" />,
    "DevOps & Cloud": <Cloud className="w-4 h-4 text-brand-purple" />,
    "AI & Data Science": <Brain className="w-4 h-4 text-brand-accent" />
  };

  const categories = ["All", ...skillCategories.map((c) => c.name)];

  // Filter skills based on search + selected category
  const filteredSkills = useMemo(() => {
    let result = [];
    
    skillCategories.forEach((cat) => {
      if (selectedCategory === "All" || cat.name === selectedCategory) {
        cat.skills.forEach((skill) => {
          if (
            skill.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            result.push({ name: skill, category: cat.name });
          }
        });
      }
    });
    
    return result;
  }, [selectedCategory, searchQuery]);

  return (
    <section id="skills" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-dark-border relative">
      {/* Title */}
      <div className="flex flex-col items-center mb-16 text-center">
        <span className="font-mono text-xs text-zinc-500 tracking-widest uppercase">// technical toolbox</span>
        <h2 className="font-display font-bold text-3xl md:text-5xl text-white mt-1">
          Skills & Tech
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Sidebar categories + search */}
        <div className="lg:col-span-4 flex flex-col gap-6 text-left">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-text-secondary" />
            <input
              type="text"
              placeholder="Search technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-dark-surface/50 border border-white/5 text-sm text-dark-text-primary placeholder-dark-text-secondary focus:border-zinc-500 focus:outline-none transition-colors duration-200"
            />
          </div>

          {/* Categories select (vertical tabs) */}
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible no-scrollbar gap-2 pb-2 lg:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-3 rounded-xl font-sans text-xs tracking-wider font-semibold border flex items-center gap-2.5 shrink-0 transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? "border-zinc-800 bg-zinc-900/40 text-white"
                    : "border-white/5 text-dark-text-secondary hover:text-dark-text-primary hover:border-white/10"
                }`}
              >
                {iconMap[cat] || <LayersIcon />}
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Skill items grid display */}
        <div className="lg:col-span-8">
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 rounded-xl glass-panel border border-white/5 flex items-center gap-3.5 hover:border-zinc-500 transition-all duration-300 select-none group"
                >
                  {/* Clean bullet indicator */}
                  <div className="w-2 h-2 rounded-full bg-zinc-700 group-hover:bg-white transition-colors shrink-0" />
                  
                  {/* Tech Details */}
                  <div className="text-left">
                    <h3 className="font-display text-sm font-medium text-white tracking-wide">{skill.name}</h3>
                    <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest mt-0.5 block">{skill.category}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

function LayersIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}
