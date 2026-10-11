import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
  useMotionValueEvent,
  useInView,
  animate,
} from "framer-motion";
import {
  ExternalLink,
  Code2,
  Database,
  Users,
  Terminal,
  X,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Send,
  Globe,
  GitBranch,
  Download,
  Cpu,
  GraduationCap,
  BrainCircuit,
  Rocket,
  Search,
  Check,
  CheckCircle2,
  Copy,
  Menu,
  Briefcase,
  Sparkles,
  Layers,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

import HeroDeskScene from "./components/HeroDeskScene";

/* ------------------------------------------------------------------ */
/*  Clay design system (dark claymorphism / soft neumorphism)          */
/*  Surfaces are extruded from one base colour using paired light and  */
/*  dark shadows. No glows, no blur-glass.                             */
/* ------------------------------------------------------------------ */
type ClayTheme = { bg: string; s1: string; s2: string; well: string; sd: string; dot: string; tx: string; tx2: string; mut: string; faint: string; acc: string };

// Night-studio palette: deep navy surfaces with warm amber light, one tint per page band.
const LAV: ClayTheme = { bg: "#0b1226", s1: "#16203c", s2: "#0f172e", well: "#080e1f", sd: "2,5,14", dot: "120,140,215", tx: "#eef1fb", tx2: "#cdd5ee", mut: "#9aa6c8", faint: "#6c789c", acc: "#ffb454" };
const SKY: ClayTheme = { bg: "#0d1630", s1: "#182446", s2: "#101a36", well: "#09112a", sd: "2,5,16", dot: "120,140,225", tx: "#eef1fb", tx2: "#cdd5ee", mut: "#9aa6c8", faint: "#6c789c", acc: "#ffb454" };
const MINT: ClayTheme = { bg: "#0a1624", s1: "#15233a", s2: "#0d192b", well: "#07101c", sd: "1,5,12", dot: "110,150,205", tx: "#eef1fb", tx2: "#cdd5ee", mut: "#9aa6c8", faint: "#6c789c", acc: "#ffb454" };

const clayScope = (sel: string, t: ClayTheme) => `
${sel} {
  --bg: ${t.bg}; --s1: ${t.s1}; --s2: ${t.s2}; --well: ${t.well};
  --sd: ${t.sd}; --dot: ${t.dot};
  --tx: ${t.tx}; --tx2: ${t.tx2}; --mut: ${t.mut}; --faint: ${t.faint}; --acc: ${t.acc};
  --line: rgba(255,255,255,0.07);
  --sh-raised: 12px 12px 26px rgba(${t.sd},0.65), -8px -8px 22px rgba(255,255,255,0.035),
    inset 1px 1px 1px rgba(255,255,255,0.07), inset -3px -4px 8px rgba(0,0,0,0.25);
  --sh-raised-sm: 6px 6px 14px rgba(${t.sd},0.6), -5px -5px 12px rgba(255,255,255,0.03),
    inset 1px 1px 1px rgba(255,255,255,0.06), inset -2px -2px 5px rgba(0,0,0,0.22);
  --sh-inset: inset 6px 6px 14px rgba(${t.sd},0.7), inset -5px -5px 12px rgba(255,255,255,0.035);
  --sh-inset-sm: inset 3px 3px 7px rgba(${t.sd},0.7), inset -3px -3px 7px rgba(255,255,255,0.03);
  --sh-pri: 8px 8px 18px rgba(${t.sd},0.6), -4px -4px 12px rgba(255,255,255,0.03),
    inset 2px 2px 4px rgba(255,255,255,0.4), inset -3px -4px 8px rgba(160,70,0,0.5);
  --sh-pri-active: inset 3px 3px 8px rgba(160,70,0,0.65), inset -2px -2px 6px rgba(255,255,255,0.2);
  --sh-tab: 5px 5px 12px rgba(${t.sd},0.6), -3px -3px 8px rgba(255,255,255,0.03),
    inset 1px 1px 3px rgba(255,255,255,0.35), inset -2px -3px 6px rgba(160,70,0,0.45);
}`;

const clayStyles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

:root { --a-blue: #9fb0ff; --a-amber: #ffb454; --a-teal: #5fd6bd; --a-coral: #ff8f7a; }
${clayScope(":root, .cl-lav", LAV)}
${clayScope(".cl-sky", SKY)}
${clayScope(".cl-mint", MINT)}

.cl-slab {
  background:
    radial-gradient(ellipse 60% 70% at 14% 0%, rgba(255,176,84,0.13), transparent 60%),
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px) 0 0 / 32px 32px,
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px) 0 0 / 32px 32px,
    linear-gradient(145deg, #131c3a, #0a1022);
  box-shadow: 14px 14px 30px rgba(2,5,14,0.65), -8px -8px 22px rgba(255,255,255,0.035),
    inset 1px 1px 2px rgba(255,255,255,0.07);
}

.cl-band {
  position: relative;
  margin-top: -2.5rem;
  padding-top: 2.5rem;
  border-radius: 3rem 3rem 0 0;
  background-color: var(--bg);
  box-shadow: 0 -16px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06);
}

.cl-dots {
  background-image: radial-gradient(rgba(var(--dot), 0.16) 1.2px, transparent 1.5px);
  background-size: 24px 24px;
}

.cl-root .font-mono { font-family: 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace; letter-spacing: -0.01em; }

html { scroll-behavior: smooth; }

.cl-root {
  font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;
  background-color: var(--bg);
  color: var(--tx);
}

.cl-root h1, .cl-root h2, .cl-root h3, .cl-root h4, .cl-root h5, .cl-display {
  font-family: 'Space Grotesk', 'Inter', ui-sans-serif, system-ui, sans-serif;
  letter-spacing: -0.02em;
}

.cl-raised    { background: linear-gradient(145deg, var(--s1), var(--s2)); box-shadow: var(--sh-raised); }
.cl-raised-sm { background: linear-gradient(145deg, var(--s1), var(--s2)); box-shadow: var(--sh-raised-sm); }
.cl-inset     { background: var(--well); box-shadow: var(--sh-inset); }
.cl-inset-sm  { background: var(--well); box-shadow: var(--sh-inset-sm); }

.cl-btn { transition: transform .2s ease, box-shadow .2s ease, color .2s ease; }
.cl-btn:hover { transform: translateY(-2px); }
.cl-btn:active { transform: translateY(1px); box-shadow: var(--sh-inset-sm); }

