import { ArrowUpRight, FileText } from "lucide-react";
import { profile, resumeUrl } from "../data/site";
import { Reveal, SectionHeading, SpotlightCard } from "../components/Motion";

export default function Resume() {
  return (
    <section id="resume" className="py-24 md:py-32 px-5 md:px-12 max-w-7xl mx-auto">
      <SectionHeading title="My resume" />
      <Reveal>
        <SpotlightCard
          as="a"
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group p-7 md:p-12 rounded-3xl flex items-center justify-between gap-6"
        >
          <div className="flex flex-col gap-5">
            <FileText className="w-9 h-9 text-white" aria-hidden="true" />
            <div>
              <h3 className="font-display font-bold text-3xl md:text-5xl text-white">{profile.name}</h3>
              <p className="text-dark-text-secondary mt-3 leading-relaxed md:text-lg">
                LLM training, RAG and agents, with full-stack delivery in TypeScript and Python.
              </p>
              <p className="text-sm text-zinc-500 mt-4">Opens in Google Drive in a new tab</p>
            </div>
          </div>
          <span className="w-14 h-14 md:w-20 md:h-20 rounded-full border border-zinc-700 flex items-center justify-center shrink-0 text-white group-hover:bg-white group-hover:text-black group-hover:rotate-45 transition-all duration-300">
            <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8" aria-hidden="true" />
          </span>
        </SpotlightCard>
      </Reveal>
    </section>
  );
}
