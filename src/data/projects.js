// Every entry links to a public repository. `demo` is set only for deployments
// that were opened and confirmed to load. Covers are one of:
//   image   - real screenshot in /public/projects
//   diagram - columns of nodes drawn as an animated pipeline
//   glyph   - typographic cover
const gh = (repo) => `https://github.com/Adityakumarjha087/${repo}`;
const shot = (name) => `/projects/${name}.jpg`;

export const categories = ["AI & LLM", "Full Stack", "Frontend", "Backend", "Coursework"];

export const projects = [
  {
    id: "rag",
    featured: true,
    title: "Production-Grade RAG with Evaluation Pipeline",
    kind: "Hybrid retrieval over regulatory PDFs",
    category: "AI & LLM",
    description: "Retrieval-augmented generation over large regulatory document sets, with validated citations, abstention when confidence is low, and a harness that compares every configuration.",
    features: [
      "PDF, table and scanned-page ingestion with structure-aware chunking.",
      "Hybrid BM25 + dense retrieval fused with RRF, then a cross-encoder reranker.",
      "Evaluation harness: recall@k, MRR and RAGAS faithfulness, plus abstention precision and recall.",
      "Streaming FastAPI service with caching, cost accounting and Langfuse tracing.",
      "Hybrid + rerank reached recall@5 of 1.0 on 496 circulars with 28 seed test items."
    ],
    technologies: ["Python", "FastAPI", "Qdrant", "RAGAS", "Langfuse", "Docker"],
    github: gh("Production-Grade-RAG-System-with-an-Evaluation-Pipeline-using-Vibe-Coding"),
    diagram: [["PDFs"], ["BM25", "Dense"], ["RRF + rerank"], ["Cited answer", "Abstain"]]
  },
  {
    id: "multi-agent",
    featured: true,
    title: "Multi-Agent Code Reviewer",
    kind: "Tool use with human-in-the-loop",
    category: "AI & LLM",
    description: "A planner plus bug, security and test agents review a GitHub pull request through MCP tools. A human approves every comment before it is posted.",
    features: [
      "LangGraph planner fans out to bug, security and test agents, then aggregates and ranks findings.",
      "Untrusted code runs only in a locked-down Docker sandbox with no network.",
      "Prompt-injection defences: fenced untrusted text, per-agent tool allowlists and grounded findings.",
      "Retries, timeouts, step limits and a per-review cost budget.",
      "Benchmark harness with 30 labelled PRs for recall, precision, steps, cost and latency."
    ],
    technologies: ["Python", "LangGraph", "MCP", "PostgreSQL", "Pydantic", "Docker"],
    github: gh("Multi-Agent-Code-Reviewer"),
    diagram: [["Planner"], ["Bug", "Security", "Tests"], ["Aggregator"], ["Human OK"]]
  },
  {
    id: "api-assistant",
    featured: true,
    title: "AI API Testing Assistant",
    kind: "Natural-language HTTP testing",
    category: "AI & LLM",
    description: "Describe an API test in plain English. An LLM sets up the request through a command protocol, and a server-side proxy runs it and shows the result in an inspector.",
    features: [
      "Llama 3.1 8B through the Groq API interprets test requests and guides setup (url, method, body, run).",
      "Server-side route sends conversation history to an OpenAI-compatible chat completions endpoint.",
      "Server-side proxy validates URLs and executes the HTTP request.",
      "Inspector panel reports status, headers, body and response time."
    ],
    technologies: ["Next.js", "TypeScript", "Groq API", "Llama 3.1", "REST"],
    github: gh("Api_Testing_Website"),
    demo: "https://api-qa-bot.vercel.app",
    image: shot("apiqa")
  },
  {
    id: "corvo",
    featured: true,
    title: "Corvo Procure",
    kind: "Policy-driven purchase request to PO",
    category: "Full Stack",
    description: "Employees raise purchase requests by chatting. A decision engine applies procurement policy stored as versioned data, so approving an amendment changes decisions with no code change.",
    features: [
      "Chat intake matches items, asks for what is missing and previews the policy outcome.",
      "Buyer workspace shows each decision with the clause, version, contract or PO behind it.",
      "Policy studio: propose a change, read the plain-language diff, preview impact, approve with a date.",
      "Deterministic fallback keeps the app working without an AI key; 46 automated tests."
    ],
    technologies: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "React", "TypeScript"],
    github: gh("corvo-procure"),
    demo: "https://corvo-procure.vercel.app",
    image: shot("corvo")
  },
  {
    id: "sentinel",
    featured: true,
    title: "SentinelAI",
    kind: "AI SOC analyst, defensive security",
    category: "AI & LLM",
    description: "Ingests security logs, detects anomalies with ML, investigates alerts, maps them to MITRE ATT&CK and writes incident reports, treating every byte of log content as untrusted.",
    features: [
      "Isolation Forest and PyTorch autoencoder detectors tracked in MLflow on CICIDS2017 flows.",
      "MITRE ATT&CK and CVE knowledge base with BM25, vector search and reranking.",
      "Injection guardrails: sanitization, regex patterns and a fine-tuned DistilBERT classifier.",
      "FastAPI backend and Streamlit dashboard with Markdown and PDF incident reports.",
      "Runs with an offline rule-based analyst by default; an LLM analyst is pluggable."
    ],
    technologies: ["Python", "PyTorch", "FastAPI", "ChromaDB", "Streamlit", "MLflow"],
    github: gh("sentinelai"),
    image: shot("sentinel")
  },
  {
    id: "zenwork",
    featured: true,
    title: "Employee Management System",
    kind: "SaaS-style HR dashboard",
    category: "Full Stack",
    description: "Zenwork brings authentication, employee CRUD, attendance, scheduling and file management into one dashboard, deployed on Vercel.",
    features: [
      "Dashboard with key metrics and recent activity.",
      "Add, edit and delete employees; track attendance and schedules.",
      "File management and user profiles behind authentication."
    ],
    technologies: ["Next.js 14", "TypeScript", "Tailwind CSS", "Prisma", "MySQL", "Framer Motion"],
    github: gh("Employee_dashboard"),
    demo: "https://employee-hub-nu.vercel.app",
    image: shot("zenwork")
  },

  {
    id: "learning",
    title: "Full-Stack Learning Platform",
    kind: "Course platform with admin builder",
    category: "Full Stack",
    description: "Courses, chapters, questions and progress tracking with an admin course builder, backed by an Express REST API deployed on Render.",
    features: [
      "REST APIs organised into routes, controllers and models.",
      "JWT authentication, bcrypt hashing, validation and error handling.",
      "Admin dashboard for building courses and chapters."
    ],
    technologies: ["Next.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "JWT"],
    github: gh("learning_platform_frontend"),
    githubBackend: gh("learning_platform_backend"),
    demo: "https://learning-platform-frontend-gray.vercel.app",
    image: shot("learning")
  },
  {
    id: "payments",
    title: "E-commerce Payments Backend",
    kind: "Payment orders and verification",
    category: "Backend",
    description: "Express REST API for a React storefront: creates and captures PayPal orders, authenticates users with JWT and exposes a health-check endpoint.",
    features: [
      "Endpoints to create payment orders and capture approved payments with the PayPal API.",
      "JWT authentication with bcrypt-hashed passwords and request validation.",
      "Health-check endpoint for monitoring the service."
    ],
    technologies: ["Node.js", "Express.js", "PayPal API", "MongoDB", "JWT"],
    github: gh("E-Commerce-Backend-Website"),
    diagram: [["Storefront"], ["Express API"], ["PayPal", "MongoDB"]]
  },
  {
    id: "sqlforge",
    title: "SQLForge",
    kind: "Text-to-SQL with a 1.5B LLM",
    category: "AI & LLM",
    description: "Pipeline for teaching a 1.5B-parameter model to write correct SQL: QLoRA SFT, then GRPO reinforcement learning rewarded by real query execution.",
    features: [
      "One safe SQL executor serves as data filter, eval metric, RL reward and serving sandbox.",
      "Execution-accuracy evaluation harness on the Spider dev set.",
      "FastAPI serving with vLLM, transformers or Ollama backends and a Next.js UI.",
      "74 offline tests; training runs on a free Colab T4."
    ],
    technologies: ["Python", "QLoRA", "GRPO", "vLLM", "FastAPI", "Next.js"],
    github: gh("SqlForgeLLM"),
    image: shot("sqlforge")
  },
  {
    id: "knowledge-ai",
    title: "KnowledgeAI",
    kind: "Enterprise knowledge assistant",
    category: "AI & LLM",
    description: "Knowledge assistant with a Next.js frontend, FastAPI backend and modular RAG layers for hybrid retrieval, reranking and streaming answers with citations.",
    features: [
      "PostgreSQL + pgvector for vectors; Redis for caching and rate limiting.",
      "Query rewriting, hybrid search and reranking before generation.",
      "Streaming responses with citations and cost tracking."
    ],
    technologies: ["Python", "FastAPI", "pgvector", "Redis", "Next.js", "Docker"],
    github: gh("KnowledgeAI"),
    demo: "https://knowledge-ai-brown.vercel.app",
    image: shot("knowledgeai")
  },
  {
    id: "ai-doctor",
    title: "AiDoctor",
    kind: "Digital health assistant",
    category: "AI & LLM",
    description: "Upload a medical report as PDF and get an AI-generated analysis, with every report kept in a personal dashboard.",
    features: [
      "Drag-and-drop PDF upload with automatic text extraction.",
      "Report analysis through the Groq API (Llama 3.3 70B).",
      "Authentication with NextAuth and MongoDB."
    ],
    technologies: ["Next.js", "TypeScript", "Groq API", "MongoDB", "NextAuth"],
    github: gh("AiDoctor"),
    diagram: [["PDF report"], ["Extract"], ["Llama 3.3"], ["Dashboard"]]
  },
  {
    id: "inventory",
    title: "Inventory & Order Management",
    kind: "Products, customers and orders",
    category: "Full Stack",
    description: "Manage products, customers and orders. Creating an order reduces stock automatically and cancelling it restores the stock.",
    features: [
      "Order totals calculated on the backend; orders blocked when stock is short.",
      "Dashboard with summary statistics and low-stock alerts.",
      "Containerised with Docker Compose."
    ],
    technologies: ["React", "FastAPI", "PostgreSQL", "SQLAlchemy", "Docker"],
    github: gh("inventory-system"),
    demo: "https://inventory-system-olive-nine.vercel.app",
    image: shot("inventory")
  },
  {
    id: "taskflow",
    title: "TaskFlow",
    kind: "Team task management",
    category: "Full Stack",
    description: "Projects and tasks for teams with role-based access for HR, project heads and employees, plus a KPI dashboard.",
    features: [
      "Three-tier role-based access control.",
      "Task filtering, status updates and member management.",
      "Seed script and Docker setup for local development."
    ],
    technologies: ["React 19", "TypeScript", "Node.js", "Express.js", "MongoDB", "JWT"],
    github: gh("task_manager"),
    diagram: [["HR", "Head", "Employee"], ["RBAC"], ["Projects", "Tasks"]]
  },
  {
    id: "hackx",
    title: "HackX NIET 3.0",
    kind: "Hackathon website",
    category: "Frontend",
    description: "Website and registration flow for the HackX NIET 3.0 hackathon with themes, team, FAQ and a dedicated registration page.",
    features: [
      "Animated, dark, fully responsive landing experience.",
      "Dedicated registration page with form validation.",
      "Google APIs integration."
    ],
    technologies: ["Next.js", "Tailwind CSS", "React Hook Form", "Google APIs"],
    github: gh("hackxniet3.0"),
    demo: "https://hackxniet3-0.vercel.app",
    image: shot("hackx")
  },
  {
    id: "hpcl",
    title: "HPCL Marine Logistics",
    kind: "Hackathon concept",
    category: "Frontend",
    description: "Hackathon concept for optimizing marine cargo, with a port map, route analytics and a light/dark theme.",
    features: [
      "Port map built on the Google Maps API.",
      "Port and route analytics views.",
      "Accessibility controls for text size and theme."
    ],
    technologies: ["Next.js", "TypeScript", "Google Maps API", "Framer Motion"],
    github: gh("Hpcl_Hackaathon"),
    demo: "https://hpcl-hackaathon.vercel.app",
    image: shot("hpcl")
  },
  {
    id: "quora",
    title: "Quora Clone",
    kind: "Question and answer community",
    category: "Full Stack",
    description: "Ask questions, answer in Markdown and vote on what helps, with authentication and data on Firebase.",
    features: [
      "Firebase authentication and Firestore security rules.",
      "Markdown answers with sanitized rendering.",
      "Search, voting and answer counts."
    ],
    technologies: ["React", "TypeScript", "Firebase", "Vite"],
    github: gh("Quora_final"),
    demo: "https://quora-final.vercel.app",
    image: shot("quora")
  },
  {
    id: "storefront",
    title: "Shopkart Storefront",
    kind: "E-commerce frontend",
    category: "Frontend",
    description: "Colour-block store for clothing, jewellery and electronics with filters, search, saved items, a cart drawer and light and dark themes.",
    features: [
      "Redux Toolkit for cart, saved items and products, kept between visits.",
      "Filters and search live in the URL, so results can be shared.",
      "Animated hero, pointer zoom on product photos and a slide-in cart."
    ],
    technologies: ["React", "Redux Toolkit", "Tailwind CSS", "Framer Motion"],
    github: gh("E-Commerce-Website"),
    demo: "https://e-commerce-website-flax-seven.vercel.app",
    image: shot("storefront")
  },
  {
    id: "musicify",
    title: "Musicify",
    kind: "Music discovery app",
    category: "Frontend",
    description: "Spotify-inspired music app with search, playlists and liked songs, powered by the Shazam Core API.",
    features: [
      "Debounced search across songs, artists and albums.",
      "Create, edit and delete playlists.",
      "GSAP animations and a responsive interface."
    ],
    technologies: ["React", "Redux Toolkit", "GSAP", "Tailwind CSS", "Socket.IO"],
    github: gh("spotify_clone"),
    demo: "https://spotify-clone-virid-sigma.vercel.app",
    image: shot("musicify")
  },
  {
    id: "divine-decor",
    title: "Divine Decor",
    kind: "Home furnishings landing page",
    category: "Frontend",
    description: "Landing page for a home décor brand with category browsing, featured products and an order call to action.",
    features: ["Component library built on Radix UI.", "Responsive hero, category and product sections."],
    technologies: ["Next.js", "TypeScript", "Radix UI", "Tailwind CSS"],
    github: gh("market"),
    demo: "https://market-mu-sepia.vercel.app",
    image: shot("market")
  },
  {
    id: "datepicker",
    title: "Recurring Date Picker",
    kind: "Reusable React component",
    category: "Frontend",
    description: "Recurring schedules with daily, weekly, monthly and yearly patterns, custom intervals and a live calendar preview.",
    features: [
      "Advanced rules such as the second Tuesday of every month.",
      "Date range with optional end date.",
      "Tests with Jest and React Testing Library."
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Jest"],
    github: gh("recurringDatePicker"),
    demo: "https://recurring-date-picker-peach.vercel.app",
    image: shot("datepicker")
  },
  {
    id: "file-share",
    title: "Secure File Sharing",
    kind: "Django REST API",
    category: "Backend",
    description: "Role-based file sharing where Ops users upload documents and Client users download them through expiring links.",
    features: ["JWT authentication and role-based access.", "File type validation.", "Expiring secure download links."],
    technologies: ["Python", "Django", "Django REST Framework", "JWT"],
    github: gh("file_system"),
    diagram: [["Ops upload"], ["Validate"], ["Signed link"]]
  },
  {
    id: "hospital",
    title: "Hospital Management",
    kind: "Spring Boot application",
    category: "Backend",
    description: "Manage patients, doctors and appointments with a layered Spring Boot backend and Thymeleaf views.",
    features: ["CRUD for patients and doctors.", "Schedule, update and cancel appointments."],
    technologies: ["Java", "Spring Boot", "JPA", "MySQL", "Thymeleaf"],
    github: gh("hospital-management"),
    diagram: [["Controller"], ["Service"], ["Repository"]]
  },
  {
    id: "face-detection",
    title: "Detection Mini Project",
    kind: "Computer vision",
    category: "AI & LLM",
    description: "Desktop detection app using OpenCV and MTCNN with a PyQt5 interface that logs detections to SQLite.",
    features: ["Detection with MTCNN and OpenCV.", "PyQt5 desktop interface.", "Detections stored in SQLite."],
    technologies: ["Python", "OpenCV", "MTCNN", "PyQt5", "SQLite"],
    github: gh("Mini_project"),
    diagram: [["Camera"], ["MTCNN"], ["SQLite"]]
  },
  {
    id: "music-app",
    title: "Music App",
    kind: "React and Firebase",
    category: "Frontend",
    description: "Music player with sign-up and login, featured playlists, search and play/pause controls.",
    features: ["Firebase email and password authentication.", "Playlists, search and player controls."],
    technologies: ["React", "Material UI", "Firebase"],
    github: gh("music_app"),
    glyph: "♪"
  },
  {
    id: "ocean-garden",
    title: "Ocean Garden",
    kind: "NASA Space Apps hackathon",
    category: "Frontend",
    description: "Team entry for the NASA Space Apps hackathon: an educational site on ocean life, overfishing and sustainability with a quiz.",
    features: ["Pages on impact, overfishing and sustainability.", "Interactive quiz and video backgrounds."],
    technologies: ["HTML", "CSS"],
    github: gh("ocean_garden_website"),
    glyph: "≈"
  },
  {
    id: "portfolio",
    title: "This Portfolio",
    kind: "The site you are on",
    category: "Frontend",
    description: "Monochrome portfolio with a shader-driven 3D hero, scroll-linked motion and a working contact form.",
    features: ["Custom GLSL particle field.", "Respects reduced-motion preferences and works by keyboard."],
    technologies: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
    github: gh("portfolioadi2"),
    demo: "https://jhaportfolio.vercel.app",
    glyph: "AJ"
  },
  {
    id: "jdbc",
    title: "JDBC 15-Day Challenge",
    kind: "Advanced Java",
    category: "Coursework",
    description: "Java programs connecting to MySQL through JDBC: CRUD, prepared statements and SQL exception handling.",
    features: ["CRUD with prepared statements.", "SQL exception handling."],
    technologies: ["Java", "JDBC", "MySQL"],
    github: gh("advance_java"),
    glyph: "Java"
  },
  {
    id: "cpp",
    title: "C++ Programs",
    kind: "Practice",
    category: "Coursework",
    description: "Collection of C++ practice programs.",
    features: ["Core C++ fundamentals."],
    technologies: ["C++"],
    github: gh("c-code-folder"),
    glyph: "C++"
  },
  {
    id: "weather",
    title: "Weather Lookup",
    kind: "Web application",
    category: "Coursework",
    description: "Small web app that looks up the weather for a city through the OpenWeatherMap API.",
    features: ["City lookup with a PHP endpoint."],
    technologies: ["HTML", "CSS", "PHP"],
    github: gh("web-_application"),
    glyph: "°C"
  },
  {
    id: "admin-dashboard",
    title: "React Admin Dashboard",
    kind: "Celebal Technologies internship",
    category: "Coursework",
    description: "React admin dashboard with line, pie, stacked and sparkline charts, kanban, calendar and editor pages.",
    features: ["Multiple chart types.", "Sidebar, cart, chat and notification panels."],
    technologies: ["React", "JavaScript"],
    github: gh("react-admin-dashboard"),
    diagram: [["Charts", "Kanban"], ["Dashboard"], ["Orders", "Calendar"]]
  },
  {
    id: "todo-list",
    title: "React To-do List",
    kind: "Celebal Technologies internship",
    category: "Coursework",
    description: "To-do list in React with filters; tasks persist in local storage.",
    features: ["Add and filter tasks.", "Tasks saved in local storage."],
    technologies: ["React", "CSS"],
    github: gh("react-todo-list"),
    glyph: "✓"
  },
  {
    id: "registration-form",
    title: "React Registration Form",
    kind: "Celebal Technologies internship",
    category: "Coursework",
    description: "Registration form with field-level validation and dependent country and city selects.",
    features: ["Format validation for each field.", "City options follow the selected country."],
    technologies: ["React", "JavaScript"],
    github: gh("react-registration-form"),
    demo: "https://adityakumarjha087.github.io/react-registration-form/",
    image: shot("regform")
  },
  {
    id: "prodigy",
    title: "Prodigy Portfolio Page",
    kind: "Web development task 4",
    category: "Coursework",
    description: "Personal portfolio page built with HTML and CSS.",
    features: ["Portfolio and about pages."],
    technologies: ["HTML", "CSS"],
    github: gh("PRODIGY_WD_4"),
    glyph: "</>"
  }
];
