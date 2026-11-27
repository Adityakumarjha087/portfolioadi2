import { useEffect, useState } from "react";
import { ArrowUp, ArrowUpRight, Check, Copy, Mail, Phone } from "lucide-react";
import ContactForm from "../components/ContactForm";
import { Github, Linkedin } from "../components/Icons";
import { Reveal, SectionHeading, SpotlightCard } from "../components/Motion";
import { profile } from "../data/site";

const links = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail, copy: true },
  { label: "Phone", value: profile.phone, href: profile.phoneHref, icon: Phone },
  { label: "LinkedIn", value: "in/adityajha12", href: profile.linkedin, icon: Linkedin },
  { label: "GitHub", value: "Adityakumarjha087", href: profile.github, icon: Github },
];

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard is unavailable (e.g. insecure context); fall back to the mail client.
      window.location.href = `mailto:${text}`;
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy email address"
      className="relative z-10 p-2.5 -m-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      <span role="status" className="sr-only">{copied ? "Email address copied" : ""}</span>
    </button>
  );
}

function LocalTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);
  const time = now.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit" });
  return <span className="tabular-nums">{time} in Gurugram</span>;
}

export default function Contact() {
  return (
    <section id="contact" className="pt-24 md:pt-32 px-5 md:px-12 max-w-7xl mx-auto">
      <SectionHeading title="Let's build something great">
        Open to new roles, project collaborations and full-stack or AI contract work.
      </SectionHeading>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <Reveal className="lg:col-span-7">
          <SpotlightCard className="h-full p-6 md:p-10 rounded-3xl">
            <ContactForm />
          </SpotlightCard>
        </Reveal>

        <div className="lg:col-span-5 flex flex-col gap-4">
          {links.map(({ label, value, href, icon: Icon, copy }, i) => {
            const isWeb = href.startsWith("http");
            return (
              <Reveal key={label} delay={i * 0.07} className="grow">
                <SpotlightCard className="group h-full p-5 md:p-6 rounded-2xl flex items-center gap-4">
                  <span className="w-11 h-11 rounded-full border border-zinc-800 flex items-center justify-center shrink-0 text-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 grow">
                    <p className="text-sm text-zinc-400">{label}</p>
                    <a
                      href={href}
                      target={isWeb ? "_blank" : undefined}
                      rel={isWeb ? "noopener noreferrer" : undefined}
                      className="block font-display font-semibold text-white truncate after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-white"
                    >
                      {value}
                      {isWeb && <span className="sr-only"> (opens in a new tab)</span>}
                    </a>
                  </div>
                  {copy ? (
                    <CopyButton text={value} />
                  ) : (
                    <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" aria-hidden="true" />
                  )}
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>

      <footer className="mt-24 py-8 border-t border-dark-border flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-zinc-400">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <LocalTime />
        <a href="#hero" className="flex items-center gap-2 hover:text-white transition-colors">
          Back to top <ArrowUp className="w-4 h-4" aria-hidden="true" />
        </a>
      </footer>
    </section>
  );
}