.cl-primary {
  background: linear-gradient(145deg, #ffc873, #f2872f);
  color: #1b1204;
  box-shadow: var(--sh-pri);
}
.cl-primary:active { box-shadow: var(--sh-pri-active); }

.cl-card { transition: transform .3s ease; }
.cl-card:hover { transform: translateY(-5px); }

.cl-tab-on {
  background: linear-gradient(145deg, #ffc873, #f2872f);
  color: #1b1204;
  box-shadow: var(--sh-tab);
}

.cl-groove { background: var(--well); box-shadow: var(--sh-inset-sm); }

.cl-root a:focus-visible,
.cl-root button:focus-visible,
.cl-root input:focus-visible,
.cl-root [role="button"]:focus-visible {
  outline: 2px solid var(--acc);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .cl-root *, .cl-root *::before, .cl-root *::after { animation: none !important; transition: none !important; }
}
`;

// --- Tilt wrapper (kept for the profile photo, softened) ---
function Card3DTilt({
  children,
  intensity = 15,
  scaleOnHover = false,
}: {
  children: React.ReactNode;
  intensity?: number;
  scaleOnHover?: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${intensity}deg`, `-${intensity}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${intensity}deg`, `${intensity}deg`]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="w-full h-full">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={scaleOnHover ? { scale: 1.02 } : {}}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

// --- Types & Data ---
type ProjectCategory = "All" | "AI / RAG" | "Full Stack" | "Systems / SQL";
type AccentKey = "violet" | "peach" | "mint" | "sky";

const ACCENTS: Record<AccentKey, string> = {
  violet: "var(--a-blue)",
  peach: "var(--a-amber)",
  mint: "var(--a-teal)",
  sky: "var(--a-coral)",
};

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  highlights: string[];
  techStack: string[];
  category: ProjectCategory;
  accent: AccentKey;
  icon: React.ReactNode;
  /** Screenshot in /public/projects/<id>.png (16:10). Falls back to a code-window preview if the file is missing. */
  image: string;
  link?: string;
  github?: string;
  featured?: boolean;
}

// SCREENSHOTS: save one image per project in  public/projects/  named after the id below
// (repomind.png, design-forge.png, edunexus.png, venture-bridge.png, airisto.png). 1600x1000 works best.
const projectsData: Project[] = [
  {
    id: "repomind",
    image: "/projects/repomind.png",
    title: "Repomind",
    subtitle: "AI-powered repository analyzer",
    category: "AI / RAG",
    accent: "violet",
    featured: true,
    description:
      "Intelligent developer tool that analyzes GitHub repositories to provide architectural summaries, codebase insights, and documentation generation.",
    longDescription:
      "Repomind leverages AI to decode complex codebases. It fetches repository data, processes file trees, and outputs comprehensive architectural summaries to help new contributors onboard rapidly.",
    highlights: [
      "Reads a GitHub repository and its file tree",
      "Writes architectural summaries and documentation",
      "Helps new contributors onboard faster",
    ],
    techStack: ["Next.js", "Python", "FastAPI", "OpenAI API", "Tailwind CSS"],
    icon: <Cpu size={24} />,
    github: "https://github.com/NikhilMoudgil",
  },
  {
    id: "design-forge",
    image: "/projects/design-forge.png",
    title: "Design Forge",
    subtitle: "Dynamic UI/UX generator",
    category: "Full Stack",
    accent: "peach",
    featured: true,
    description:
      "A creative utility platform for developers to rapidly prototype and generate accessible, highly-customizable UI components.",
    longDescription:
      "Design Forge accelerates frontend workflows by offering a parameter-based component generation interface, exporting clean, production-ready React and Tailwind code snippets.",
    highlights: [
      "Parameter-based component generation",
      "Exports clean React + Tailwind snippets",
      "Built around accessible, customizable UI",
    ],
    techStack: ["React", "TypeScript", "Framer Motion", "Vite", "Tailwind"],
    icon: <Code2 size={24} />,
    link: "https://designforge-delta.vercel.app/",
    github: "https://github.com/NikhilMoudgil",
  },
  {
    id: "edunexus",
    image: "/projects/edunexus.png",
    title: "EduNexus",
    subtitle: "API-based roadmap generating platform",
    category: "Full Stack",
    accent: "mint",
    featured: true,
    description:
      "An API-based platform where users generate dynamic roadmaps based on their field of interest, complete with an interactive community.",
    longDescription:
      "EduNexus solves static learning curves by allowing users to input personalized data fields to instantly fetch dynamic curriculum roadmaps. Built with robust API routing and an integrated peer community module.",
    highlights: [
      "Roadmaps generated from your field of interest",
      "API-driven curriculum fetching",
      "Built-in peer community",
    ],
    techStack: ["Next.js", "React", "TypeScript", "REST APIs", "Node.js"],
    icon: <Terminal size={24} />,
    link: "https://edu-nexus-teal.vercel.app",
    github: "https://github.com/NikhilMoudgil",
  },
  {
    id: "venture-bridge",
    image: "/projects/venture-bridge.png",
    title: "Venture-Bridge",
    subtitle: "Entrepreneur & investor ecosystem",
    category: "Full Stack",
    accent: "sky",
    description:
      "A specialized platform for entrepreneurs to pitch ideas and investors to discover inventions and interact seamlessly.",
    longDescription:
      "Venture-Bridge bridges the capital and execution gap. It establishes a secure ecosystem where startup founders pitch concepts, and venture capital stakeholders inspect and engage directly.",
    highlights: [
      "Founders pitch their ideas",
      "Investors discover and engage directly",
      "JWT-secured accounts",
    ],
    techStack: ["MongoDB", "Express", "React", "Node.js", "JWT Auth"],
    icon: <Users size={24} />,
    link: "https://venture-bridge-ruby.vercel.app",
    github: "https://github.com/NikhilMoudgil",
  },
  {
    id: "airisto",
    image: "/projects/airisto.png",
    title: "Airisto",
    subtitle: "DBMS-based AC services marketplace",
    category: "Systems / SQL",
    accent: "peach",
    description:
      "An administrative marketplace built using HTML, CSS, and JavaScript, powered by backend DBMS logic for service management.",
    longDescription:
      "Airisto streamlines air-conditioning service operations. It features administrative control portals and a consumer marketplace heavily managed via structured relational database systems.",
    highlights: [
      "Administrative control portal",
      "Consumer service marketplace",
      "Backed by a relational SQL database",
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "SQL", "Relational Database"],
    icon: <Database size={24} />,
    github: "https://github.com/NikhilMoudgil",
  },
];

