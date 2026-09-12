import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  ExternalLink,
  Code2,
  Database,
  Users,
  Terminal,
  Server,
  X,
  ArrowUpRight,
  Globe,
  GitBranch,
  Briefcase,
  Download,
  Cpu,
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
      {/* Background Ambience Glow (Cold/Purple) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-600/10 blur-[180px] pointer-events-none rounded-full" />

      {/* --- Navigation --- */}
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex justify-between items-center relative z-20">
        <div className="text-2xl font-extrabold tracking-widest text-white">
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
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-md font-bold transition-all shadow-lg shadow-indigo-600/20 text-sm"
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
          <motion.p variants={fadeUpVariant} className="text-gray-400 text-lg">
            Hi I am
          </motion.p>

          <motion.h1
            variants={fadeUpVariant}
            className="text-3xl sm:text-5xl font-bold text-white"
          >
            Nikhil Moudgil
          </motion.h1>

          <motion.h2
            variants={fadeUpVariant}
            className="text-5xl sm:text-7xl font-extrabold tracking-tight text-indigo-400 leading-tight"
          >
            Software Engineer
          </motion.h2>

          {/* Social Icons matching the UI reference */}
          <motion.div variants={fadeUpVariant} className="flex gap-4 pt-2">
            <a
              href="https://github.com/NikhilMoudgil"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-indigo-400 hover:border-indigo-400 transition-colors"
            >
              <GitBranch size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/nikhil-moudgil-995408270/"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-indigo-400 hover:border-indigo-400 transition-colors"
            >
              <Globe size={18} />
            </a>
            <a
              href="mailto:nikhilmoudgil799@gmail.com"
              className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-indigo-400 hover:border-indigo-400 transition-colors"
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
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3 rounded-md transition-all duration-300 shadow-lg shadow-indigo-600/20 text-sm"
            >
              Hire Me
            </a>
            <a
              href="/Nikhil_Moudgil_CV.pdf"
              download="Nikhil_Moudgil_CV.pdf"
              className="border border-gray-600 hover:border-indigo-400 text-gray-300 hover:text-white px-8 py-3 rounded-md transition-all duration-300 flex items-center gap-2 text-sm"
            >
              <Download size={16} /> Download CV
            </a>
          </motion.div>

          {/* Stats Box from the reference image */}
          <motion.div
            variants={fadeUpVariant}
            className="flex flex-wrap gap-8 bg-[#11141d] p-6 rounded-xl mt-12 w-fit border border-gray-800 shadow-xl"
          >
            <div>
              <h4 className="text-2xl font-bold text-indigo-400">5+</h4>
              <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">
                Projects Done
              </p>
            </div>
            <div className="w-px bg-gray-700 hidden sm:block"></div>
            <div>
              <h4 className="text-2xl font-bold text-indigo-400">3</h4>
              <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">
                Active Deployments
              </p>
            </div>
            <div className="w-px bg-gray-700 hidden sm:block"></div>
            <div>
              <h4 className="text-2xl font-bold text-indigo-400">7.55</h4>
              <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">
                Current CGPA
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Circular Profile Image matching UI Ref */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 flex justify-center md:justify-end"
        >
          <div className="relative w-90 h-90 sm:w-110 sm:h-110 rounded-full overflow-hidden border-4 border-[#11141d] shadow-2xl shadow-indigo-500/10 group bg-gray-900 z-10">
            {/* The image is referred to verbatim based on prompt constraints */}
            <img
              src="/nikhil.jpeg"
              alt="Nikhil Moudgil"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-indigo-900/20 pointer-events-none group-hover:bg-transparent transition-colors duration-500" />
          </div>
          {/* Decorative background circle */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gray-800/30 -z-10 translate-x-4 translate-y-4"></div>
        </motion.div>
      </section>

      {/* --- Background & Capabilities Section --- */}
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#11141d] p-6 rounded-2xl border border-gray-800 hover:border-indigo-500/30 transition-colors space-y-5"
          >
            <div className="flex items-center gap-3 text-indigo-400 mb-2">
              <Briefcase size={22} />
              <h4 className="text-lg font-bold text-gray-100">Education</h4>
            </div>
            <div className="border-l-2 border-indigo-500/40 pl-4 space-y-1">
              <h5 className="font-bold text-gray-200 text-sm">
                B.Tech CSE | IKGPTU Mohali
              </h5>
              <p className="text-xs text-gray-400">
                Pursuing (CGPA: 7.55) • Expected 2027
              </p>
            </div>
            <div className="border-l-2 border-gray-700 pl-4 space-y-1">
              <h5 className="font-bold text-gray-200 text-sm">
                Diploma in Computer Eng.
              </h5>
              <p className="text-xs text-gray-400">
                Govt Polytechnic Hamirpur • 75% (2024)
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#11141d] p-6 rounded-2xl border border-gray-800 hover:border-indigo-500/30 transition-colors space-y-4"
          >
            <div className="flex items-center gap-3 text-indigo-400 mb-2">
              <Server size={22} />
              <h4 className="text-lg font-bold text-gray-100">
                Technical Arsenal
              </h4>
            </div>
            <div>
              <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
                Core Tech
              </p>
              <p className="text-gray-300 text-xs">
                C++, Python, JavaScript, MERN Stack, Next.js
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
                Architecture & Tools
              </p>
              <p className="text-gray-300 text-xs">
                Git, Docker, REST APIs, Microservices, SQL
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#11141d] p-6 rounded-2xl border border-gray-800 hover:border-indigo-500/30 transition-colors space-y-4"
          >
            <div className="flex items-center gap-3 text-indigo-400 mb-2">
              <Briefcase size={22} />
              <h4 className="text-lg font-bold text-gray-100">Milestones</h4>
            </div>
            <ul className="space-y-3 text-xs text-gray-300">
              <li className="border-l-2 border-indigo-500/40 pl-3">
                <span className="font-bold text-gray-200">
                  Industrial Training
                </span>
                <br />
                Ex-Trainer Mohali & Prerna-Gati Technologies.
              </li>
              <li className="border-l-2 border-gray-700 pl-3">
                <span className="font-bold text-gray-200">
                  Hackathons & Workshops
                </span>
                <br />
                HACK-O-OCTO, Hack-2 Hatch, VLSI Design Workshop.
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* --- Portfolio / Projects Section --- */}
      <section
        id="portfolio"
        className="max-w-7xl mx-auto px-6 lg:px-12 py-16 relative z-10"
      >
        <div className="mb-10">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
            <Code2 className="text-indigo-400" size={28} /> Portfolio Projects
          </h3>
          <p className="text-gray-400 text-sm">
            Click to inspect architectural details and deployment links.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedProject(project)}
              className="bg-[#11141d] p-6 rounded-2xl border border-gray-800 hover:border-indigo-500/50 transition-all duration-300 flex flex-col h-full group cursor-pointer relative shadow-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-gray-800/80 rounded-xl text-indigo-400 group-hover:bg-indigo-500/10 group-hover:scale-110 transition-all duration-300">
                  {project.icon}
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors">
                  <ArrowUpRight size={16} />
                </div>
              </div>

              <h4 className="text-xl font-bold text-gray-100 mb-1 group-hover:text-indigo-300 transition-colors">
                {project.title}
              </h4>
              <p className="text-indigo-400 text-xs mb-3 tracking-wide">
                {project.subtitle}
              </p>
              <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                {project.description}
              </p>

              <div className="pt-4 border-t border-gray-800 flex flex-wrap gap-2">
                {project.techStack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-medium px-2 py-1 bg-gray-800 text-gray-300 rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="text-[10px] font-medium px-2 py-1 bg-gray-800 text-gray-300 rounded">
                    +{project.techStack.length - 3}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- Interactive Project Modal --- */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-[#07090e]/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#11141d] border border-gray-700 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-indigo-400 text-xs uppercase tracking-widest mb-1">
                    {selectedProject.subtitle}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-100">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                {selectedProject.longDescription}
              </p>

              <div className="mb-8">
                <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                  Core Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-800/80 border border-gray-700/60 rounded-md text-xs text-indigo-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {selectedProject.link && (
                <div className="pt-4 border-t border-gray-800 flex justify-end">
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-2"
                  >
                    Open Live Deployment <ExternalLink size={16} />
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
