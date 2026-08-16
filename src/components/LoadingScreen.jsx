import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const statusTexts = [
  "INITIALIZING_CORE",
  "LOADING_3D_ASSETS",
  "ESTABLISHING_NEURAL_NODES",
  "COMPILED_SUCCESSFULLY"
];

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [activeText, setActiveText] = useState("INITIALIZING_CORE");

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const step = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + step, 100);
      });
    }, 150);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (progress < 25) {
      setActiveText(statusTexts[0]);
    } else if (progress < 60) {
      setActiveText(statusTexts[1]);
    } else if (progress < 90) {
      setActiveText(statusTexts[2]);
    } else {
      setActiveText(statusTexts[3]);
    }
    
    if (progress === 100) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-bg text-dark-text-primary select-none overflow-hidden font-display">
      {/* Decorative grid pattern in background */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Animated cybernetic circle */}
      <div className="relative flex items-center justify-center w-36 h-36 mb-8">
        <motion.div 
          className="absolute inset-0 rounded-full border border-dashed border-zinc-700 opacity-30"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        />
        <motion.div 
          className="absolute w-[85%] h-[85%] rounded-full border border-zinc-800 opacity-50"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
        />
        <div className="text-2xl font-bold font-display tracking-widest text-white">
          {progress}%
        </div>
      </div>

      <div className="w-64 flex flex-col gap-2">
        {/* Progress bar */}
        <div className="h-1 w-full bg-dark-border rounded-full overflow-hidden relative border border-white/5">
          <motion.div 
            className="h-full bg-gradient-to-r from-zinc-800 via-zinc-400 to-white"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut" }}
          />
        </div>
        
        {/* Status logs */}
        <div className="flex justify-between items-center text-[10px] tracking-wider text-dark-text-secondary font-mono mt-1">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            {activeText}
          </span>
          <span>SYS_v1.0.8</span>
        </div>
      </div>

      {/* Decorative side lines */}
      <div className="absolute left-10 bottom-10 hidden md:block text-[10px] font-mono text-dark-text-secondary/40 leading-relaxed">
        <div>// WORKSPACE: T:\3D</div>
        <div>// HOST: LOCALHOST:3000</div>
        <div>// OS: WINDOWS_10_NT</div>
      </div>

      <div className="absolute right-10 bottom-10 hidden md:block text-[10px] font-mono text-dark-text-secondary/40 text-right">
        <div>// RECIPIENT: RECRUITER_EVALUATOR</div>
        <div>// STAGE: PORTFOLIO_LOAD</div>
        <div>// STATUS: STABLE</div>
      </div>
    </div>
  );
}
