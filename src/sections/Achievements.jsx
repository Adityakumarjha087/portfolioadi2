import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { Award, GraduationCap, Users } from "lucide-react";
import { achievements } from "../data/achievements";
import { Reveal, SectionHeading, SpotlightCard } from "../components/Motion";

function Counter({ value, prefix = "", suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const reduced = useReducedMotion();
  const decimals = Number.isInteger(value) ? 0 : 1;

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = v.toFixed(decimals);
      },
    });
    return () => controls.stop();
  }, [inView, reduced, value, decimals]);

  return (
    <span className="font-display font-bold text-5xl md:text-6xl text-white tabular-nums">
      {prefix && <span className="text-zinc-500">{prefix}</span>}
      <span ref={ref}>{value.toFixed(decimals)}</span>
      {suffix && <span className="text-zinc-500">{suffix}</span>}
    </span>
  );
}

export default function Achievements() {
  const { stats, education, certifications, leadership } = achievements;
  return (
    <section id="achievements" className="py-24 md:py-32 px-5 md:px-12 max-w-7xl mx-auto">
      <SectionHeading title="Education and milestones" />

      <dl className="grid grid-cols-2 lg:grid-cols-4 border border-dark-border rounded-2xl overflow-hidden gap-px bg-dark-border mb-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-black p-6 md:p-8 flex flex-col-reverse justify-end gap-3">
            <dt className="text-sm text-dark-text-secondary leading-snug">{s.label}</dt>
            <dd><Counter {...s} /></dd>
          </div>
        ))}
      </dl>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Reveal>
          <SpotlightCard className="h-full p-7 rounded-2xl">
            <GraduationCap className="w-6 h-6 text-white mb-4" aria-hidden="true" />
            <h3 className="font-display text-lg font-semibold text-white">{education.degree}</h3>
            <p className="text-sm text-zinc-300 mt-2">{education.school}</p>
            <p className="text-sm text-zinc-500 mt-1">{education.duration}</p>
            <p className="text-sm text-dark-text-secondary mt-4 leading-relaxed">{education.coursework.join(", ")}</p>
          </SpotlightCard>
        </Reveal>
        <Reveal delay={0.08}>
          <SpotlightCard className="h-full p-7 rounded-2xl">
            <Award className="w-6 h-6 text-white mb-4" aria-hidden="true" />
            <h3 className="font-display text-lg font-semibold text-white mb-3">Certifications</h3>
            <ul className="flex flex-col divide-y divide-zinc-900">
              {certifications.map((c) => (
                <li key={c.title} className="py-2.5 flex justify-between gap-4 text-sm">
                  <span className="text-zinc-200">{c.title}</span>
                  <span className="text-zinc-500">{c.issuer}</span>
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </Reveal>
        <Reveal delay={0.16}>
          <SpotlightCard className="h-full p-7 rounded-2xl">
            <Users className="w-6 h-6 text-white mb-4" aria-hidden="true" />
            <h3 className="font-display text-lg font-semibold text-white mb-3">Leadership</h3>
            <ul className="flex flex-col divide-y divide-zinc-900">
              {leadership.map((l) => (
                <li key={l.title} className="py-2.5 text-sm">
                  <span className="block text-zinc-200">{l.title}</span>
                  <span className="block text-zinc-500 mt-0.5">{l.org}</span>
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
