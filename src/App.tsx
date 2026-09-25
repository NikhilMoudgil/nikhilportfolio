import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  Mail,
  ExternalLink,
  Code2,
  Database,
  Users,
  Terminal,
  X,
  ArrowUpRight,
  Globe,
  GitBranch,
  Download,
  Cpu,
  GraduationCap,
  BrainCircuit,
  Rocket,
  Search,
  Check,
  Menu,
  Briefcase,
  Sparkles,
  Layers,
} from "lucide-react";

import HeroDeskScene from "./components/HeroDeskScene";

// --- 3D Tilt Wrapper for Image and Cards (No heavy 3D models needed) ---
function Card3DTilt({ children, intensity = 15, scaleOnHover = false }: { children: React.ReactNode, intensity?: number, scaleOnHover?: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${intensity}deg`, `-${intensity}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${intensity}deg`, `${intensity}deg`]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={scaleOnHover ? { scale: 1.02 } : {}}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="w-full h-full perspective-1000"
    >
      {children}
    </motion.div>
  );
}

// --- Types & Data Restored ---
type ProjectCategory = "All" | "AI / RAG" | "Full Stack" | "Systems / SQL";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  techStack: string[];
  category: ProjectCategory;
  icon: React.ReactNode;
  link?: string;
  github?: string;
  image?: string;
  featured?: boolean;
}

const projectsData: Project[] = [
  {
    id: "repomind",
    title: "Repomind",
    subtitle: "AI-Powered Repository Analyzer",
    category: "AI / RAG",
    featured: true,
    description: "Intelligent developer tool that analyzes GitHub repositories to provide architectural summaries, codebase insights, and documentation generation.",
    longDescription: "Repomind leverages AI to decode complex codebases. It fetches repository data, processes file trees, and outputs comprehensive architectural summaries to help new contributors onboard rapidly.",
    techStack: ["Next.js", "Python", "FastAPI", "OpenAI API", "Tailwind CSS"],
    icon: <Cpu size={24} />,
    github: "https://github.com/NikhilMoudgil",
  },
  {
    id: "design-forge",
    title: "Design Forge",
    subtitle: "Dynamic UI/UX Generator",
    category: "Full Stack",
    featured: true,
    description: "A creative utility platform for developers to rapidly prototype and generate accessible, highly-customizable UI components.",
    longDescription: "Design Forge accelerates frontend workflows by offering a parameter-based component generation interface, exporting clean, production-ready React and Tailwind code snippets.",
    techStack: ["React", "TypeScript", "Framer Motion", "Vite", "Tailwind"],
    icon: <Code2 size={24} />,
    link: "https://designforge-delta.vercel.app/",
    github: "https://github.com/NikhilMoudgil",
  },
  {
    id: "edunexus",
    title: "EduNexus",
    subtitle: "API-Based Roadmap Generating Platform",
    category: "Full Stack",
    featured: true,
    description: "An API-based platform where users generate dynamic roadmaps based on their field of interest, complete with an interactive community.",
    longDescription: "EduNexus solves static learning curves by allowing users to input personalized data fields to instantly fetch dynamic curriculum roadmaps. Built with robust API routing and an integrated peer community module.",
    techStack: ["Next.js", "React", "TypeScript", "REST APIs", "Node.js"],
    icon: <Terminal size={24} />,
    link: "https://edu-nexus-teal.vercel.app",
    github: "https://github.com/NikhilMoudgil",
  },
  {
    id: "venture-bridge",
    title: "Venture-Bridge",
    subtitle: "Entrepreneur & Investor Ecosystem",
    category: "Full Stack",
    description: "A specialized platform for entrepreneurs to pitch ideas and investors to discover inventions and interact seamlessly.",
    longDescription: "Venture-Bridge bridges the capital and execution gap. It establishes a secure ecosystem where startup founders pitch concepts, and venture capital stakeholders inspect and engage directly.",
    techStack: ["MongoDB", "Express", "React", "Node.js", "JWT Auth"],
    icon: <Users size={24} />,
    link: "https://venture-bridge-ruby.vercel.app",
    github: "https://github.com/NikhilMoudgil",
  },
  {
    id: "airisto",
    title: "Airisto",
    subtitle: "DBMS-Based AC Services Marketplace",
    category: "Systems / SQL",
    description: "An administrative marketplace built using HTML, CSS, and JavaScript, powered by backend DBMS logic for service management.",
    longDescription: "Airisto streamlines air-conditioning service operations. It features administrative control portals and a consumer marketplace heavily managed via structured relational database systems.",
    techStack: ["HTML5", "CSS3", "JavaScript", "SQL", "Relational Database"],
    icon: <Database size={24} />,
    github: "https://github.com/NikhilMoudgil",
  },
];

const skillsCategories = [
  {
    title: "AI & Backend Architecture",
    icon: <BrainCircuit className="text-indigo-400" size={20} />,
    skills: ["FastAPI", "RAG Pipelines", "LLMs & Prompt Eng", "Python", "Node.js", "Express.js", "REST APIs"],
  },
  {
    title: "Frontend Engineering",
    icon: <Code2 className="text-indigo-400" size={20} />,
    skills: ["Next.js", "React", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "Framer Motion", "Redux Toolkit"],
  },
  {
    title: "Database & DevOps",
    icon: <Database className="text-indigo-400" size={20} />,
    skills: ["Docker", "MongoDB", "SQL / PostgreSQL", "Microservices", "Git / GitHub", "Vercel / Render"],
  },
];

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"education" | "experience" | "milestones">("education");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("nikhilmoudgil799@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <main className="min-h-screen bg-[#07090e] text-gray-100 font-mono selection:bg-indigo-500 selection:text-white pb-24 relative overflow-x-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/10 blur-[180px] pointer-events-none rounded-full -z-10" />
      <div className="absolute top-[40%] -right-40 w-[600px] h-[600px] bg-blue-600/10 blur-[200px] pointer-events-none rounded-full -z-10" />
      <div className="absolute bottom-10 left-0 w-[600px] h-[600px] bg-purple-600/10 blur-[200px] pointer-events-none rounded-full -z-10" />

      {/* --- Toast Notification --- */}
      <AnimatePresence>
        {copiedEmail && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-6 left-1/2 z-50 bg-indigo-600 text-white px-5 py-2.5 rounded-full shadow-xl flex items-center gap-2 text-xs font-bold border border-indigo-400/30"
          >
            <Check size={16} /> Email copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Navigation Bar --- */}
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex justify-between items-center relative z-30">
        <a href="#home" className="text-2xl font-extrabold tracking-widest text-white hover:text-indigo-400 transition-colors flex items-center gap-2">
          <Terminal className="text-indigo-500" size={24} />
          <span>NIKHIL<span className="text-indigo-500">MOUDGIL</span></span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#home" className="hover:text-white transition-colors">Home</a>
          <a href="#about" className="hover:text-white transition-colors">About & Skills</a>
          <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <button onClick={handleCopyEmail} className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 border border-gray-800 hover:border-gray-700 px-3 py-2 rounded-lg bg-gray-900/50">
            <Mail size={14} /> nikhilmoudgil799@gmail.com
          </button>
          <a href="mailto:nikhilmoudgil799@gmail.com" className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg font-bold transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] text-sm flex items-center gap-1.5">
            Hire Me <ArrowUpRight size={16} />
          </a>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-300 hover:text-white p-2 rounded-lg bg-gray-900 border border-gray-800">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* --- Hero Section --- */}
      <section id="home" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 md:py-16 lg:pt-10 lg:pb-20 flex flex-col-reverse md:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-10 lg:gap-12 relative z-10">
        {/* Isometric desk render — sits at z-0, behind the text (z-20) and photo (z-30) */}
        <HeroDeskScene />

        <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.12 }} className="flex-1 text-left space-y-4 sm:space-y-5 md:space-y-6 relative z-20">
          <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold uppercase tracking-wider text-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
            </span>
            Available for Software Engineering Internships
          </motion.div>

          <motion.div variants={fadeUpVariant}>
            <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight leading-none">
              Nikhil Moudgil
            </h1>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400 leading-tight mt-2">
              Full-Stack & AI Engineer
            </h2>
          </motion.div>

          <motion.p variants={fadeUpVariant} className="text-gray-400 text-sm sm:text-base max-w-xl leading-relaxed pt-2">
            Final year Computer Science student building scalable MERN stack applications, microservices, and modern AI/RAG pipelines. Focused on clean architecture, optimized database queries, and rapid execution.
          </motion.p>

          {/* Social Links */}
          <motion.div variants={fadeUpVariant} className="flex items-center gap-3 sm:gap-4 pt-2">
            <a href="https://github.com/NikhilMoudgil" target="_blank" rel="noreferrer" className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-gray-800 bg-gray-900/60 flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all shadow-md group">
              <GitBranch size={16} className="sm:block group-hover:rotate-12 transition-transform" />
            </a>
            <a href="https://www.linkedin.com/in/nikhil-moudgil-995408270/" target="_blank" rel="noreferrer" className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-gray-800 bg-gray-900/60 flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all shadow-md group">
              <Globe size={16} className="sm:block group-hover:rotate-12 transition-transform" />
            </a>
            <button onClick={handleCopyEmail} className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-gray-800 bg-gray-900/60 flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all shadow-md">
              <Mail size={18} />
            </button>
          </motion.div>

          <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4 pt-2 sm:pt-4 w-full sm:w-auto">
            <a href="mailto:nikhilmoudgil799@gmail.com" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(79,70,229,0.35)] text-sm flex items-center justify-center gap-2 w-full sm:w-auto">
              Hire Me <ArrowUpRight size={18} />
            </a>
            <a href="/nikhilcv.pdf" download="nikhilcv.pdf" className="border border-gray-700 hover:border-indigo-400 bg-gray-900/40 hover:bg-gray-800 text-gray-300 hover:text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm backdrop-blur-sm w-full sm:w-auto">
              <Download size={16} /> Download CV
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side: Interactive 3D Image Display (Perfect Place) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.6 }} 
          className="flex-1 flex flex-col items-center justify-center w-full max-w-[250px] sm:max-w-[280px] md:max-w-[300px] lg:max-w-[350px] relative z-30"
        >
          <Card3DTilt intensity={12} scaleOnHover={true}>
            <div className="w-full aspect-[4/5] rounded-[2rem] overflow-hidden border border-indigo-500/40 shadow-[0_20px_50px_rgba(79,70,229,0.25)] relative group cursor-pointer">
              <img 
                src="/profile.jpeg" 
                alt="Nikhil Moudgil" 
                className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-5 left-5 right-5 flex justify-between items-center z-10">
                <div>
                  <p className="text-white font-bold text-lg">Nikhil Moudgil</p>
                  <p className="text-indigo-400 text-xs font-semibold tracking-wider uppercase mt-1">CS Undergraduate</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 backdrop-blur-md flex items-center justify-center border border-indigo-400/50">
                  <Terminal size={18} className="text-indigo-300" />
                </div>
              </div>
            </div>
          </Card3DTilt>
        </motion.div>
      </section>

      {/* --- Section: Skills & Background (Restored Full Version) --- */}
      <section id="about" className="max-w-7xl mx-auto px-6 lg:px-12 py-16 relative z-10">
        <div className="mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
            <Sparkles className="text-indigo-400" size={28} /> Capabilities & Background
          </h3>
          <p className="text-gray-400 text-sm">Technical skills, academic qualifications, and development experience.</p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {skillsCategories.map((cat, idx) => (
            <Card3DTilt key={cat.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-900/30 backdrop-blur-md p-7 rounded-3xl border border-gray-800 hover:border-indigo-500/40 transition-all duration-300 h-full"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20">{cat.icon}</div>
                  <h4 className="font-bold text-gray-100 text-base">{cat.title}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-gray-800/80 border border-gray-700/60 text-gray-300 rounded-lg text-xs font-medium hover:border-indigo-500/50 hover:text-indigo-300 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Card3DTilt>
          ))}
        </div>

        {/* Interactive Tabbed Experience / Education / Milestones */}
        <div className="bg-gray-900/20 border border-gray-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
          <div className="flex border-b border-gray-800 pb-4 mb-8 gap-4 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab("education")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all whitespace-nowrap ${
                activeTab === "education" ? "bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]" : "bg-gray-800/50 text-gray-400 hover:text-white"
              }`}
            >
              <GraduationCap size={16} /> Education
            </button>
            <button
              onClick={() => setActiveTab("experience")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all whitespace-nowrap ${
                activeTab === "experience" ? "bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]" : "bg-gray-800/50 text-gray-400 hover:text-white"
              }`}
            >
              <Briefcase size={16} /> Training & Experience
            </button>
            <button
              onClick={() => setActiveTab("milestones")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all whitespace-nowrap ${
                activeTab === "milestones" ? "bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]" : "bg-gray-800/50 text-gray-400 hover:text-white"
              }`}
            >
              <Rocket size={16} /> Milestones & Hackathons
            </button>
          </div>

          {activeTab === "education" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="relative pl-6 border-l-2 border-indigo-500/50 space-y-1">
                <div className="absolute -left-[7px] top-0 w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                <h5 className="font-bold text-white text-base">B.Tech in Computer Science Engineering</h5>
                <p className="text-indigo-400 text-sm font-medium">IKGPTU Mohali Campus</p>
                <div className="text-xs text-gray-400 flex items-center gap-3 pt-1">
                  <span className="bg-gray-800 px-2.5 py-1 rounded-md">Expected Graduation: 2027</span>
                  <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2.5 py-1 rounded-md font-semibold">
                    Current CGPA: 7.55
                  </span>
                </div>
              </div>
              <div className="relative pl-6 border-l-2 border-gray-800 space-y-1 pt-2">
                <div className="absolute -left-[7px] top-2 w-3 h-3 bg-gray-700 rounded-full" />
                <h5 className="font-bold text-white text-base">Diploma in Computer Engineering</h5>
                <p className="text-indigo-400 text-sm font-medium">Government Polytechnic Hamirpur</p>
                <div className="text-xs text-gray-400 flex items-center gap-3 pt-1">
                  <span className="bg-gray-800 px-2.5 py-1 rounded-md">Completed 2024</span>
                  <span className="bg-gray-800 px-2.5 py-1 rounded-md">Score: 75%</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "experience" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="relative pl-6 border-l-2 border-indigo-500/50 space-y-1">
                <div className="absolute -left-[7px] top-0 w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                <h5 className="font-bold text-white text-base">Industrial Web Development Training</h5>
                <p className="text-indigo-400 text-sm font-medium">Ex-Trainer, Mohali</p>
                <p className="text-xs text-gray-400 pt-1 leading-relaxed">
                  Hands-on industrial training focused on full-stack web architecture, API integrations, responsive design patterns, and cloud deployment standard procedures.
                </p>
              </div>
              <div className="relative pl-6 border-l-2 border-gray-800 space-y-1 pt-2">
                <div className="absolute -left-[7px] top-2 w-3 h-3 bg-gray-700 rounded-full" />
                <h5 className="font-bold text-white text-base">App Development Internship Training</h5>
                <p className="text-indigo-400 text-sm font-medium">Prerna-Gati Technologies</p>
                <p className="text-xs text-gray-400 pt-1 leading-relaxed">
                  6 weeks of hands-on software development training covering modular client interface workflows and API synchronization.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === "milestones" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-gray-800/40 border border-gray-700/50">
                <h5 className="font-bold text-white text-sm">HACK-O-OCTO Competitor</h5>
                <p className="text-xs text-gray-400 mt-1">Built full-stack software solutions under active competition constraints.</p>
              </div>
              <div className="p-4 rounded-2xl bg-gray-800/40 border border-gray-700/50">
                <h5 className="font-bold text-white text-sm">Hack-2-Hatch Participant</h5>
                <p className="text-xs text-gray-400 mt-1">Designed dynamic pitching platforms and prototype architectures.</p>
              </div>
              <div className="p-4 rounded-2xl bg-gray-800/40 border border-gray-700/50">
                <h5 className="font-bold text-white text-sm">VLSI Design Workshop</h5>
                <p className="text-xs text-gray-400 mt-1">Attended technical workshops exploring low-level hardware system design concepts.</p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* --- Portfolio / Projects Section (Restored Full Version) --- */}
      <section id="portfolio" className="max-w-7xl mx-auto px-6 lg:px-12 py-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
              <Layers className="text-indigo-400" size={28} /> Featured Projects
            </h3>
            <p className="text-gray-400 text-sm">Explore AI workflows, web apps, and system database projects.</p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Search tech stack or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900/80 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xs">
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {(["All", "AI / RAG", "Full Stack", "Systems / SQL"] as ProjectCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.3)]"
                  : "bg-gray-900/60 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <Card3DTilt key={project.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  onClick={() => setSelectedProject(project)}
                  className="bg-gray-900/30 backdrop-blur-md rounded-3xl border border-gray-800 hover:border-indigo-500/50 hover:shadow-[0_10px_30px_rgba(79,70,229,0.15)] transition-all duration-300 flex flex-col h-full group cursor-pointer relative overflow-hidden"
                >
                  {project.featured && (
                    <div className="absolute top-4 right-4 z-10 px-2.5 py-1 bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-[10px] font-bold rounded-full backdrop-blur-md uppercase tracking-wider">
                      Featured
                    </div>
                  )}
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-gray-800/80 rounded-2xl text-indigo-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-all duration-300 shadow-inner">
                        {project.icon}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-indigo-500/20 group-hover:border-indigo-500/50 transition-all">
                        <ArrowUpRight size={18} />
                      </div>
                    </div>
                    <h4 className="text-2xl font-bold text-gray-100 mb-1 group-hover:text-indigo-300 transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-indigo-400/80 text-xs font-bold uppercase tracking-wider mb-4">
                      {project.subtitle}
                    </p>
                    <p className="text-gray-400 text-sm mb-8 flex-grow leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                    <div className="pt-5 border-t border-gray-800/60 flex flex-wrap gap-2">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-[11px] font-medium px-3 py-1 bg-gray-800/60 text-gray-300 rounded-lg border border-gray-700/50">
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="text-[11px] font-medium px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </Card3DTilt>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-gray-500">
              No projects found matching your criteria.
            </div>
          )}
        </div>
      </section>

      {/* --- Project Details Modal --- */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 border border-gray-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-gray-800 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 border border-indigo-500/20">
                  {selectedProject.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                  <p className="text-xs text-indigo-400 font-bold uppercase">{selectedProject.subtitle}</p>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-6">{selectedProject.longDescription}</p>

              <div className="mb-6">
                <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Technologies Used</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-800 text-indigo-300 border border-gray-700 text-xs rounded-lg font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
                {selectedProject.link && (
                  <a href={selectedProject.link} target="_blank" rel="noreferrer" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-colors">
                    Live Demo <ExternalLink size={14} />
                  </a>
                )}
                {selectedProject.github && (
                  <a href={selectedProject.github} target="_blank" rel="noreferrer" className="border border-gray-700 hover:border-gray-600 text-gray-300 font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-colors">
                    GitHub Repo <GitBranch size={14} />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}