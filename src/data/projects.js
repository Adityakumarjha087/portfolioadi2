export const projects = [
  {
    id: "ai-chatbot-testing",
    title: "AI Chatbot Testing & Evaluation System",
    subtitle: "LLM Testing & Data Pipelines",
    description: "Evaluated and benchmarked AI chatbot responses across multiple test cases to ensure accuracy, consistency, and contextual relevance, reducing hallucinations using structured feedback loops.",
    longDescription: "Developed as a framework for LLM validation, this system benchmarks responses using automated evaluation pipelines that process and validate large-scale structured datasets (JSON/CSV). It implements prompt engineering strategies to stress-test edge cases, discover model weaknesses, and filter out hallucinations. A dashboard aggregates response latency, accuracy indexes, and alignment scores to provide developers with instant evaluation feedback.",
    image: "/project_rag.svg",
    technologies: ["Python", "LLM Testing", "JSON/CSV Data Pipelines", "Prompt Engineering", "FastAPI"],
    github: "https://github.com/Adityakumarjha087",
    demo: null,
    features: [
      "Evaluated and benchmarked AI chatbot responses across multiple test cases.",
      "Designed prompt engineering strategies to test edge cases and uncover model weaknesses.",
      "Identified hallucinations and inconsistencies, improving response reliability.",
      "Built automated evaluation pipelines to process and validate large-scale datasets efficiently."
    ]
  },
  {
    id: "quora-automation",
    title: "Advanced Quora Automation Platform",
    subtitle: "SaaS Automation & Engagement",
    description: "A SaaS-based automation platform enabling scheduled posting, automated messaging, and engagement tracking with role-based access control and high-performance caching.",
    longDescription: "This platform allows creators to schedule, publish, and track engagement metrics on Quora. Built with Next.js and Node.js, the backend leverages MongoDB for data storage and implements secure session authentication and role-based access controls for multi-user safety. Optimized API endpoints utilize caching to minimize database roundtrips, reducing response latency and boosting processing throughput.",
    image: "/project_cloud.svg",
    technologies: ["Next.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "Caching"],
    github: "https://github.com/Adityakumarjha087/Quora_final",
    demo: "https://quora-final.vercel.app",
    features: [
      "Developed a SaaS-based automation platform enabling scheduled posting and messaging.",
      "Implemented secure authentication and role-based access control for multi-user environments.",
      "Optimized backend APIs with caching, reducing response time and improving system efficiency.",
      "Designed modular frontend and backend architecture for scalability and maintainability."
    ]
  },
  {
    id: "hackx-niet",
    title: "HackX NIET Hackathon Platform",
    subtitle: "Full-Stack Registration & Coordination",
    description: "A complete platform for hackathon registration, team management, participant tracking, and real-time syncing with Google Forms.",
    longDescription: "Designed and engineered specifically to coordinate hackathons, HackX NIET handles candidate registrations, team assemblies, and project submissions. It features real-time data sync hooks with Google Forms to streamline participant onboarding. The dashboard gives organizers a visual interface for tracking sign-ups, managing teams, and reviewing project reviews with optimized query rendering.",
    image: "/project_web3d.svg",
    technologies: ["React.js", "Next.js", "MongoDB", "REST APIs", "Google Forms Sync", "Tailwind CSS"],
    github: "https://github.com/Adityakumarjha087/hackxniet3.0",
    demo: "https://hackxniet3-0.vercel.app",
    features: [
      "Built a full-stack platform for hackathon registrations, team management, and tracking.",
      "Integrated real-time data synchronization with Google Forms for seamless onboarding.",
      "Designed admin dashboard for monitoring registrations, analytics, and event management.",
      "Improved UI performance and reduced latency through optimized API handling."
    ]
  },
  {
    id: "ocean-garden",
    title: "NASA Space Apps Hackathon — Ocean Garden",
    subtitle: "NASA Hackathon Challenger",
    description: "A responsive portal highlighting marine ecological data and botanical vegetation tracking built for the NASA Space Apps Hackathon challenge.",
    longDescription: "Engineered during the NASA Space Apps Hackathon, this site translates marine dataset models into responsive charts and maps. Designed with a clean interface, it tracks micro-vegetation statistics across global coordinates. The project was recognized for frontend styling, accessibility, and high performance during hackathon judging.",
    image: "/project_microservices.svg",
    technologies: ["React", "HTML5", "CSS3", "NASA Open Data API", "Responsive UI", "Data Visualization"],
    github: "https://github.com/Adityakumarjha087/ocean_garden_website",
    demo: "https://github.com/Adityakumarjha087/ocean_garden_website#readme",
    features: [
      "Designed and developed a responsive interface highlighting marine ecological data.",
      "Built for the NASA Space Apps Hackathon challenge in collaboration with a global team.",
      "Created interactive diagrams and tracking charts for micro-vegetation indices.",
      "Optimized assets for fast load times and clean accessibility standards."
    ]
  },
  {
    id: "ai-doctor",
    title: "AiDoctor Diagnostic Dashboard",
    subtitle: "AI Assistant & Medical Records",
    description: "A TypeScript-powered healthcare portal implementing simulated clinical AI helpers, interactive schedules, and patient charts.",
    longDescription: "A clinical dashboard showing patient files, diagnosis history, and AI diagnostic helpers. Built fully in TypeScript and React, it utilizes modular component trees to handle dynamic forms, scheduled calendar appointments, and clinical record filter searches.",
    image: "/project_rag.svg",
    technologies: ["TypeScript", "React.js", "Tailwind CSS", "Vite", "Clinical AI Assisting"],
    github: "https://github.com/Adityakumarjha087/AiDoctor",
    demo: "https://github.com/Adityakumarjha087/AiDoctor#readme",
    features: [
      "Developed clinical management portal interface using TypeScript and React.",
      "Built mock clinical AI assistant inputs for diagnostic verification simulations.",
      "Designed clean interactive scheduler calendars for doctor appointments.",
      "Engineered lightweight client-side filter lookups for patient records search."
    ]
  }
];
