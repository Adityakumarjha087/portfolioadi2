import {
  Activity,
  Bot,
  ChartColumn,
  ClipboardCheck,
  Database,
  FileCheck,
  FileLock,
  Gauge,
  GitPullRequest,
  GraduationCap,
  Hash,
  Kanban,
  MessageSquareCode,
  Microscope,
  Plug,
  RefreshCw,
  Route,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Split,
  Target,
  Webhook,
  Zap,
} from "lucide-react";
import { brandIcons } from "../data/brandIcons";

// Line icons for skills without a brand mark.
const lineIcons = {
  "Reinforcement learning (RL)": Target,
  "Supervised fine-tuning (SFT)": GraduationCap,
  "Model evaluation": ChartColumn,
  RAG: SearchCheck,
  RAGAS: Gauge,
  "Multi-agent systems": Bot,
  "Prompt design": MessageSquareCode,
  "Groq API": Zap,
  "Training data curation": FileCheck,
  SQL: Database,
  "REST API design": Webhook,
  "LLM API integration": Plug,
  "Test case design": ClipboardCheck,
  "Edge-case validation": Split,
  "Code reviews": GitPullRequest,
  "Retries and timeouts": RefreshCw,
  "Request tracing": Route,
  RCA: Microscope,
  Langfuse: Activity,
  Agile: Kanban,
  "bcrypt hashing": Hash,
  "Server-side input validation": ShieldCheck,
  "Secrets in environment variables": FileLock,
};

export default function SkillIcon({ name, className }) {
  const brand = brandIcons[name];
  if (brand) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d={brand.path} />
      </svg>
    );
  }
  const Line = lineIcons[name] ?? Sparkles;
  return <Line strokeWidth={1.6} aria-hidden="true" className={className} />;
}
