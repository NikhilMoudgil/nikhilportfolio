import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";

// --- Types ---
interface Project {
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  techStack: string[];
  icon: React.ReactNode;
  link?: string;
  image?: string;
}

// --- Data ---
const projectsData: Project[] = [
  {
    title: "Repomind",
    subtitle: "AI-Powered Repository Analyzer",
    description:
      "Intelligent developer tool that analyzes GitHub repositories to provide architectural summaries, codebase insights, and documentation generation.",
    longDescription:
      "Repomind leverages AI to decode complex codebases. It fetches repository data, processes the structure, and outputs comprehensive summaries to help new contributors onboard rapidly.",
    techStack: ["Next.js", "Python", "OpenAI API", "Tailwind CSS"],
    icon: <Cpu size={24} />,
    image: "/repomind_preview.png",
  },
  {
    title: "Design Forge",
    subtitle: "Dynamic UI/UX Generator",
    description:
      "A creative utility platform for developers to rapidly prototype and generate accessible, highly-customizable UI components.",
    longDescription:
      "Design Forge accelerates frontend workflows by offering a drag-and-drop interface and parameter-based component generation, exporting clean, production-ready React/Tailwind code.",
    techStack: ["React", "TypeScript", "Framer Motion", "Vite"],
    icon: <Code2 size={24} />,
    link: "https://designforge-delta.vercel.app/",
    image: "/designforge_preview.png",
  },
  {
    title: "EduNexus",
    subtitle: "API-Based Roadmap Generating Platform",
    description:
      "An API-based platform where users generate dynamic roadmaps based on their field of interest, complete with an interactive community.",
    longDescription:
      "EduNexus solves static learning curves by allowing users to input personalized data fields to instantly fetch dynamic curriculum roadmaps. Built with robust API routing and an integrated peer community module.",
    techStack: ["Next.js", "React", "TypeScript", "REST APIs"],
    icon: <Terminal size={24} />,
    link: "https://edu-nexus-teal.vercel.app",
    image: "/edunexus-preview.png",
  },
  {
    title: "Venture-Bridge",
    subtitle: "Entrepreneur & Investor Ecosystem",
    description:
      "A specialized platform for entrepreneurs to pitch ideas and investors to discover inventions and interact seamlessly.",
    longDescription:
      "Venture-Bridge bridges the capital and execution gap. It establishes a secure ecosystem where startup founders pitch concepts, and venture capital stakeholders inspect and engage directly.",
    techStack: ["MERN Stack", "Node.js", "Express", "MongoDB"],
    icon: <Users size={24} />,
  },
  {
    title: "Airisto",
    subtitle: "DBMS-Based AC Services Marketplace",
    description:
      "An administrative marketplace built using HTML, CSS, and JavaScript, powered by backend DBMS logic for service management.",
    longDescription:
      "Airisto streamlines air-conditioning service operations. It features administrative control portals and a consumer marketplace heavily managed via structured relational database management systems.",
    techStack: ["HTML5", "CSS3", "JavaScript", "DBMS", "SQL"],
    icon: <Database size={24} />,
  },
];

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen bg-[#07090e] text-gray-100 font-mono selection:bg-indigo-500 selection:text-white pb-24 relative overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-600/10 blur-[180px] pointer-events-none rounded-full" />

      {/* --- Navigation --- */}
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex justify-between items-center relative z-20">
        <div className="text-2xl font-extrabold tracking-widest text-white hover:text-indigo-400 transition-colors cursor-pointer">
          NIKHIL<span className="text-indigo-500">.Builds</span>
        </div>
        <div className="hidden md:flex gap-10 text-sm font-medium text-gray-400">
          <a href="#home" className="hover:text-white transition-colors">
            Home
          </a>
          <a href="#background" className="hover:text-white transition-colors">
            About me
          </a>
          <a href="#portfolio" className="hover:text-white transition-colors">
            Portfolio
          </a>
        </div>
        <a
          href="mailto:nikhilmoudgil799@gmail.com"
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-md font-bold transition-all shadow-[0_0_15px_rgba(79,70,229,0.4)] text-sm"
        >
          Hire Me
        </a>
      </nav>

      {/* --- Hero Section --- */}
      <section
        id="home"
        className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-20 flex flex-col md:flex-row items-center justify-between gap-16 relative z-10"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.12 }}
          className="flex-1 text-left space-y-6"
        >
          <motion.p
            variants={fadeUpVariant}
            className="text-indigo-400 font-bold uppercase tracking-widest text-sm"
          >
            // System Online
          </motion.p>

          <motion.h1
            variants={fadeUpVariant}
            className="text-4xl sm:text-6xl font-bold text-white"
          >
            Nikhil Moudgil
          </motion.h1>

          <motion.h2
            variants={fadeUpVariant}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400 leading-tight pb-2"
          >
            Software Engineer
          </motion.h2>

          {/* Social Icons */}
          <motion.div variants={fadeUpVariant} className="flex gap-4 pt-2">
            <a
              href="https://github.com/NikhilMoudgil"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all shadow-lg"
            >
              <GitBranch size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/nikhil-moudgil-995408270/"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all shadow-lg"
            >
              <Globe size={18} />
            </a>
            <a
              href="mailto:nikhilmoudgil799@gmail.com"
              className="w-11 h-11 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all shadow-lg"
            >
              <Mail size={18} />
            </a>
          </motion.div>

          <motion.div
            variants={fadeUpVariant}
            className="flex flex-wrap items-center gap-4 pt-6"
          >
            <a
              href="mailto:nikhilmoudgil799@gmail.com"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3.5 rounded-md transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.3)] text-sm"
            >
              Hire Me
            </a>
            <a
              href="/nikhilcv.pdf"
              download="nikhilcv.pdf.pdf"
              className="border border-gray-600 hover:border-indigo-400 text-gray-300 hover:text-white px-8 py-3.5 rounded-md transition-all duration-300 flex items-center gap-2 text-sm backdrop-blur-sm"
            >
              <Download/> Download CV
            </a>
          </motion.div>

          {/* Stats Box */}
          <motion.div
            variants={fadeUpVariant}
            className="flex flex-wrap gap-8 bg-gray-900/40 backdrop-blur-md p-6 rounded-2xl mt-12 w-fit border border-gray-800 shadow-xl"
          >
            <div>
              <h4 className="text-2xl font-bold text-indigo-400">5+</h4>
              <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">
                Projects Done
              </p>
            </div>
            <div className="w-px bg-gray-700/50 hidden sm:block"></div>
            <div>
              <h4 className="text-2xl font-bold text-indigo-400">3</h4>
              <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">
                Active Deployments
              </p>
            </div>
            <div className="w-px bg-gray-700/50 hidden sm:block"></div>
            <div>
              <h4 className="text-2xl font-bold text-indigo-400">7.55</h4>
              <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">
                Current CGPA
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Circular Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 flex justify-center md:justify-end"
        >
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full overflow-hidden border-4 border-gray-900 shadow-[0_0_50px_rgba(79,70,229,0.15)] group bg-gray-900 z-10">
            <img
              src="/profile.jpeg"
              alt="Nikhil Moudgil"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-indigo-900/20 pointer-events-none group-hover:bg-transparent transition-colors duration-500" />
          </div>
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-indigo-600/5 border border-indigo-500/20 -z-10 translate-x-5 translate-y-5"></div>
        </motion.div>
      </section>

      {/* --- Upgraded Background & Capabilities Section --- */}
      <section
        id="background"
        className="max-w-7xl mx-auto px-6 lg:px-12 py-16 relative z-10"
      >
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold mb-10 tracking-tight text-white flex items-center gap-3"
        >
          <Terminal className="text-indigo-400" size={28} /> Background &
          Capabilities
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-gray-900/30 backdrop-blur-md p-8 rounded-3xl border border-gray-800 hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(79,70,229,0.1)] transition-all duration-500 relative overflow-hidden"
          >
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-500/10 blur-[40px] rounded-full group-hover:bg-indigo-500/20 transition-all" />

            <div className="flex items-center gap-3 text-indigo-400 mb-8 relative z-10">
              <GraduationCap size={24} />
              <h4 className="text-xl font-bold text-gray-100">Education</h4>
            </div>

            {/* Timeline UI */}
            <div className="space-y-6 relative z-10">
              <div className="relative pl-6 before:absolute before:left-[-5px] before:top-1.5 before:w-3 before:h-3 before:bg-indigo-500 before:rounded-full before:shadow-[0_0_10px_rgba(99,102,241,0.8)] border-l-2 border-indigo-500/30 pb-4">
                <h5 className="font-bold text-gray-100 text-base">
                  B.Tech CSE
                </h5>
                <p className="text-indigo-300 text-sm mt-1 mb-2">
                  IKGPTU Mohali
                </p>
                <span className="inline-block px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">
                  Pursuing (CGPA: 7.55) • Expected 2027
                </span>
              </div>
              <div className="relative pl-6 before:absolute before:left-[-5px] before:top-1.5 before:w-3 before:h-3 before:bg-gray-600 before:rounded-full border-l-2 border-transparent">
                <h5 className="font-bold text-gray-100 text-base">
                  Diploma in Computer Eng.
                </h5>
                <p className="text-indigo-300 text-sm mt-1 mb-2">
                  Govt Polytechnic Hamirpur
                </p>
                <span className="inline-block px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">
                  Score: 75% • Completed 2024
                </span>
              </div>
            </div>
          </motion.div>

          {/* Technical Arsenal Card (Upgraded with Badges) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group bg-gray-900/30 backdrop-blur-md p-8 rounded-3xl border border-gray-800 hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(79,70,229,0.1)] transition-all duration-500 relative overflow-hidden"
          >
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/10 blur-[40px] rounded-full group-hover:bg-indigo-500/20 transition-all" />

            <div className="flex items-center gap-3 text-indigo-400 mb-6 relative z-10">
              <BrainCircuit size={24} />
              <h4 className="text-xl font-bold text-gray-100">
                Technical Arsenal
              </h4>
            </div>

            <div className="space-y-6 relative z-10">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                  AI & Backend
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 rounded-md text-xs font-semibold shadow-[0_0_10px_rgba(79,70,229,0.1)]">
                    FastAPI
                  </span>
                  <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 rounded-md text-xs font-semibold shadow-[0_0_10px_rgba(79,70,229,0.1)]">
                    RAG Pipelines
                  </span>
                  <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 rounded-md text-xs font-semibold shadow-[0_0_10px_rgba(79,70,229,0.1)]">
                    LLMs
                  </span>
                  <span className="px-3 py-1 bg-gray-800/80 border border-gray-700 text-gray-300 rounded-md text-xs">
                    Python
                  </span>
                  <span className="px-3 py-1 bg-gray-800/80 border border-gray-700 text-gray-300 rounded-md text-xs">
                    Node.js
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                  Frontend Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-800/80 border border-gray-700 text-gray-300 rounded-md text-xs">
                    Next.js
                  </span>
                  <span className="px-3 py-1 bg-gray-800/80 border border-gray-700 text-gray-300 rounded-md text-xs">
                    React
                  </span>
                  <span className="px-3 py-1 bg-gray-800/80 border border-gray-700 text-gray-300 rounded-md text-xs">
                    JavaScript
                  </span>
                  <span className="px-3 py-1 bg-gray-800/80 border border-gray-700 text-gray-300 rounded-md text-xs">
                    TypeScript
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                  Infrastructure
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-800/80 border border-gray-700 text-gray-300 rounded-md text-xs">
                    Docker
                  </span>
                  <span className="px-3 py-1 bg-gray-800/80 border border-gray-700 text-gray-300 rounded-md text-xs">
                    Microservices
                  </span>
                  <span className="px-3 py-1 bg-gray-800/80 border border-gray-700 text-gray-300 rounded-md text-xs">
                    Git
                  </span>
                  <span className="px-3 py-1 bg-gray-800/80 border border-gray-700 text-gray-300 rounded-md text-xs">
                    SQL
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Milestones Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group bg-gray-900/30 backdrop-blur-md p-8 rounded-3xl border border-gray-800 hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(79,70,229,0.1)] transition-all duration-500 relative overflow-hidden"
          >
            <div className="absolute -left-10 top-10 w-32 h-32 bg-indigo-500/10 blur-[40px] rounded-full group-hover:bg-indigo-500/20 transition-all" />

            <div className="flex items-center gap-3 text-indigo-400 mb-8 relative z-10">
              <Rocket size={24} />
              <h4 className="text-xl font-bold text-gray-100">Milestones</h4>
            </div>

            {/* Timeline UI */}
            <div className="space-y-6 relative z-10">
              <div className="relative pl-6 before:absolute before:left-[-5px] before:top-1.5 before:w-3 before:h-3 before:bg-indigo-500 before:rounded-full before:shadow-[0_0_10px_rgba(99,102,241,0.8)] border-l-2 border-indigo-500/30 pb-2">
                <h5 className="font-bold text-gray-100 text-sm">
                  Industrial Training
                </h5>
                <p className="text-indigo-300 text-xs mt-1 mb-2">
                  Ex-Trainer Mohali
                </p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Completed comprehensive web development and deployment
                  training.
                </p>
              </div>
              <div className="relative pl-6 before:absolute before:left-[-5px] before:top-1.5 before:w-3 before:h-3 before:bg-indigo-500 before:rounded-full before:shadow-[0_0_10px_rgba(99,102,241,0.8)] border-l-2 border-indigo-500/30 pb-2">
                <h5 className="font-bold text-gray-100 text-sm">
                  App Dev Training
                </h5>
                <p className="text-indigo-300 text-xs mt-1 mb-2">
                  Prerna-Gati Technologies
                </p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  6 weeks of hands-on software development training.
                </p>
              </div>
              <div className="relative pl-6 before:absolute before:left-[-5px] before:top-1.5 before:w-3 before:h-3 before:bg-gray-600 before:rounded-full border-l-2 border-transparent">
                <h5 className="font-bold text-gray-100 text-sm">
                  Hackathons & Workshops
                </h5>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  Participated in HACK-O-OCTO, Hack-2 Hatch, and VLSI Design
                  Workshops.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Portfolio / Projects Section --- */}
      <section
        id="portfolio"
        className="max-w-7xl mx-auto px-6 lg:px-12 py-16 relative z-10"
      >
        <div className="mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
            <Code2 className="text-indigo-400" size={28} /> Portfolio Projects
          </h3>
          <p className="text-gray-400 text-sm">
            Click to inspect architectural details and deployment links.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="bg-gray-900/30 backdrop-blur-md rounded-3xl border border-gray-800 hover:border-indigo-500/50 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(79,70,229,0.15)] transition-all duration-300 flex flex-col h-full group cursor-pointer relative overflow-hidden"
            >
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-gray-800/80 rounded-2xl text-indigo-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-all duration-300 shadow-inner">
                    {project.icon}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-indigo-500/20 group-hover:border-indigo-500/50 transition-all">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                <h4 className="text-2xl font-bold text-gray-100 mb-2 group-hover:text-indigo-300 transition-colors">
                  {project.title}
                </h4>
                <p className="text-indigo-400/80 text-xs font-bold uppercase tracking-wider mb-4">
                  {project.subtitle}
                </p>
                <p className="text-gray-400 text-sm mb-8 flex-grow leading-relaxed">
                  {project.description}
                </p>

                <div className="pt-5 border-t border-gray-800/60 flex flex-wrap gap-2">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-medium px-3 py-1.5 bg-gray-800/60 text-gray-300 rounded-lg border border-gray-700/50"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="text-[11px] font-medium px-3 py-1.5 bg-gray-800/60 text-gray-300 rounded-lg border border-gray-700/50">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- Interactive Project Modal --- */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-[#07090e]/80 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#11141d] border border-gray-700 rounded-3xl max-w-2xl w-full shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Floating Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-gray-900/60 text-gray-300 hover:text-white hover:bg-gray-800 transition-all backdrop-blur-md border border-gray-600 hover:border-gray-400"
              >
                <X size={20} />
              </button>

              {/* Project Image Banner */}
              {selectedProject.image && (
                <div className="w-full h-56 sm:h-72 flex-shrink-0 relative bg-gray-900 border-b border-gray-800">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient to blend image into background */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11141d] via-[#11141d]/40 to-transparent opacity-90" />
                </div>
              )}

              {/* Scrollable Text Content Area */}
              <div className="p-8 sm:p-10 overflow-y-auto">
                <div className="mb-6 pr-10">
                  <div className="text-indigo-400 text-sm font-bold uppercase tracking-widest mb-2">
                    {selectedProject.subtitle}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-100">
                    {selectedProject.title}
                  </h3>
                </div>

                <p className="text-gray-300 text-base leading-relaxed mb-8">
                  {selectedProject.longDescription}
                </p>

                <div className="mb-8 bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
                  <h4 className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">
                    Core Architecture
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3.5 py-1.5 bg-indigo-500/10 border border-indigo-500/30 rounded-lg text-sm font-medium text-indigo-300 shadow-[0_0_10px_rgba(79,70,229,0.05)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedProject.link && (
                  <div className="pt-2 flex justify-end">
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:-translate-y-0.5"
                    >
                      Launch Platform <ExternalLink size={18} />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