const CATEGORIES: ProjectCategory[] = ["All", "AI / RAG", "Full Stack", "Systems / SQL"];

const skillsCategories = [
  {
    title: "AI & backend architecture",
    icon: <BrainCircuit size={20} />,
    accent: "violet" as AccentKey,
    skills: ["FastAPI", "RAG Pipelines", "LLMs & Prompt Eng", "Python", "Node.js", "Express.js", "REST APIs"],
  },
  {
    title: "Frontend engineering",
    icon: <Code2 size={20} />,
    accent: "peach" as AccentKey,
    skills: ["Next.js", "React", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "Framer Motion", "Redux Toolkit"],
  },
  {
    title: "Database & DevOps",
    icon: <Database size={20} />,
    accent: "mint" as AccentKey,
    skills: ["Docker", "MongoDB", "SQL / PostgreSQL", "Microservices", "Git / GitHub", "Vercel / Render"],
  },
];

const EMAIL = "nikhilmoudgil799@gmail.com";

// --- Small building blocks ---
function AskAvatar() {
  return (
    <img
      src="/Nikhil.png"
      alt=""
      className="w-11 h-11 rounded-full object-cover shrink-0"
      style={{ boxShadow: "var(--sh-raised-sm)" }}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
      }}
    />
  );
}

function CountUp({ to, from = 0, decimals = 0, duration = 1.4 }: { to: number; from?: number; decimals?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(from);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(from, to, { duration, ease: "easeOut", onUpdate: (v) => setVal(v) });
    return () => controls.stop();
  }, [inView, from, to, duration]);
  return <span ref={ref}>{val.toFixed(decimals)}</span>;
}

function SectionHeading({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55 }}
      className="flex items-start gap-4"
    >
      <div className="cl-raised-sm w-12 h-12 rounded-2xl grid place-items-center text-[color:var(--acc)] shrink-0">{icon}</div>
      <div>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[color:var(--tx)]">{title}</h3>
        <p className="text-[color:var(--mut)] text-sm mt-1 max-w-xl leading-relaxed">{subtitle}</p>
      </div>
    </motion.div>
  );
}

function TimelineItem({
  active,
  title,
  org,
  children,
}: {
  active?: boolean;
  title: string;
  org: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative pl-9">
      <span
        className="absolute left-0 top-1 w-5 h-5 rounded-full"
        style={{
          background: active ? "linear-gradient(145deg,#ffc873,#f2872f)" : "linear-gradient(145deg,var(--s1),var(--s2))",
          boxShadow: "var(--sh-raised-sm)",
        }}
      />
      <h5 className="font-bold text-[color:var(--tx)] text-base">{title}</h5>
      <p className={`text-sm font-semibold mt-0.5 ${active ? "text-[color:var(--acc)]" : "text-[color:var(--mut)]"}`}>{org}</p>
      <div className="mt-2.5">{children}</div>
    </div>
  );
}

const TERM: Record<AccentKey, string> = { violet: "#a99bff", peach: "#f5b971", mint: "#5fd6bd", sky: "#f4948a" };

function ProjectPreview({ project, tall = false }: { project: Project; tall?: boolean }) {
  const color = TERM[project.accent];
  const lines = project.techStack.slice(0, tall ? 5 : 3);
  return (
    <div
      className="rounded-2xl overflow-hidden font-mono"
      style={{
        background: "linear-gradient(160deg,#151c38,#0d1226)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.07), 6px 8px 18px rgba(var(--sd),0.45)",
        minHeight: tall ? 210 : 136,
      }}
    >
      <div className="flex items-center gap-1.5 px-4 py-2.5" style={{ background: "rgba(255,255,255,0.045)" }}>
        {["#ff6b6b", "#f5b971", "#5fd6bd"].map((c) => (
          <span key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
        ))}
        <span className="ml-2 text-[11px]" style={{ color: "#8b95c0" }}>
          ~/{project.id}
        </span>
        <span className="ml-auto" style={{ color }}>
          {React.cloneElement(project.icon as React.ReactElement<{ size?: number }>, { size: 18 })}
        </span>
      </div>
      <div className="px-4 py-3.5 text-[12px] leading-relaxed" style={{ color: "#c9d3ff" }}>
        <p>
          <span style={{ color }}>$</span> stack --list
        </p>
        {lines.map((t) => (
          <p key={t} style={{ color: "#9aa6d6" }}>
            <span style={{ color }}>›</span> {t}
          </p>
        ))}
        {tall && (
          <p className="mt-2" style={{ color: "#6f7aa8" }}>
            // {project.highlights[0]}
          </p>
        )}
        <p>
          <span style={{ color }}>$</span> <span className="inline-block w-1.5 h-3.5 align-middle" style={{ background: color, opacity: 0.85 }} />
        </p>
      </div>
    </div>
  );
}

