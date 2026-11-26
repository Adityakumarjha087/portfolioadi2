import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Loader2, Send } from "lucide-react";
import { profile } from "../data/site";

// FormSubmit forwards each submission to this address. It must be activated once
// per address and site, from the email FormSubmit sends on the first submission.
const ENDPOINT = `https://formsubmit.co/ajax/${profile.email}`;
const TOPICS = ["Full-time role", "Freelance project", "Collaboration", "Just saying hi"];
const MESSAGE_MAX = 1500;
const EMPTY = { name: "", email: "", topic: TOPICS[0], message: "" };

function validate(v) {
  const errors = {};
  if (!v.name.trim()) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) errors.email = "Please enter a valid email address.";
  if (v.message.trim().length < 10) errors.message = "Please write at least 10 characters.";
  return errors;
}

function drafts(v) {
  const subject = `${v.topic}: message from ${v.name.trim()}`;
  const body = `${v.message.trim()}\n\n${v.name.trim()}\n${v.email.trim()}`;
  const s = encodeURIComponent(subject);
  const b = encodeURIComponent(body);
  return {
    subject,
    body,
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${s}&body=${b}`,
    mailto: `mailto:${profile.email}?subject=${s}&body=${b}`,
  };
}

async function deliver(v) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    // FormData keeps this a simple CORS request, so no preflight is needed.
    const body = new FormData();
    body.append("name", v.name.trim());
    body.append("email", v.email.trim());
    body.append("topic", v.topic);
    body.append("message", v.message.trim());
    body.append("_subject", drafts(v).subject);
    body.append("_template", "table");
    body.append("_captcha", "false");
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      signal: controller.signal,
      body,
    });
    const data = await res.json().catch(() => ({}));
    // FormSubmit reports success as the string "true" or "false".
    if (!res.ok || String(data.success) !== "true") throw new Error(data.message || `Request failed (${res.status})`);
  } finally {
    clearTimeout(timer);
  }
}

function Field({ id, label, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-zinc-300 mb-2">{label}</label>
      {children}
      <div className="flex justify-between gap-4">
        <div>{error && <p id={`${id}-error`} className="text-sm text-red-400 mt-1.5">{error}</p>}</div>
        {hint}
      </div>
    </div>
  );
}

function DraftOptions({ values }) {
  const [copied, setCopied] = useState(false);
  const d = drafts(values);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`To: ${profile.email}\nSubject: ${d.subject}\n\n${d.body}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = d.mailto;
    }
  };
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <a href={d.gmail} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
        Open in Gmail <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
      </a>
      <a href={d.mailto} className="btn btn-ghost btn-sm">Open mail app</a>
      <button type="button" onClick={copy} className="btn btn-ghost btn-sm">
        {copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
        {copied ? "Copied" : "Copy message"}
      </button>
    </div>
  );
}

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  // idle | sending | sent | error
  const [status, setStatus] = useState("idle");
  const formRef = useRef(null);
  const trapRef = useRef(null);
  const sentRef = useRef(null);

  // The form unmounts after a successful send; move focus to the confirmation.
  useEffect(() => {
    if (status === "sent") sentRef.current?.focus();
  }, [status]);

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((x) => ({ ...x, [key]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    const found = validate(values);
    setErrors(found);
    const firstBad = Object.keys(found)[0];
    if (firstBad) {
      formRef.current.elements[firstBad].focus();
      return;
    }
    // Hidden field only bots fill in.
    if (trapRef.current.value) return;

    setStatus("sending");
    try {
      await deliver(values);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const describe = (key) => ({
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
  });

  if (status === "sent") {
    return (
      <motion.div
        ref={sentRef}
        tabIndex={-1}
        role="status"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-96 flex flex-col items-center justify-center text-center gap-4 outline-none"
      >
        <motion.span
          className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
        >
          <Check className="w-8 h-8" aria-hidden="true" />
        </motion.span>
        <h3 className="font-display font-bold text-2xl text-white">Message sent</h3>
        <p className="text-dark-text-secondary max-w-sm">
          Thanks, {values.name.trim().split(" ")[0]}. I will reply to {values.email.trim()}.
        </p>
        <button
          type="button"
          className="btn btn-ghost btn-sm mt-2"
          onClick={() => {
            setValues(EMPTY);
            setStatus("idle");
            // Land on the first field again instead of losing focus.
            requestAnimationFrame(() => formRef.current?.elements.name?.focus());
          }}
        >
          Send another
        </button>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="flex flex-col gap-5">
      <fieldset>
        <legend className="text-sm text-zinc-300 mb-2.5">What is this about?</legend>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <label
              key={t}
              className={`px-4 py-2 rounded-full text-sm border cursor-pointer transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-white ${
                values.topic === t ? "bg-white text-black border-white" : "border-zinc-800 text-zinc-300 hover:border-zinc-500"
              }`}
            >
              <input type="radio" name="topic" value={t} checked={values.topic === t} onChange={set("topic")} className="sr-only" />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field id="name" label="Your name" error={errors.name}>
          <input id="name" name="name" autoComplete="name" maxLength={100} value={values.name} onChange={set("name")} className="field" {...describe("name")} />
        </Field>
        <Field id="email" label="Your email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" maxLength={200} value={values.email} onChange={set("email")} className="field" {...describe("email")} />
        </Field>
      </div>
      <Field
        id="message"
        label="Message"
        error={errors.message}
        hint={
          <p aria-hidden="true" className={`text-xs mt-1.5 tabular-nums shrink-0 ${values.message.length >= MESSAGE_MAX - 100 ? "text-amber-400" : "text-zinc-500"}`}>
            {values.message.length}/{MESSAGE_MAX}
          </p>
        }
      >
        <textarea id="message" name="message" rows={5} maxLength={MESSAGE_MAX} value={values.message} onChange={set("message")} className="field resize-y min-h-32" {...describe("message")} />
      </Field>

      <input ref={trapRef} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full sm:w-auto sm:self-start">
        {status === "sending" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Sending
          </>
        ) : (
          <>
            Send message <Send className="w-4 h-4" aria-hidden="true" />
          </>
        )}
      </button>

      <div role="status" aria-live="polite">
        <AnimatePresence mode="wait">
          {status === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-5 rounded-2xl border border-zinc-800 bg-black"
            >
              <p className="text-sm text-zinc-200 leading-relaxed">
                The message could not be sent. Nothing you typed is lost; try again or use one of these:
              </p>
              <DraftOptions values={values} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
