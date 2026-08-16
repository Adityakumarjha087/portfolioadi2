import { motion } from "framer-motion";
import { experiences } from "../data/experience";
import { Calendar, ChevronRight } from "lucide-react";

export default function Experience() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 }
    }
  };

  return (
    <section id="experience" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-dark-border relative">
      <div className="flex flex-col items-center mb-16 text-center">
        <span className="font-mono text-xs text-zinc-500 tracking-widest uppercase">// professional trajectory</span>
        <h2 className="font-display font-bold text-3xl md:text-5xl text-white mt-1">
          Work History
        </h2>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Vertical Center line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 -translate-x-1/2" />

        <motion.div 
          className="flex flex-col gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {experiences.map((exp, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className={`relative flex flex-col md:flex-row items-stretch ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline node dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-black border-2 border-zinc-500 -translate-x-1/2 top-6 z-10 shadow-lg shadow-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white m-auto mt-0.5 animate-pulse" />
                </div>

                {/* Card side */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                  <div className="p-6 rounded-2xl glass-panel border border-white/5 shadow-xl glass-panel-hover transition-all duration-300">
                    {/* Header info */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-dark-border/50 pb-3">
                      <div>
                        <h3 className="font-display font-bold text-lg text-white tracking-wide">{exp.role}</h3>
                        <span className="font-sans text-sm text-zinc-400 font-medium mt-0.5 inline-block">{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-bg/60 border border-white/5 text-xs text-dark-text-secondary font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.duration}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="font-sans text-xs md:text-sm text-dark-text-secondary leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Key metrics / Achievements */}
                    <div className="mb-4 flex flex-col gap-2">
                      <span className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase font-semibold">Key Achievements:</span>
                      <ul className="flex flex-col gap-1.5">
                        {exp.achievements.map((ach, aIdx) => (
                          <li key={aIdx} className="flex items-start gap-1.5 text-xs text-dark-text-secondary leading-relaxed">
                            <ChevronRight className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech list tag clouds */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {exp.technologies.map((tech, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wide bg-dark-bg border border-white/5 text-dark-text-secondary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Empty side for layout centering */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
