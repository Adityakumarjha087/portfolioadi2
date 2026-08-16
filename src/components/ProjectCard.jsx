import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function ProjectCard({ project, onClick }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkHover = window.matchMedia("(any-hover: hover)");
    setIsMobile(!checkHover.matches);
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    const maxTilt = 8; // Gentle tilt
    
    setTilt({
      x: -mouseY * maxTilt,
      y: mouseX * maxTilt
    });
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="group relative rounded-2xl glass-panel border border-white/5 overflow-hidden flex flex-col items-stretch h-full cursor-pointer transition-all duration-300"
      style={{
        transform: isMobile ? "none" : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: "preserve-3d"
      }}
      whileHover={{ y: -6, borderColor: "#3f3f46" }}
    >
      {/* Animated Card Border Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl">
        <div className="absolute inset-px rounded-[15px] border border-zinc-800 bg-zinc-900/[0.02]" />
      </div>

      {/* Project Image Container */}
      <div 
        className="relative aspect-video overflow-hidden border-b border-dark-border bg-dark-bg/60"
        style={{ transformStyle: "preserve-3d" }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          style={{
            transform: isMobile ? "none" : "translateZ(10px)"
          }}
        />
        
        {/* Hover Sheen overlay */}
        <div className="absolute inset-0 bg-dark-bg/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="px-4 py-2 rounded-full bg-white text-black font-sans font-bold text-xs tracking-wider uppercase scale-90 group-hover:scale-100 transition-transform duration-300">
            View Details
          </span>
        </div>
      </div>

      {/* Content Details */}
      <div 
        className="p-6 flex flex-col flex-grow text-left justify-between gap-4"
        style={{ transform: isMobile ? "none" : "translateZ(20px)" }}
      >
        <div className="flex flex-col gap-2">
          {/* Tag Category */}
          <span className="font-mono text-[9px] text-zinc-500 tracking-widest uppercase font-semibold">{project.subtitle}</span>
          
          {/* Title */}
          <h3 className="font-display font-bold text-lg text-white group-hover:text-white transition-colors tracking-wide leading-snug">
            {project.title}
          </h3>
          
          {/* Short Description */}
          <p className="font-sans text-xs text-dark-text-secondary leading-relaxed line-clamp-3 mt-1">
            {project.description}
          </p>
        </div>

        {/* Technologies Grid List */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.technologies.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded text-[9px] font-mono tracking-wide bg-dark-bg border border-white/5 text-dark-text-secondary"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-0.5 rounded text-[9px] font-mono tracking-wide bg-zinc-800 border border-zinc-700 text-zinc-300 font-medium">
              +{project.technologies.length - 4} More
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
