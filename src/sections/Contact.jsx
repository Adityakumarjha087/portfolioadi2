import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Check, Copy, Phone } from "lucide-react";

// Inline Github Icon Component
const Github = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={props.className} style={props.style}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Inline Linkedin Icon Component
const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={props.className} style={props.style}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "9aadityakumar12@gmail.com"; 

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard is unavailable (e.g. insecure context); fall back to the mail client.
      window.location.href = `mailto:${email}`;
    }
  };

  const socialLinks = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      isAction: true,
      onClick: handleCopyEmail
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      value: "linkedin.com/in/adityajha12",
      href: "https://www.linkedin.com/in/adityajha12/",
      isAction: false
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      value: "github.com/Adityakumarjha087",
      href: "https://github.com/Adityakumarjha087",
      isAction: false
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+91 87100 75503",
      href: "tel:+918710075503",
      isAction: false
    }
  ];

  return (
    <section id="contact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-dark-border relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Text headers */}
        <div className="lg:col-span-6 text-left flex flex-col gap-6">
          <div>
            <span className="font-mono text-xs text-zinc-500 tracking-widest uppercase">// get in touch</span>
            <h2 className="font-display font-bold text-4xl md:text-6xl text-white mt-1 leading-tight">
              Let's Build<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-600">
                Something Great.
              </span>
            </h2>
          </div>
          
          <p className="font-sans text-sm md:text-lg text-dark-text-secondary leading-relaxed max-w-md">
            I am currently open to new career opportunities, project collaborations, and full-stack/cloud contract work. Feel free to copy my email or reach out on social channels.
          </p>
        </div>

        {/* Right Side: Interactive Link grid */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {socialLinks.map((link, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl glass-panel border border-white/5 flex flex-col justify-between items-start gap-4 hover:border-zinc-500 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Background hover light glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="w-10 h-10 rounded-xl bg-dark-bg/85 border border-white/5 flex items-center justify-center text-dark-text-secondary group-hover:text-white transition-colors">
                {link.icon}
              </div>

              <div className="text-left w-full">
                <span className="font-mono text-[9px] text-dark-text-secondary/60 tracking-wider uppercase">{link.label}</span>
                <h3 className="font-display font-bold text-sm text-white mt-0.5 truncate tracking-wide">{link.value}</h3>
              </div>

              {link.isAction ? (
                <button
                  type="button"
                  onClick={link.onClick}
                  className="w-full py-2.5 rounded-xl bg-dark-bg border border-white/5 text-xs text-dark-text-secondary hover:text-white hover:border-zinc-500 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span 
                        key="copied"
                        className="flex items-center gap-1.5 text-white"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        <Check className="w-3.5 h-3.5" />
                        Copied!
                      </motion.span>
                    ) : (
                      <motion.span 
                        key="copy"
                        className="flex items-center gap-1.5"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        <Copy className="w-3.5 h-3.5" />
                        Copy Email
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <span role="status" aria-live="polite" className="sr-only">
                    {copied ? "Email address copied to clipboard" : ""}
                  </span>
                </button>
              ) : (
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={link.href.startsWith("tel:") ? `Call ${link.value}` : `Visit ${link.label} (opens in a new tab)`}
                  className="w-full py-2.5 rounded-xl bg-dark-bg border border-white/5 text-xs text-dark-text-secondary hover:text-white hover:border-zinc-500 transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                  Visit Link
                </a>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Footer */}
      <footer className="mt-24 pt-8 border-t border-dark-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-dark-text-secondary/40">
        <span>© {new Date().getFullYear()} ADITYA JHA. ALL RIGHTS RESERVED.</span>
        <div className="flex gap-6">
          <span>DESIGNED & ENGINEERED BY ADITYA JHA</span>
        </div>
      </footer>
    </section>
  );
}
