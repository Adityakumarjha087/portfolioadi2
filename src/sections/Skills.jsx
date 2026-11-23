import { marquee, skillCategories } from "../data/skills";
import { Reveal, SectionHeading, SpotlightCard } from "../components/Motion";

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="px-5 md:px-12 max-w-7xl mx-auto">
        <SectionHeading title="Skills and tools" />
      </div>

      <div className="marquee overflow-hidden border-y border-dark-border py-7 mb-14" aria-hidden="true">
        <div className="marquee-track">
          {[...marquee, ...marquee].map((s, i) => (
            <span key={i} className="font-display text-3xl md:text-5xl font-semibold text-zinc-600 hover:text-white transition-colors px-7 whitespace-nowrap">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="px-5 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillCategories.map((cat, i) => (
          <Reveal key={cat.name} delay={(i % 3) * 0.08} className={cat.wide ? "lg:col-span-2" : ""}>
            <SpotlightCard className="h-full p-6 md:p-7 rounded-2xl">
              <h3 className="font-display text-lg font-semibold text-white mb-5">{cat.name}</h3>
              <ul className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <li
                    key={skill}
                    className="px-3.5 py-1.5 rounded-full text-sm border border-zinc-800 bg-black text-zinc-300 hover:bg-white hover:text-black hover:border-white transition-colors duration-200"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
