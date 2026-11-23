import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { experiences } from "../data/experience";
import { Reveal, SectionHeading, SpotlightCard } from "../components/Motion";

export default function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });

  return (
    <section id="experience" className="py-24 md:py-32 px-5 md:px-12 max-w-7xl mx-auto">
      <SectionHeading title="Experience" />

      <div ref={ref} className="relative pl-8 md:pl-0">
        {/* Rail: the white line draws itself with scroll */}
        <div className="absolute left-[7px] md:left-[calc(25%+7px)] top-2 bottom-2 w-px bg-zinc-800">
          <motion.div className="w-full h-full bg-white origin-top" style={{ scaleY }} />
        </div>

        <ol className="flex flex-col gap-10">
          {experiences.map((exp) => (
            <li key={exp.role + exp.company} className="relative md:grid md:grid-cols-4 md:gap-0">
              <div className="md:col-span-1 md:pr-8 pb-4 md:pt-6">
                <p className="text-sm text-zinc-300 tabular-nums">{exp.duration}</p>
                <p className="text-sm text-zinc-500 mt-0.5">{exp.location}</p>
              </div>
              <motion.span
                aria-hidden="true"
                className="absolute -left-8 md:left-1/4 top-1 md:top-7 w-[15px] h-[15px] rounded-full bg-black border-2 border-white flex items-center justify-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "0px 0px -120px 0px" }}
                transition={{ type: "spring", stiffness: 300, damping: 16 }}
              >
                {exp.current && <span className="w-[5px] h-[5px] rounded-full bg-emerald-400" />}
              </motion.span>
              <Reveal className="md:col-span-3 md:pl-12">
                <SpotlightCard className="p-6 md:p-8 rounded-2xl">
                  <h3 className="font-display font-bold text-xl md:text-2xl text-white">{exp.role}</h3>
                  <p className="text-zinc-400 mt-1">{exp.company}</p>
                  <ul className="mt-5 flex flex-col gap-3">
                    {exp.achievements.map((a) => (
                      <li key={a} className="flex gap-3 text-sm md:text-[0.95rem] text-dark-text-secondary leading-relaxed">
                        <span aria-hidden="true" className="mt-[0.7em] w-3 h-px bg-zinc-500 shrink-0" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {exp.technologies.map((t) => (
                      <li key={t} className="px-3 py-1 rounded-full text-xs border border-zinc-800 text-zinc-300">{t}</li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
