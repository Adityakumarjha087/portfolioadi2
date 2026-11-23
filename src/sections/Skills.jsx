import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { brandColor } from "../data/brandIcons";
import { marquee, skillCategories } from "../data/skills";
import { Reveal, SectionHeading, SpotlightCard } from "../components/Motion";
import SkillIcon from "../components/SkillIcon";

// Icons only; the caption names the icon being hovered or tapped. Keyboard focus
// on the list shows every name, and screen readers get the names directly.
function SkillCard({ category }) {
  const [active, setActive] = useState(null);
  const [focused, setFocused] = useState(false);
  const { name, skills } = category;
  const caption = active ?? (focused ? skills.join(", ") : `${skills.length} skills`);

  return (
    <SpotlightCard className="h-full p-6 md:p-7 rounded-2xl">
      <h3 className="font-display text-lg font-semibold text-white">{name}</h3>
      <div className="min-h-6 mt-1 mb-5 text-sm" aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={caption}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.1 }}
            className={active || focused ? "text-white" : "text-zinc-500"}
          >
            {caption}
          </motion.p>
        </AnimatePresence>
      </div>
      <ul
        tabIndex={0}
        aria-label={`${name} skills`}
        onFocus={(e) => setFocused(e.currentTarget.matches(":focus-visible"))}
        onBlur={() => setFocused(false)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}
        className="flex flex-wrap gap-3 rounded-2xl"
      >
        {skills.map((skill) => (
          <li
            key={skill}
            style={{ "--brand": brandColor(skill) }}
            onPointerEnter={() => setActive(skill)}
            onClick={() => setActive(skill)}
            className={`skill-tile ${active === skill ? "is-active" : ""}`}
          >
            <SkillIcon name={skill} className="w-8 h-8" />
            <span className="sr-only">{skill}</span>
          </li>
        ))}
      </ul>
    </SpotlightCard>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="px-5 md:px-12 max-w-7xl mx-auto">
        <SectionHeading title="Skills and tools" />
      </div>

      <div className="marquee overflow-hidden border-y border-dark-border py-8 mb-14" aria-hidden="true">
        <div className="marquee-track">
          {[...marquee, ...marquee].map((s, i) => (
            <span key={i} style={{ "--brand": brandColor(s) }} className="marquee-logo px-8 md:px-10">
              <SkillIcon name={s} className="w-10 h-10 md:w-12 md:h-12" />
            </span>
          ))}
        </div>
      </div>

      <div className="px-5 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillCategories.map((cat, i) => (
          <Reveal key={cat.name} delay={(i % 3) * 0.08} className={cat.wide ? "lg:col-span-2" : ""}>
            <SkillCard category={cat} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
