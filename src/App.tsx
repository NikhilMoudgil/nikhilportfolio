import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, ExternalLink, Code2, Database, Users, 
  GraduationCap, Terminal, Server, X, ArrowUpRight, Globe, GitBranch, Briefcase
} from 'lucide-react';

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
    title: "EduNexus",
    subtitle: "API-Based Roadmap Generating Platform",
    description: "An API-based platform where users generate dynamic roadmaps based on their field of interest, complete with an interactive community.",
    longDescription: "EduNexus solves static learning curves by allowing users to input personalized data fields to instantly fetch dynamic curriculum roadmaps. Built with robust API routing and an integrated peer community module for technical discussions.",
    techStack: ["Next.js", "React", "TypeScript", "REST APIs", "Tailwind CSS"],
    icon: <Code2 size={24} />,
    link: "https://edu-nexus-teal.vercel.app"
  },
  {
    title: "Venture-Bridge",
    subtitle: "Entrepreneur & Investor Ecosystem",
    description: "A specialized platform for entrepreneurs to pitch ideas and investors to discover inventions and interact seamlessly.",
    longDescription: "Venture-Bridge bridges the capital and execution gap. It establishes a secure ecosystem where startup founders pitch concepts, and venture capital stakeholders inspect, filter, and engage directly with new technological inventions.",
    techStack: ["MERN Stack", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    icon: <Users size={24} />
  },
  {
    title: "Airisto",
    subtitle: "DBMS-Based AC Services Marketplace",
    description: "An administrative marketplace built using HTML, CSS, and JavaScript, powered by backend DBMS logic for service management.",
    longDescription: "Airisto streamlines air-conditioning service operations. It features administrative control portals and a consumer marketplace heavily managed via structured relational database management systems (DBMS) to process service transactions.",
    techStack: ["HTML5", "CSS3", "JavaScript", "DBMS", "SQL"],
    icon: <Database size={24} />
  }
];

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="min-h-screen bg-[#07090e] text-gray-100 font-mono selection:bg-teal-500 selection:text-gray-950 pb-24 relative overflow-hidden">
      
      {/* Background Ambience Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-teal-500/10 blur-[160px] pointer-events-none rounded-full" />

      {/* 1. Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-16 flex flex-col-reverse md:flex-row items-center justify-between gap-12 relative z-10">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          transition={{ staggerChildren: 0.12 }}
          className="flex-1 text-center md:text-left space-y-6"
        >
          <motion.div variants={fadeUpVariant}>
            <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs tracking-wider uppercase">
              // System Online: Open for Roles
            </span>
          </motion.div>

          <motion.h1 variants={fadeUpVariant} className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Nikhil Moudgil
          </motion.h1>

          <motion.h2 variants={fadeUpVariant} className="text-xl sm:text-2xl text-teal-400 font-bold">
            Full-Stack Software Engineer
          </motion.h2>

          <motion.p variants={fadeUpVariant} className="text-gray-400 text-sm sm:text-base max-w-xl leading-relaxed mx-auto md:mx-0">
            Computer Science undergraduate specializing in high-performance applications, MERN stack development, systems programming in C++/Python, and database architecture.
          </motion.p>
          
          <motion.div variants={fadeUpVariant} className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
            <a href="mailto:nikhilmoudgil799@gmail.com" className="bg-teal-500 hover:bg-teal-400 text-gray-950 font-bold px-5 py-2.5 rounded-lg transition-all duration-300 shadow-lg shadow-teal-500/20 flex items-center gap-2 text-sm">
              <Mail size={16} /> nikhilmoudgil799@gmail.com
            </a>
            <a href="https://github.com/NikhilMoudgil" target="_blank" rel="noreferrer" className="border border-gray-800 bg-gray-900/60 hover:border-teal-500/50 hover:bg-gray-800 px-4 py-2.5 rounded-lg transition-all duration-300 flex items-center gap-2 text-sm text-gray-300">
              <GitBranch size={16} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/nikhil-moudgil-995408270" target="_blank" rel="noreferrer" className="border border-gray-800 bg-gray-900/60 hover:border-teal-500/50 hover:bg-gray-800 px-4 py-2.5 rounded-lg transition-all duration-300 flex items-center gap-2 text-sm text-gray-300">
              <Globe size={16} /> LinkedIn
            </a>
          </motion.div>
        </motion.div>

        {/* Profile Image Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 flex justify-center md:justify-end"
        >
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border border-teal-500/30 shadow-2xl shadow-teal-500/10 group bg-gray-900">
            <img 
              src="/profile.jpeg" 
              alt="Nikhil Moudgil" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </section>

      {/* 2. Detailed Background, Skills & Training Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-gray-900 relative z-10">
        <motion.h3 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold mb-10 tracking-tight text-white flex items-center gap-3"
        >
          <Terminal className="text-teal-400" size={28} /> Background & Capabilities
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Education & Certifications */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800/80 backdrop-blur-sm space-y-5">
            <div className="flex items-center gap-3 text-teal-400 mb-2">
              <GraduationCap size={22} />
              <h4 className="text-lg font-bold text-gray-100">Education</h4>
            </div>
            <div className="border-l-2 border-teal-500/40 pl-4 space-y-1">
              <h5 className="font-bold text-gray-200 text-sm">B.Tech CSE | IKGPTU Mohali Campus - 1</h5>
              <p className="text-xs text-gray-400">Pursuing (CGPA: 7.55) • Expected 2027</p>
            </div>
            <div className="border-l-2 border-gray-800 pl-4 space-y-1">
              <h5 className="font-bold text-gray-200 text-sm">Diploma in Computer Engineering</h5>
              <p className="text-xs text-gray-400">Govt Polytechnic Hamirpur • 75% (2024)</p>
            </div>
            <div className="border-l-2 border-gray-800 pl-4 space-y-1">
              <h5 className="font-bold text-gray-200 text-sm">Diploma in Computer Application</h5>
              <p className="text-xs text-gray-400">Hartron Skill Center Chandigarh (2020-2021)</p>
            </div>
          </motion.div>

          {/* Technical Arsenal & Core Subjects */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800/80 backdrop-blur-sm space-y-4">
            <div className="flex items-center gap-3 text-teal-400 mb-2">
              <Server size={22} />
              <h4 className="text-lg font-bold text-gray-100">Technical Arsenal</h4>
            </div>
            <div>
              <p className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">Languages & Frameworks</p>
              <p className="text-gray-300 text-xs">C++, Python, JavaScript, MERN Stack</p>
            </div>
            <div>
              <p className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">Development & Tools</p>
              <p className="text-gray-300 text-xs">Git, Docker, Microservices Architecture, REST APIs, SQL</p>
            </div>
            <div>
              <p className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">Core CS Subjects</p>
              <p className="text-gray-300 text-xs">Computer Networks, Operating Systems, DBMS</p>
            </div>
          </motion.div>

          {/* Industrial Training & Milestones */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800/80 backdrop-blur-sm space-y-4">
            <div className="flex items-center gap-3 text-teal-400 mb-2">
              <Briefcase size={22} />
              <h4 className="text-lg font-bold text-gray-100">Training & Milestones</h4>
            </div>
            <ul className="space-y-3 text-xs text-gray-300">
              <li className="border-l-2 border-teal-500/40 pl-3">
                <span className="font-bold text-gray-200">Web Development Training</span><br/>
                6 Weeks Industrial Training at Ex-Trainer Mohali.
              </li>
              <li className="border-l-2 border-gray-800 pl-3">
                <span className="font-bold text-gray-200">App Development Training</span><br/>
                6 Weeks Industrial Training at Prerna-Gati Technologies.
              </li>
              <li className="border-l-2 border-gray-800 pl-3">
                <span className="font-bold text-gray-200">Hackathons & Workshops</span><br/>
                HACK-O-OCTO (Chandigarh University), Hack-2 Hatch (PEC Chandigarh), VLSI Design Workshop (JUIT Solan).
              </li>
            </ul>
          </motion.div>

        </div>
      </section>

      {/* 3. Interactive Projects Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-gray-900 relative z-10">
        <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
              <Code2 className="text-teal-400" size={28} /> Engineering Projects
            </h3>
            <p className="text-gray-400 text-sm">Click any project module to inspect deep architectural specifications and links.</p>
          </div>
          <span className="text-xs text-teal-400 font-mono bg-teal-500/10 px-3 py-1 rounded border border-teal-500/20">
            3 Active Deployments
          </span>
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
              className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 hover:border-teal-500/60 transition-all duration-300 flex flex-col h-full group cursor-pointer relative shadow-xl backdrop-blur-md"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-gray-800/80 rounded-xl text-teal-400 group-hover:bg-teal-500/10 group-hover:scale-110 transition-all duration-300">
                  {project.icon}
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-800/50 flex items-center justify-center text-gray-400 group-hover:text-teal-400 group-hover:bg-teal-500/10 transition-colors">
                  <ArrowUpRight size={16} />
                </div>
              </div>
              
              <h4 className="text-xl font-bold text-gray-100 mb-1 group-hover:text-teal-400 transition-colors">{project.title}</h4>
              <p className="text-teal-400 text-xs mb-3 tracking-wide">{project.subtitle}</p>
              <p className="text-gray-300 text-sm mb-6 flex-grow leading-relaxed">{project.description}</p>
              
              <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400">
                <span>Inspect Architecture</span>
                <span className="text-teal-400 font-bold group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Project Deep-Dive Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-gray-950/80 backdrop-blur-md"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-gray-900 border border-gray-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-teal-400 text-xs uppercase tracking-widest mb-1">{selectedProject.subtitle}</div>
                  <h3 className="text-2xl font-bold text-gray-100">{selectedProject.title}</h3>
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
                <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-3">Core Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-gray-800/80 border border-gray-700/60 rounded-md text-xs text-teal-300">
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
                    className="bg-teal-500 hover:bg-teal-400 text-gray-950 font-bold px-5 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-2"
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