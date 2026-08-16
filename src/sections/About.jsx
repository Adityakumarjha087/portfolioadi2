import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Compass, Layers } from "lucide-react";

export default function About() {
  const avatarRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!avatarRef.current) return;
    const rect = avatarRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalized mouse position inside the element (from -0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    // Maximum tilt angles in degrees
    const maxTiltX = 12;
    const maxTiltY = 12;
    
    setTilt({
      x: -mouseY * maxTiltX, // tilt based on y movement
      y: mouseX * maxTiltY   // tilt based on x movement
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const cards = [
    {
      icon: <GraduationCap className="w-5 h-5 text-white" />,
      title: "Education",
      desc: "B.Tech CSE candidate at Noida Institute of Engineering Technology (CGPA: 7.4)"
    },
    {
      icon: <Compass className="w-5 h-5 text-zinc-400" />,
      title: "Interests",
      desc: "LLM Pipelines, SaaS Automation, Full-Stack Architecture"
    },
    {
      icon: <Layers className="w-5 h-5 text-zinc-500" />,
      title: "Skills Focus",
      desc: "React.js/Next.js, Node.js/Express, Python, Databases & Git"
    }
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-dark-border relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Photo/Avatar with 3D Tilt */}
        <div className="lg:col-span-5 flex justify-center">
          <div
            ref={avatarRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-72 h-72 md:w-96 md:h-96 rounded-2xl glass-panel border border-zinc-800 hover:border-zinc-500 overflow-hidden flex items-center justify-center p-3 select-none transition-all duration-150 ease-out cursor-pointer"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: "preserve-3d"
            }}
          >
            {/* Glossy overlay sheen */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-tr from-transparent via-white to-transparent"
              style={{
                transform: `translateZ(20px) translate(${tilt.y * 2}px, ${-tilt.x * 2}px)`
              }}
            />
            {/* The SVG Avatar Image */}
            <img 
              src="/avatar.svg" 
              alt="Aditya Kumar Jha Cyber Avatar" 
              className="w-full h-full object-contain rounded-xl select-none pointer-events-none"
              style={{
                transform: "translateZ(30px)",
                transformStyle: "preserve-3d"
              }}
            />
          </div>
        </div>

        {/* Right Side: Information */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          <div>
            <span className="font-mono text-xs text-zinc-500 tracking-widest uppercase">// introduction</span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white mt-1">
              About Me
            </h2>
          </div>

          <p className="font-sans text-sm md:text-base text-dark-text-secondary leading-relaxed">
            I am a Full-Stack Developer and LLM Data Trainer currently pursuing my B.Tech in Computer Science & Engineering at Noida Institute of Engineering Technology (NIET). With hands-on internship experience training large language model pipelines, optimizing response validations, and building modular SaaS automated interfaces, I aim to write clean, maintainable, and high-performance code.
          </p>

          <p className="font-sans text-sm md:text-base text-dark-text-secondary leading-relaxed">
            From conducting LLM evaluations to structuring reactive React layouts, I bridge the gap between AI data science structures and frontend user experiences.
          </p>

          {/* Quick cards info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                className="p-5 rounded-xl glass-panel border border-white/5 flex flex-col gap-3"
                whileHover={{ y: -5, borderColor: "#3f3f46" }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-10 h-10 rounded-lg bg-dark-bg/85 flex items-center justify-center border border-white/5">
                  {card.icon}
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-white tracking-wide">{card.title}</h3>
                  <p className="font-sans text-xs text-dark-text-secondary mt-1 leading-normal">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
