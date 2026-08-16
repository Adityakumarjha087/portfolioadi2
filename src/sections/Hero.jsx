import { motion } from "framer-motion";
import { ArrowDown, Send } from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 py-20 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto text-center z-10 flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Greeting Tech Tag */}
          <motion.div 
            variants={itemVariants}
            className="px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/30 text-[10px] font-mono tracking-widest text-zinc-500 uppercase"
          >
            // systems.init.success //
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={itemVariants}
            className="font-display font-bold text-5xl md:text-8xl tracking-tight text-white leading-tight"
          >
            Hi, I'm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-zinc-500">
              Aditya Jha
            </span>
          </motion.h1>

          {/* Professional Title */}
          <motion.h2 
            variants={itemVariants}
            className="font-sans font-medium text-lg md:text-3xl text-zinc-400 tracking-wide max-w-2xl"
          >
            Software Engineer <span className="text-zinc-600">/</span> Full-Stack Developer
          </motion.h2>

          {/* Short Description */}
          <motion.p 
            variants={itemVariants}
            className="font-sans text-sm md:text-lg text-zinc-400 max-w-2xl leading-relaxed mt-2"
          >
            I architect and develop resilient full-stack systems, high-throughput cloud data pipelines, and interactive 3D web platforms. Passionate about engineering clean, highly performant code.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mt-6 items-center"
          >
            <button
              onClick={() => handleScrollTo("projects")}
              className="px-8 py-3.5 rounded-full bg-white text-black font-sans font-semibold text-sm tracking-wider hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-all duration-250 cursor-pointer shadow-lg shadow-white/5 flex items-center gap-2"
            >
              View My Work
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>
            
            <button
              onClick={() => handleScrollTo("contact")}
              className="px-8 py-3.5 rounded-full border border-zinc-800 bg-zinc-950/40 text-white font-sans font-medium text-sm tracking-wide hover:border-zinc-500 hover:scale-105 active:scale-95 transition-all duration-250 cursor-pointer flex items-center gap-2"
            >
              Let's Connect
              <Send className="w-3.5 h-3.5 text-zinc-400" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating dynamic prompt at bottom */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] font-mono tracking-widest text-zinc-600 select-none">
        <span>SCROLL TO EXPLORE</span>
        <motion.div 
          className="w-1 h-3 rounded-full bg-zinc-700"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
}
