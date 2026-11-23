import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Brain, Layers, ShieldCheck } from "lucide-react";
import { Reveal, SectionHeading, SpotlightCard } from "../components/Motion";

const statement =
  "I sit between model training and product engineering. At Ethara AI I work on RL and SFT projects for state-of-the-art LLMs: building training data, testing outputs and catching hallucinations. On my own time I ship the other half, from React front ends to the APIs, retrieval and agents behind them.";

// Words brighten as the paragraph is scrolled through.
function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.26em]">
      {children}
    </motion.span>
  );
}

function Statement() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  const words = statement.split(" ");
  const className = "font-display text-2xl md:text-[2rem] leading-snug text-white";

  if (reduced) return <p className={className}>{statement}</p>;
  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{statement}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </Word>
        ))}
      </span>
    </p>
  );
}

function Avatar() {
  const reduced = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 });

  const onMove = (e) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 16);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 16);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div onPointerMove={onMove} onPointerLeave={reset} style={{ perspective: 1000 }} className="w-full max-w-sm mx-auto">
      <motion.div style={{ rotateX: rx, rotateY: ry }} className="aspect-square rounded-3xl glass-panel overflow-hidden p-3">
        <img src="/avatar.svg" alt="" width="400" height="400" className="w-full h-full object-contain" />
      </motion.div>
    </div>
  );
}

const focus = [
  { icon: Brain, title: "LLM training and evaluation", desc: "RL and SFT projects, training data quality, prompt-based testing and hallucination detection." },
  { icon: Layers, title: "Full-stack delivery", desc: "Next.js and React front ends with Node.js, Express and FastAPI services, deployed on Vercel and Render." },
  { icon: ShieldCheck, title: "Designed for failure", desc: "Retries, timeouts, step limits, request tracing, input validation and human approval where it matters." },
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-5 md:px-12 max-w-7xl mx-auto">
      <SectionHeading title="About me" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-8">
          <Statement />
        </div>
        <Reveal className="lg:col-span-4" delay={0.1}>
          <Avatar />
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
        {focus.map(({ icon: Icon, title, desc }, i) => (
          <Reveal key={title} delay={i * 0.1}>
            <SpotlightCard className="h-full p-7 rounded-2xl flex flex-col gap-4">
              <Icon className="w-6 h-6 text-white" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
              <p className="text-sm text-dark-text-secondary leading-relaxed">{desc}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
