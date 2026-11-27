import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Mail, MapPin } from "lucide-react";
import { Github, Linkedin } from "../components/Icons";
import { Magnetic } from "../components/Motion";
import ResumeLink from "../components/ResumeLink";
import { profile } from "../data/site";

const Scene3D = lazy(() => import("../components/Scene3D"));
const EASE = [0.2, 0.7, 0.2, 1];

function RoleRotator() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % profile.roles.length), 2800);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <div className="relative h-9 md:h-11 overflow-hidden">
      <span className="sr-only">{profile.roles.join(", ")}</span>
      <AnimatePresence initial={false}>
        <motion.span
          key={index}
          aria-hidden="true"
          className="absolute inset-0 font-display text-2xl md:text-3xl text-zinc-300 whitespace-nowrap"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {profile.roles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function Hero({ ready }) {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, reduced ? 0 : 120]);
  const opacity = useTransform(scrollY, [0, 600], [1, reduced ? 1 : 0.1]);

  const rise = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay, ease: EASE },
  });

  const socials = [
    { label: "GitHub", href: profile.github, icon: Github },
    { label: "LinkedIn", href: profile.linkedin, icon: Linkedin },
    { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
  ];

  return (
    <section id="hero" className="relative min-h-svh flex items-center pt-28 pb-20 overflow-hidden">
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>

      <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-12 flex flex-col items-start gap-6">
        <motion.p {...rise(0.15)} className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-300">
          <span className="flex items-center gap-2.5">
            <span className="live-dot" />
            Software Engineer at Ethara AI
          </span>
          <span className="flex items-center gap-1.5 text-zinc-400">
            <MapPin className="w-4 h-4" aria-hidden="true" />
            {profile.location}
          </span>
        </motion.p>

        <h1 className="font-display font-bold tracking-tight text-white leading-[0.95] text-[clamp(3.4rem,10vw,8.5rem)]">
          <span className="sr-only">{profile.name}</span>
          {["Aditya", "Kumar Jha"].map((line, l) => (
            <span key={line} aria-hidden="true" className="block overflow-hidden pb-[0.14em] -mb-[0.1em]">
              {[...line].map((ch, i) => (
                <motion.span
                  key={i}
                  className="inline-block whitespace-pre"
                  initial={{ y: "115%", rotate: 8 }}
                  animate={ready ? { y: 0, rotate: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.2 + (l * 6 + i) * 0.035, ease: EASE }}
                >
                  {ch}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        <motion.div {...rise(0.75)} className="w-full">
          <RoleRotator />
        </motion.div>

        <motion.p {...rise(0.85)} className="text-base md:text-lg text-zinc-400 max-w-xl leading-relaxed">
          I train and evaluate large language models at work, and build the RAG systems, agents and full-stack products around them.
        </motion.p>

        <motion.div {...rise(0.95)} className="flex flex-wrap gap-3 mt-2 relative z-20">
          <Magnetic>
            <a href="#projects" className="btn btn-primary">
              View projects
              <ArrowDown className="w-4 h-4" aria-hidden="true" />
            </a>
          </Magnetic>
          <Magnetic>
            <ResumeLink />
          </Magnetic>
          <Magnetic>
            <a href="#contact" className="btn btn-ghost">Contact me</a>
          </Magnetic>
        </motion.div>

        <motion.ul {...rise(1.05)} className="flex gap-2 -ml-2.5">
          {socials.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={href.startsWith("http") ? `${label} (opens in a new tab)` : label}
                className="flex p-2.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
