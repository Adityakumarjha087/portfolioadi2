import { ArrowUpRight, FileText } from "lucide-react";
import { resumes } from "../data/site";
import { Reveal, SectionHeading, SpotlightCard } from "../components/Motion";

export default function Resume() {
  return (
    <section id="resume" className="py-24 md:py-32 px-5 md:px-12 max-w-7xl mx-auto">
      <SectionHeading title="My resume">Two versions, depending on the role you are hiring for.</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resumes.map((r, i) => (
          <Reveal key={r.id} delay={i * 0.1}>
            <SpotlightCard
              as="a"
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group h-full min-h-64 p-7 md:p-9 rounded-3xl flex flex-col justify-between gap-10"
            >
              <div className="flex justify-between items-start">
                <FileText className="w-8 h-8 text-white" aria-hidden="true" />
                <span className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:rotate-45 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
                </span>
              </div>
              <div>
                <h3 className="font-display font-bold text-3xl md:text-4xl text-white">{r.title}</h3>
                <p className="text-dark-text-secondary mt-3 leading-relaxed">{r.focus}</p>
                <p className="text-sm text-zinc-500 mt-4">{r.source} in a new tab</p>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