function ProjectMedia({ project, tall = false }: { project: Project; tall?: boolean }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  if (failed) return <ProjectPreview project={project} tall={tall} />;
  return (
    <div className="cl-inset rounded-2xl p-1.5">
      <div ref={ref} className="rounded-xl overflow-hidden aspect-[16/10]" style={{ background: "var(--well)" }}>
        <motion.img
          src={project.image}
          alt={`${project.title} screenshot`}
          loading="lazy"
          onError={() => setFailed(true)}
          style={{ y, scale: 1.14 }}
          className="w-full h-full object-cover object-top"
        />
      </div>
    </div>
  );
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"education" | "experience" | "milestones">("education");

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(heroP, [0, 1], [1, 0.93]);
  const heroOpacity = useTransform(heroP, [0, 0.85], [1, 0.3]);
  const heroTextY = useTransform(heroP, [0, 1], [0, -70]);
  const heroPhotoY = useTransform(heroP, [0, 1], [0, -36]);

  const { scrollY } = useScroll();
  const [navHidden, setNavHidden] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setNavHidden(y > prev && y > 160 && !mobileMenuOpen);
  });

  const [askInput, setAskInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [answer, setAnswer] = useState<{ q: string; title: string; lines: string[]; projectIds?: string[]; contact?: boolean } | null>(null);
  const ask = (raw: string) => {
    const q = raw.trim();
    if (!q) return;
    const t = q.toLowerCase();
    let res: { title: string; lines: string[]; projectIds?: string[]; contact?: boolean };
    if (/(demo|live|deploy)/.test(t)) {
      const live = projectsData.filter((p) => p.link);
      res = {
        title: "Live demos",
        lines: live.map((p) => `${p.title}: ${p.subtitle}`),
        projectIds: live.map((p) => p.id),
      };
    } else if (/(project|built|build|portfolio)/.test(t)) {
      res = {
        title: "Projects",
        lines: projectsData.map((p) => `${p.title}: ${p.subtitle}`),
        projectIds: projectsData.map((p) => p.id),
      };
    } else if (/(skill|stack|tech|language|tools)/.test(t)) {
      res = { title: "Core skills", lines: skillsCategories.map((c) => `${c.title}: ${c.skills.join(", ")}`) };
    } else if (/(educat|study|college|degree|cgpa|univers|diploma|graduat)/.test(t)) {
      res = {
        title: "Education",
        lines: [
          "B.Tech in Computer Science Engineering, IKGPTU Mohali Campus. Expected graduation 2027, current CGPA 7.55.",
          "Diploma in Computer Engineering, Government Polytechnic Hamirpur. Completed 2024 with 75%.",
        ],
      };
    } else if (/(experience|train|intern|job|work)/.test(t)) {
      res = {
        title: "Experience",
        lines: [
          "Industrial Web Development Training (Ex-Trainer, Mohali): full-stack architecture, API integrations, responsive design and deployment.",
          "App Development Internship Training at Prerna-Gati Technologies: 6 weeks of software development training.",
          "Hackathons: HACK-O-OCTO and Hack-2-Hatch. Also attended a VLSI design workshop.",
        ],
      };
    } else if (/(contact|email|hire|reach|available|resume|cv|linkedin)/.test(t)) {
      res = {
        title: "Get in touch",
        lines: [`I'm open to software engineering internships. Email: ${EMAIL}`],
        contact: true,
      };
    } else {
      res = {
        title: "Try one of these",
        lines: ["I can answer about my experience, projects, skills, education, or how to reach me."],
      };
    }
    setAskInput("");
    setAnswer(null);
    setThinking(true);
    window.setTimeout(() => {
      setAnswer({ q, ...res });
      setThinking(false);
    }, 650);
  };
  const FOLLOW_UPS = [
    "Tell me about your experience",
    "What projects have you worked on?",
    "What are your core skills?",
    "Show me your live demos",
    "What's your education?",
    "How can I contact you?",
  ];

  const [activeSection, setActiveSection] = useState("home");
  useEffect(() => {
    const els = ["home", "about", "portfolio", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const selectedIndex = selectedProject ? projectsData.findIndex((p) => p.id === selectedProject.id) : -1;
  const goToProject = (dir: 1 | -1) => {
    if (selectedIndex < 0) return;
    const next = (selectedIndex + dir + projectsData.length) % projectsData.length;
    setSelectedProject(projectsData[next]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
      if (!selectedProject) return;
      if (e.key === "ArrowRight") goToProject(1);
      if (e.key === "ArrowLeft") goToProject(-1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject, selectedIndex]);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const q = searchQuery.trim().toLowerCase();
  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(q) ||
      project.subtitle.toLowerCase().includes(q) ||
      project.techStack.some((tech) => tech.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const liveCount = projectsData.filter((p) => p.link).length;
  const categoryCount = (cat: ProjectCategory) =>
    cat === "All" ? projectsData.length : projectsData.filter((p) => p.category === cat).length;

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About & skills" },
    { href: "#portfolio", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <main className="cl-root cl-lav cl-dots min-h-screen selection:bg-[#ffb454] selection:text-[#1b1204] pb-10 relative overflow-x-hidden">
      <style>{clayStyles}</style>

      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress, transformOrigin: "0% 50%", background: "linear-gradient(90deg,#ffc873,#f2872f)" }}
        className="fixed top-0 left-0 right-0 h-1 z-[70]"
      />

      {/* --- Toast --- */}
      <AnimatePresence>
        {copiedEmail && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="cl-raised fixed top-6 left-1/2 z-[60] text-[color:var(--tx)] px-5 py-3 rounded-2xl flex items-center gap-2.5 text-sm font-semibold"
          >
            <Check size={16} className="text-[color:var(--a-teal)]" /> Email copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Navigation --- */}
      <motion.div
        animate={{ y: navHidden ? "-130%" : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="sticky top-0 z-40 px-4 sm:px-6 lg:px-12 pt-4"
      >
        <nav className="cl-raised max-w-7xl mx-auto rounded-3xl px-5 sm:px-7 py-3.5 flex justify-between items-center">
          <a href="#home" className="cl-display text-lg sm:text-xl font-bold tracking-tight text-[color:var(--tx)] flex items-center gap-2.5">
            <span className="cl-primary w-9 h-9 rounded-xl grid place-items-center">
              <Terminal size={18} />
            </span>
            <span>
              Nikhil <span className="text-[color:var(--acc)]">Moudgil</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1 text-sm font-semibold text-[color:var(--mut)]">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                aria-current={activeSection === l.href.slice(1) ? "page" : undefined}
                className={`px-4 py-2 rounded-xl transition-colors ${
                  activeSection === l.href.slice(1) ? "cl-inset-sm text-[color:var(--acc)]" : "hover:text-[color:var(--tx)]"
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="/nikhilcv.pdf"
              download="nikhilcv.pdf"
              className="cl-btn cl-raised-sm text-sm font-semibold text-[color:var(--tx2)] hover:text-[color:var(--tx)] flex items-center gap-2 px-4 py-2.5 rounded-xl"
            >
              <Download size={15} /> CV
            </a>
            <a href={`mailto:${EMAIL}`} className="cl-btn cl-primary px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-1.5">
              Hire me <ArrowUpRight size={16} />
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="cl-btn cl-raised-sm md:hidden text-[color:var(--tx)] p-2.5 rounded-xl"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="cl-raised md:hidden max-w-7xl mx-auto mt-3 rounded-3xl p-3 flex flex-col"
            >
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-2xl text-sm font-semibold text-[color:var(--tx2)] hover:bg-[color:var(--well)]"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={`mailto:${EMAIL}`}
                className="cl-btn cl-primary mt-2 px-5 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2"
              >
                Hire me <ArrowUpRight size={16} />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* --- Hero --- */}
      <div ref={heroRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-8 pb-8 relative z-10">
      <motion.section
        style={{ scale: heroScale, opacity: heroOpacity, transformOrigin: "50% 0%" }}
        id="home"
        className="cl-slab relative isolate overflow-hidden scroll-mt-24 rounded-[2rem] sm:rounded-[2.75rem] px-5 sm:px-10 lg:px-14 py-10 sm:py-14 lg:py-20 flex flex-col-reverse md:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-10 lg:gap-12"
      >
        {/* Isometric desk render — z-0, behind text (z-20) and photo (z-30) */}
        <HeroDeskScene />

        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.12 }}
          style={{ y: heroTextY }}
          className="flex-1 text-left space-y-4 sm:space-y-5 md:space-y-6 relative z-20"
        >
          <motion.div
            variants={fadeUpVariant}
            className="cl-inset-sm inline-flex items-center gap-3 px-4 py-2 rounded-full text-[color:var(--tx2)] font-semibold text-xs sm:text-[13px]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--a-teal)] opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[color:var(--a-teal)]"></span>
            </span>
            Available for software engineering internships
          </motion.div>

          <motion.div variants={fadeUpVariant}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[color:var(--tx)] tracking-tight leading-[1.02]">
              Nikhil Moudgil
            </h1>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[color:var(--acc)] leading-tight mt-3">
              Full-Stack & AI Engineer
            </h2>
          </motion.div>

          <motion.p variants={fadeUpVariant} className="text-[color:var(--mut)] text-sm sm:text-base max-w-xl leading-relaxed pt-1">
            Final year Computer Science student building scalable MERN stack applications, microservices, and modern AI/RAG pipelines.
            Focused on clean architecture, optimized database queries, and rapid execution.
          </motion.p>

          <motion.div variants={fadeUpVariant} className="flex items-center gap-4 pt-2">
            <a
              href="https://github.com/NikhilMoudgil"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="cl-btn cl-raised-sm w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-[color:var(--mut)] hover:text-[color:var(--acc)]"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/nikhil-moudgil-995408270/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="cl-btn cl-raised-sm w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-[color:var(--mut)] hover:text-[color:var(--acc)]"
            >
              <FaLinkedin size={20} />
            </a>
            <button
              onClick={handleCopyEmail}
              aria-label="Copy email"
              className="cl-btn cl-raised-sm w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-[color:var(--mut)] hover:text-[color:var(--acc)]"
            >
              <FaEnvelope size={20} />
            </button>
          </motion.div>

          <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row flex-wrap items-center gap-4 pt-2 sm:pt-4 w-full sm:w-auto">
            <a
              href={`mailto:${EMAIL}`}
              className="cl-btn cl-primary font-bold px-7 sm:px-9 py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Hire me <ArrowUpRight size={18} />
            </a>
            <a
              href="/nikhilcv.pdf"
              download="nikhilcv.pdf"
              className="cl-btn cl-raised-sm text-[color:var(--tx2)] hover:text-[color:var(--tx)] font-semibold px-7 py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm w-full sm:w-auto"
            >
              <Download size={16} /> Download CV
            </a>
          </motion.div>
        </motion.div>

        {/* Right: profile photo in a clay frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{ y: heroPhotoY }}
          className="flex-1 flex flex-col items-center justify-center w-full max-w-[250px] sm:max-w-[280px] md:max-w-[300px] lg:max-w-[350px] relative z-30"
        >
          <Card3DTilt intensity={10} scaleOnHover={true}>
            <div className="cl-raised rounded-[2.25rem] p-3 w-full group cursor-pointer">
              <div className="w-full aspect-[4/5] rounded-[1.7rem] overflow-hidden relative" style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)" }}>
                <img
                  src="/Nikhil.png"
                  alt="Nikhil Moudgil"
                  className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/90 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10">
                  <div>
                    <p className="text-white font-bold text-lg">Nikhil Moudgil</p>
                    <p className="text-[color:var(--tx2)] text-xs font-semibold mt-0.5">CS undergraduate</p>
                  </div>
                  <div className="cl-primary w-10 h-10 rounded-full grid place-items-center">
                    <Terminal size={18} />
                  </div>
                </div>
              </div>
            </div>
          </Card3DTilt>
        </motion.div>

        <div className="absolute bottom-4 inset-x-0 flex justify-center z-30 pointer-events-none">
          <motion.a
            href="#ask"
            aria-label="Scroll down"
            className="pointer-events-auto text-[color:var(--mut)] hover:text-[color:var(--acc)]"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ChevronDown size={24} />
          </motion.a>
        </div>
      </motion.section>
      </div>

      {/* --- Ask me --- */}
      <div id="ask" className="scroll-mt-24 max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-14 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
        >
          <h3 className="text-center text-xl sm:text-2xl font-bold text-[color:var(--tx)] mb-1">Ask about my experience, projects or skills</h3>
          <p className="text-center text-xs text-[color:var(--faint)] mb-5">Quick answers pulled straight from this portfolio.</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(askInput);
            }}
            className="cl-inset rounded-full flex items-center gap-3 pl-6 pr-2 py-2"
          >
            <input
              value={askInput}
              onChange={(e) => setAskInput(e.target.value)}
              aria-label="Ask a question"
              placeholder="Ask about my experience, projects, or skills..."
              className="flex-1 min-w-0 bg-transparent text-sm py-2 text-[color:var(--tx)] placeholder-[color:var(--faint)] focus:outline-none"
            />
            <button type="submit" aria-label="Send question" className="cl-btn cl-primary w-11 h-11 rounded-full grid place-items-center shrink-0">
              <Send size={17} />
            </button>
          </form>

          <div className="flex flex-wrap justify-center gap-3 mt-5">
            {["Tell me about your experience", "What projects have you worked on?", "What are your core skills?"].map((c) => (
              <button
                key={c}
                onClick={() => ask(c)}
                className="cl-btn cl-raised-sm px-4 py-2 rounded-full text-xs font-semibold text-[color:var(--tx2)] hover:text-[color:var(--acc)]"
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-8">
            <AnimatePresence mode="wait">
              {thinking && (
                <motion.div
                  key="thinking"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3"
                >
                  <AskAvatar />
                  <div className="cl-inset-sm rounded-full px-4 py-3 flex gap-1.5" aria-label="Typing">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-2 h-2 rounded-full"
                        style={{ background: "var(--acc)" }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.12 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {answer && !thinking && (
                <motion.div
                  key={answer.q + answer.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="flex items-start gap-3 sm:gap-4"
                  aria-live="polite"
                >
                  <AskAvatar />
                  <div className="cl-raised rounded-3xl p-5 sm:p-6 text-left flex-1 min-w-0">
                    <p className="text-xs text-[color:var(--faint)] mb-1">You asked: {answer.q}</p>
                    <h4 className="text-lg font-bold text-[color:var(--acc)] mb-3">{answer.title}</h4>
                    <ul className="space-y-2.5">
                      {answer.lines.map((l) => (
                        <li key={l} className="flex items-start gap-2.5 text-sm text-[color:var(--tx2)] leading-relaxed">
                          <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[color:var(--acc)]" /> {l}
                        </li>
                      ))}
                    </ul>
                    {answer.projectIds && (
                      <div className="flex flex-wrap gap-2.5 mt-5">
                        {answer.projectIds.map((id) => {
                          const proj = projectsData.find((p) => p.id === id)!;
                          return (
                            <button
                              key={id}
                              onClick={() => setSelectedProject(proj)}
                              className="cl-btn cl-raised-sm px-3.5 py-2 rounded-xl text-xs font-semibold text-[color:var(--tx2)] hover:text-[color:var(--acc)] flex items-center gap-1.5"
                            >
                              {proj.title} <ArrowUpRight size={13} />
                            </button>
                          );
                        })}
                      </div>
                    )}
                    {answer.contact && (
                      <div className="flex flex-wrap gap-3 mt-5">
                        <a href={`mailto:${EMAIL}`} className="cl-btn cl-primary px-5 py-2.5 rounded-xl text-sm font-bold">Email me</a>
                        <a href="/nikhilcv.pdf" download="nikhilcv.pdf" className="cl-btn cl-raised-sm px-5 py-2.5 rounded-xl text-sm font-semibold text-[color:var(--tx2)]">Download CV</a>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2.5 mt-6 pt-5 border-t border-[color:var(--line)]">
                      {FOLLOW_UPS.filter((f) => !f.toLowerCase().includes(answer.title.toLowerCase().split(" ")[0])).slice(0, 3).map((f) => (
                        <button
                          key={f}
                          onClick={() => ask(f)}
                          className="cl-btn cl-raised-sm px-3.5 py-2 rounded-full text-xs font-semibold text-[color:var(--tx2)] hover:text-[color:var(--acc)]"
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* --- Quick facts --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-20 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {[
            { to: projectsData.length, dec: 0, from: 0, l: "Projects built" },
            { to: liveCount, dec: 0, from: 0, l: "Live demos you can open" },
            { to: 7.55, dec: 2, from: 0, l: "Current CGPA, B.Tech CSE" },
            { to: 2027, dec: 0, from: 2015, l: "Graduation year" },
          ].map((f, i) => (
            <motion.div
              key={f.l}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.09, duration: 0.5 }}
              className="cl-raised-sm rounded-2xl px-5 py-4"
            >
              <p className="text-2xl sm:text-3xl font-bold text-[color:var(--acc)]">
                <CountUp to={f.to} decimals={f.dec} from={f.from} />
              </p>
              <p className="text-xs sm:text-sm text-[color:var(--mut)] mt-1">{f.l}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- About & skills --- */}
      <div className="cl-sky cl-band cl-dots">
      <section id="about" className="scroll-mt-24 max-w-7xl mx-auto px-6 lg:px-12 py-20 relative z-10">

        <div className="relative z-10">
          <div className="mb-12">
            <SectionHeading
              icon={<Sparkles size={24} />}
              title="Capabilities & background"
              subtitle="Technical skills, academic qualifications, and hands-on development experience."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-14">
            {skillsCategories.map((cat, idx) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="cl-raised cl-card p-7 rounded-[1.75rem] h-full"
              >
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="cl-inset-sm w-11 h-11 rounded-2xl grid place-items-center" style={{ color: ACCENTS[cat.accent] }}>
                    {cat.icon}
                  </div>
                  <h4 className="font-bold text-[color:var(--tx)] text-base">{cat.title}</h4>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="cl-inset-sm font-mono px-3.5 py-1.5 text-[color:var(--tx2)] rounded-xl text-xs font-semibold hover:text-[color:var(--tx)] transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tabbed education / experience / milestones */}
          <div className="cl-raised rounded-[2rem] p-5 sm:p-8">
            <div className="cl-inset rounded-2xl p-2 flex gap-2 mb-9 overflow-x-auto" role="tablist">
              {[
                { key: "education", label: "Education", icon: <GraduationCap size={16} /> },
                { key: "experience", label: "Training & experience", icon: <Briefcase size={16} /> },
                { key: "milestones", label: "Milestones & hackathons", icon: <Rocket size={16} /> },
              ].map((t) => (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={activeTab === t.key}
                  onClick={() => setActiveTab(t.key as typeof activeTab)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-[13px] transition-all whitespace-nowrap ${
                    activeTab === t.key ? "cl-tab-on" : "text-[color:var(--mut)] hover:text-[color:var(--tx)]"
                  }`}
                >
                  {t.icon} {t.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "education" && (
                <motion.div key="edu" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="relative space-y-9">
                  <span className="cl-groove absolute left-[9px] top-2 bottom-2 w-1.5 rounded-full overflow-hidden">
                    <motion.span
                      className="block w-full h-full origin-top"
                      style={{ background: "linear-gradient(#ffc873,#f2872f)" }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </span>
                  <TimelineItem active title="B.Tech in Computer Science Engineering" org="IKGPTU Mohali Campus">
                    <div className="flex flex-wrap gap-2.5 text-xs">
                      <span className="cl-inset-sm px-3 py-1.5 rounded-lg text-[color:var(--tx2)] font-semibold">Expected graduation: 2027</span>
                      <span className="cl-inset-sm px-3 py-1.5 rounded-lg text-[color:var(--acc)] font-bold">Current CGPA: 7.55</span>
                    </div>
                  </TimelineItem>
                  <TimelineItem title="Diploma in Computer Engineering" org="Government Polytechnic Hamirpur">
                    <div className="flex flex-wrap gap-2.5 text-xs">
                      <span className="cl-inset-sm px-3 py-1.5 rounded-lg text-[color:var(--tx2)] font-semibold">Completed 2024</span>
                      <span className="cl-inset-sm px-3 py-1.5 rounded-lg text-[color:var(--tx2)] font-semibold">Score: 75%</span>
                    </div>
                  </TimelineItem>
                </motion.div>
              )}

              {activeTab === "experience" && (
                <motion.div key="exp" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="relative space-y-9">
                  <span className="cl-groove absolute left-[9px] top-2 bottom-2 w-1.5 rounded-full overflow-hidden">
                    <motion.span
                      className="block w-full h-full origin-top"
                      style={{ background: "linear-gradient(#ffc873,#f2872f)" }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </span>
                  <TimelineItem active title="Industrial Web Development Training" org="Ex-Trainer, Mohali">
                    <p className="text-sm text-[color:var(--mut)] leading-relaxed max-w-2xl">
                      Hands-on industrial training focused on full-stack web architecture, API integrations, responsive design patterns, and cloud deployment standard procedures.
                    </p>
                  </TimelineItem>
                  <TimelineItem title="App Development Internship Training" org="Prerna-Gati Technologies">
                    <p className="text-sm text-[color:var(--mut)] leading-relaxed max-w-2xl">
                      6 weeks of hands-on software development training covering modular client interface workflows and API synchronization.
                    </p>
                  </TimelineItem>
                </motion.div>
              )}

              {activeTab === "milestones" && (
                <motion.div key="mile" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {[
                    { t: "HACK-O-OCTO competitor", d: "Built full-stack software solutions under active competition constraints.", c: "violet" as AccentKey },
                    { t: "Hack-2-Hatch participant", d: "Designed dynamic pitching platforms and prototype architectures.", c: "peach" as AccentKey },
                    { t: "VLSI design workshop", d: "Attended technical workshops exploring low-level hardware system design concepts.", c: "mint" as AccentKey },
                  ].map((m) => (
                    <div key={m.t} className="cl-inset rounded-2xl p-5">
                      <span className="block w-8 h-1.5 rounded-full mb-4" style={{ background: ACCENTS[m.c] }} />
                      <h5 className="font-bold text-[color:var(--tx)] text-sm">{m.t}</h5>
                      <p className="text-xs text-[color:var(--mut)] mt-2 leading-relaxed">{m.d}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      </div>

      {/* --- Projects + contact --- */}
      <div className="cl-mint cl-band cl-dots">
      <section id="portfolio" className="scroll-mt-24 max-w-7xl mx-auto px-6 lg:px-12 py-20 relative z-10">

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-8">
            <div>
              <SectionHeading
                icon={<Layers size={24} />}
                title="Projects"
                subtitle={`${projectsData.length} projects across AI tooling, full-stack platforms and database systems, ${liveCount} with live demos. Open any card for the details.`}
              />
            </div>

            <div className="relative w-full lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--faint)]" size={16} />
              <input
                type="text"
                aria-label="Search projects"
                placeholder="Search by name or tech, e.g. React"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="cl-inset w-full rounded-2xl pl-11 pr-10 py-3.5 text-sm text-[color:var(--tx)] placeholder-[color:var(--faint)] focus:outline-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} aria-label="Clear search" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[color:var(--faint)] hover:text-[color:var(--tx)]">
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Category filters with counts */}
          <div className="flex flex-wrap gap-3 mb-10">
            {CATEGORIES.map((cat) => {
              const on = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={on}
                  className={`cl-btn px-5 py-2.5 rounded-2xl text-[13px] font-bold flex items-center gap-2.5 ${
                    on ? "cl-tab-on" : "cl-raised-sm text-[color:var(--mut)] hover:text-[color:var(--tx)]"
                  }`}
                >
                  {cat}
                  <span className={`text-[11px] px-2 py-0.5 rounded-lg ${on ? "bg-black/15 text-[#1b1204]" : "cl-inset-sm text-[color:var(--mut)]"}`}>
                    {categoryCount(cat)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => {
                const spotlight = index === 0 && selectedCategory === "All" && !q;
                const color = ACCENTS[project.accent];
                return (
                  <div key={project.id} className={spotlight ? "md:col-span-2 lg:col-span-2" : ""}>
                    <div className="h-full">
                      <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.07 }}
                        role="button"
                        tabIndex={0}
                        aria-label={`Open details for ${project.title}`}
                        onClick={() => setSelectedProject(project)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelectedProject(project);
                          }
                        }}
                        className={`cl-raised cl-card rounded-[1.9rem] h-full flex group cursor-pointer p-5 sm:p-6 gap-6 ${
                          spotlight ? "flex-col md:flex-row" : "flex-col"
                        }`}
                      >
                        <div className={spotlight ? "md:w-[44%] shrink-0" : ""}>
                          <ProjectMedia project={project} tall={spotlight} />
                        </div>

                        <div className="flex flex-col flex-grow px-1 pb-1">
                          <div className="flex items-center gap-2 mb-3 flex-wrap">
                            {project.link ? (
                              <span className="cl-inset-sm px-2.5 py-1 rounded-lg text-[11px] font-bold text-[color:var(--a-teal)] flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--a-teal)]" /> Live demo
                              </span>
                            ) : (
                              <span className="cl-inset-sm px-2.5 py-1 rounded-lg text-[11px] font-bold text-[color:var(--mut)]">Source on GitHub</span>
                            )}
                            {project.featured && (
                              <span className="cl-inset-sm px-2.5 py-1 rounded-lg text-[11px] font-bold" style={{ color }}>
                                Featured
                              </span>
                            )}
                          </div>

                          <h4 className="text-xl sm:text-2xl font-bold text-[color:var(--tx)] mb-1 tracking-tight">{project.title}</h4>
                          <p className="text-sm font-semibold mb-3" style={{ color }}>
                            {project.subtitle}
                          </p>
                          <p className="text-[color:var(--mut)] text-sm mb-5 leading-relaxed line-clamp-3">{project.description}</p>

                          {spotlight && (
                            <ul className="space-y-2 mb-5">
                              {project.highlights.map((h) => (
                                <li key={h} className="flex items-start gap-2.5 text-sm text-[color:var(--tx2)]">
                                  <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color }} /> {h}
                                </li>
                              ))}
                            </ul>
                          )}

                          <div className="flex flex-wrap gap-2 mb-5 flex-grow content-start">
                            {project.techStack.slice(0, spotlight ? 5 : 3).map((tech) => (
                              <span key={tech} className="cl-inset-sm font-mono text-[11px] font-medium px-3 py-1.5 text-[color:var(--tx2)] rounded-lg">
                                {tech}
                              </span>
                            ))}
                            {!spotlight && project.techStack.length > 3 && (
                              <span className="cl-inset-sm text-[11px] font-bold px-2.5 py-1.5 text-[color:var(--acc)] rounded-lg">
                                +{project.techStack.length - 3}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-auto">
                            <span className="text-sm font-bold text-[color:var(--tx)] flex items-center gap-2 group-hover:gap-3 transition-all" style={{ color }}>
                              View details <ArrowRight size={16} />
                            </span>
                            <div className="flex items-center gap-2.5">
                              {project.link && (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  aria-label={`${project.title} live demo`}
                                  className="cl-btn cl-raised-sm w-10 h-10 rounded-xl grid place-items-center text-[color:var(--mut)] hover:text-[color:var(--a-teal)]"
                                >
                                  <ExternalLink size={16} />
                                </a>
                              )}
                              {project.github && (
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  aria-label={`${project.title} on GitHub`}
                                  className="cl-btn cl-raised-sm w-10 h-10 rounded-xl grid place-items-center text-[color:var(--mut)] hover:text-[color:var(--acc)]"
                                >
                                  <FaGithub size={16} />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full cl-inset rounded-3xl py-14 px-6 text-center">
                <p className="text-[color:var(--tx)] font-bold mb-1">No projects match “{searchQuery}”</p>
                <p className="text-[color:var(--mut)] text-sm mb-5">Try a technology like React or SQL, or clear the filters.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="cl-btn cl-primary px-6 py-2.5 rounded-xl text-sm font-bold"
                >
                  Show all projects
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- Contact --- */}
      <section id="contact" className="scroll-mt-24 max-w-7xl mx-auto px-6 lg:px-12 pt-10 pb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="cl-slab rounded-[2.25rem] p-8 sm:p-12 relative overflow-hidden"
        >
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[color:var(--tx)] leading-tight">
              Looking for an intern who ships full-stack and AI features?
            </h3>
            <p className="text-[color:var(--mut)] text-sm sm:text-base mt-4 leading-relaxed">
              I graduate in 2027 and I'm open to software engineering internships. Send a note, or grab my CV and take a look at the projects above.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-8">
              <a href={`mailto:${EMAIL}`} className="cl-btn cl-primary px-8 py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2">
                Email me <ArrowUpRight size={18} />
              </a>
              <button
                onClick={handleCopyEmail}
                className="cl-btn cl-raised-sm text-[color:var(--tx2)] hover:text-[color:var(--tx)] px-7 py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Copy size={16} /> Copy email
              </button>
              <a
                href="https://www.linkedin.com/in/nikhil-moudgil-995408270/"
                target="_blank"
                rel="noreferrer"
                className="cl-btn cl-raised-sm text-[color:var(--tx2)] hover:text-[color:var(--tx)] px-7 py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2"
              >
                <FaLinkedin size={16} /> LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[color:var(--faint)]">
          <p>© {new Date().getFullYear()} Nikhil Moudgil</p>
          <div className="flex items-center gap-5 font-semibold text-[color:var(--mut)]">
            <a href="https://github.com/NikhilMoudgil" target="_blank" rel="noreferrer" className="hover:text-[color:var(--tx)] flex items-center gap-1.5"><FaGithub size={14} /> GitHub</a>
            <a href="https://www.linkedin.com/in/nikhil-moudgil-995408270/" target="_blank" rel="noreferrer" className="hover:text-[color:var(--tx)] flex items-center gap-1.5"><FaLinkedin size={14} /> LinkedIn</a>
            <a href={`mailto:${EMAIL}`} className="hover:text-[color:var(--tx)] flex items-center gap-1.5"><FaEnvelope size={14} /> Email</a>
            <a href="/nikhilcv.pdf" download="nikhilcv.pdf" className="hover:text-[color:var(--tx)]">CV</a>
          </div>
        </div>
      </section>

      </div>

      {/* --- Project details modal --- */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 bg-[#050a18]/75 flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              key={selectedProject.id}
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={selectedProject.title}
              className="cl-raised rounded-[2rem] max-w-2xl w-full p-6 sm:p-9 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close"
                className="cl-btn cl-raised-sm absolute top-5 right-5 p-2.5 rounded-xl text-[color:var(--mut)] hover:text-[color:var(--tx)]"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-4 mb-6 pr-12">
                <div
                  className="cl-inset-sm w-14 h-14 rounded-2xl grid place-items-center shrink-0"
                  style={{ color: ACCENTS[selectedProject.accent] }}
                >
                  {selectedProject.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[color:var(--tx)] tracking-tight">{selectedProject.title}</h3>
                  <p className="text-sm font-semibold" style={{ color: ACCENTS[selectedProject.accent] }}>
                    {selectedProject.subtitle}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <ProjectMedia project={selectedProject} tall />
              </div>

              <p className="text-[color:var(--tx2)] text-sm leading-relaxed mb-6">{selectedProject.longDescription}</p>

              <div className="cl-inset rounded-2xl p-5 mb-6">
                <h5 className="text-sm font-bold text-[color:var(--tx)] mb-3">What it does</h5>
                <ul className="space-y-2.5">
                  {selectedProject.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm text-[color:var(--tx2)]">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: ACCENTS[selectedProject.accent] }} /> {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-7">
                <h5 className="text-sm font-bold text-[color:var(--tx)] mb-3">Built with</h5>
                <div className="flex flex-wrap gap-2.5">
                  {selectedProject.techStack.map((tech) => (
                    <span key={tech} className="cl-inset-sm font-mono px-3.5 py-1.5 text-[color:var(--tx2)] text-xs rounded-xl font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-7">
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noreferrer"
                    className="cl-btn cl-primary font-bold px-6 py-3 rounded-2xl text-sm flex items-center gap-2"
                  >
                    Open live demo <ExternalLink size={15} />
                  </a>
                )}
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="cl-btn cl-raised-sm text-[color:var(--tx2)] hover:text-[color:var(--tx)] font-semibold px-6 py-3 rounded-2xl text-sm flex items-center gap-2"
                  >
                    View on GitHub <FaGithub size={15} />
                  </a>
                )}
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-[color:var(--line)]">
                <button
                  onClick={() => goToProject(-1)}
                  className="cl-btn cl-raised-sm px-4 py-2.5 rounded-xl text-xs font-bold text-[color:var(--mut)] hover:text-[color:var(--tx)] flex items-center gap-2"
                >
                  <ArrowLeft size={14} /> Previous
                </button>
                <span className="text-xs font-semibold text-[color:var(--faint)]">
                  {selectedIndex + 1} of {projectsData.length}
                </span>
                <button
                  onClick={() => goToProject(1)}
                  className="cl-btn cl-raised-sm px-4 py-2.5 rounded-xl text-xs font-bold text-[color:var(--mut)] hover:text-[color:var(--tx)] flex items-center gap-2"
                >
                  Next <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}