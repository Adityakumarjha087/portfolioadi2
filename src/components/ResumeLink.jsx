import { ArrowUpRight, FileText } from "lucide-react";
import { resumeUrl } from "../data/site";

export default function ResumeLink({ className = "btn btn-ghost", ...rest }) {
  return (
    <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
      <FileText className="w-4 h-4" aria-hidden="true" />
      Resume
      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
    </a>
  );
}
