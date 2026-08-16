import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { achievements } from "../data/achievements";
import { Award, ShieldCheck, Trophy, Sparkles } from "lucide-react";

// Count-up hook
function AnimatedCounter({ value, suffix, duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const isInView = useInView(elementRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const endValue = value;
    const isDecimal = !Number.isInteger(value);

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // easeOutExpo function
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = ease * endValue;
      
      setCount(isDecimal ? parseFloat(currentVal.toFixed(2)) : Math.floor(currentVal));

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isInView, value, duration]);

  return (
    <span ref={elementRef} className="font-display font-bold text-4xl md:text-6xl text-white tracking-tight">
      {count}
      <span className="text-zinc-500">{suffix}</span>
    </span>
  );
}

export default function Achievements() {
  const iconMap = {
    "AWS Certified Developer – Associate": <ShieldCheck className="w-6 h-6 text-white" />,
    "Smart India Hackathon Winner": <Trophy className="w-6 h-6 text-zinc-400" />,
    "Cognizant Spot Award": <Sparkles className="w-6 h-6 text-zinc-500" />
  };

  return (
    <section id="achievements" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-dark-border relative">
      <div className="flex flex-col items-center mb-16 text-center">
        <span className="font-mono text-xs text-zinc-500 tracking-widest uppercase">// verified milestones</span>
        <h2 className="font-display font-bold text-3xl md:text-5xl text-white mt-1">
          Milestones & Awards
        </h2>
      </div>

      {/* Grid of Counters (Numeric Stats) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {achievements.stats.map((stat, idx) => (
          <div 
            key={idx}
            className="p-6 rounded-2xl glass-panel border border-white/5 flex flex-col items-center gap-2"
          >
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            <span className="font-mono text-[10px] md:text-xs text-dark-text-secondary tracking-widest uppercase text-center mt-1">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Cards of Awards & Certifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
        {achievements.awards.map((award, idx) => (
          <motion.div
            key={idx}
            className="p-8 rounded-2xl glass-panel border border-white/5 flex flex-col gap-5 justify-between relative overflow-hidden group"
            whileHover={{ y: -6, borderColor: "#3f3f46" }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full -mr-8 -mt-8 pointer-events-none" />

            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-dark-bg/85 border border-white/5 flex items-center justify-center">
                {iconMap[award.title] || <Award className="w-6 h-6 text-zinc-400" />}
              </div>
              
              <div>
                <span className="font-mono text-[9px] text-zinc-400 tracking-widest uppercase font-semibold">
                  {award.issuer} • {award.date}
                </span>
                <h3 className="font-display font-bold text-lg text-white group-hover:text-white transition-colors mt-1 tracking-wide">
                  {award.title}
                </h3>
              </div>

              <p className="font-sans text-xs md:text-sm text-dark-text-secondary leading-relaxed mt-1">
                {award.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
