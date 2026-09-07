import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, ExternalLink, Code2, Database, Users, 
  GraduationCap, Trophy, Terminal, Server, Cpu, X, ArrowUpRight, Globe, GitBranch
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
    subtitle: "Dynamic API Infrastructure",
    description: "Engineered an API-based platform for users to generate dynamic learning roadmaps with community interaction features.",
    longDescription: "EduNexus is a full-stack educational ecosystem built to solve static learning pathways. By leveraging dynamic API routing, users input their field of interest to instantly generate personalized, structured learning roadmaps. It also features a real-time community module allowing peers to collaborate and share insights.",
    techStack: ["Next.js", "React", "TypeScript", "Prisma", "Supabase", "Tailwind CSS"],
    icon: <Code2 size={24} />,
    link: "https://edu-nexus-teal.vercel.app"
  },
  {
    title: "Venture-Bridge",
    subtitle: "Dual-User State Management",
    description: "Developed a specialized platform facilitating secure interactions and pitch presentations between entrepreneurs and investors.",
    longDescription: "Venture-Bridge bridges the capital gap by providing a targeted marketplace interface. Entrepreneurs can securely pitch and showcase breakthrough inventions, while verified investors can filter ideas, review metrics, and initiate direct communication pipelines.",
    techStack: ["MERN Stack", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    icon: <Users size={24} />
  },
  {
    title: "Airisto",
    subtitle: "DBMS Marketplace Architecture",
    description: "Architected a full-scale administration and marketplace system for AC services, heavily relying on strict DBMS logic.",
    longDescription: "Airisto addresses service management challenges through a structured administrative portal and marketplace architecture. Built using foundational HTML, CSS, and JavaScript, it manages complex relational database operations for service booking tracking, user roles, and marketplace inventory.",
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
    <main className="min-h-screen bg-[#07090e] text-gray-100 font-sans selection:bg-teal-500 selection:text-white pb-24 relative overflow-hidden">
      
      {/* Background Ambience Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-500/10 blur-[160px] pointer-events-none rounded-full" />

      {/* 1. Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-16 flex flex-col-reverse md:flex-row items-center justify-between gap-12 relative z-10">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          transition={{ staggerChildren: 0.12 }}
          className="flex-1 text-center md:text-left space-y-6"
        >
          <motion.div variants={fadeUpVariant}>
            <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-mono tracking-wide">
              Available for Opportunities
            </span>
          </motion.div>

          <motion.h1 variants={fadeUpVariant} className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Nikhil Moudgil
          </motion.h1>

          <motion.h2 variants={fadeUpVariant} className="text-xl sm:text-2xl text-teal-400 font-medium">
            Full-Stack Software Engineer
          </motion.h2>

          <motion.p variants={fadeUpVariant} className="text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed mx-auto md:mx-0">
            Building high-performance applications and scalable architectures. Focused on the intersection of MERN stack development, cloud computing, and efficient system design.
          </motion.p>
          
          <motion.div variants={fadeUpVariant} className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
            <a href="mailto:nikhilmoudgil799@gmail.com" className="bg-teal-500 hover:bg-teal-400 text-gray-950 font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 shadow-lg shadow-teal-500/20 flex items-center gap-2 text-sm">
              <Mail size={16} /> Contact Me
            </a>
            <a href="https://github.com/NikhilMoudgil" target="_blank" rel="noreferrer" className="border border-gray-800 bg-gray-900/60 hover:border-teal-500/50 hover:bg-gray-800 px-5 py-2.5 rounded-lg transition-all duration-300 flex items-center gap-2 text-sm text-gray-300">
              <GitBranch size={16} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/nikhil-moudgil-995408270" target="_blank" rel="noreferrer" className="border border-gray-800 bg-gray-900/60 hover:border-teal-500/50 hover:bg-gray-800 px-5 py-2.5 rounded-lg transition-all duration-300 flex items-center gap-2 text-sm text-gray-300">
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

      {/* 2. Background, Skills & Achievements Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-gray-900 relative z-10">
        <motion.h3 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold mb-10 tracking-tight text-white"
        >
          Background & Capabilities
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Qualifications */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800/80 backdrop-blur-sm space-y-5">
            <div className="flex items-center gap-3 text-teal-400 mb-2">
              <GraduationCap size={22} />
              <h4 className="text-lg font-semibold text-gray-100">Education</h4>
            </div>
            <div className="border-l-2 border-teal-500/40 pl-4 space-y-1">
              <h5 className="font-medium text-gray-200 text-sm">B.Tech CSE</h5>
              <p className="text-xs text-gray-400">IKGPTU Mohali Campus - 1 (2027)</p>
            </div>
            <div className="border-l-2 border-gray-800 pl-4 space-y-1">
              <h5 className="font-medium text-gray-200 text-sm">Diploma in Computer Engineering</h5>
              <p className="text-xs text-gray-400">Govt Polytechnic Hamirpur (2024)</p>
            </div>
          </motion.div>

          {/* Technical Arsenal */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800/80 backdrop-blur-sm space-y-4">
            <div className="flex items-center gap-3 text-teal-400 mb-2">
              <Terminal size={22} />
              <h4 className="text-lg font-semibold text-gray-100">Technical Arsenal</h4>
            </div>
            <div>
              <p className="text-[11px] font-mono text-teal-400 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Code2 size={12}/> Languages</p>
              <p className="text-gray-300 text-xs">C++, Python, JavaScript, SQL</p>
            </div>
            <div>
              <p className="text-[11px] font-mono text-teal-400 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Server size={12}/> Systems</p>
              <p className="text-gray-300 text-xs">MERN Stack, Docker, Microservices</p>
            </div>
            <div>
              <p className="text-[11px] font-mono text-teal-400 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Cpu size={12}/> Core CS</p>
              <p className="text-gray-300 text-xs">OS, Networks, DBMS, Cloud Computing</p>
            </div>
          </motion.div>

          {/* Achievements & Training */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800/80 backdrop-blur-sm space-y-4">
            <div className="flex items-center gap-3 text-teal-400 mb-2">
              <Trophy size={22} />
              <h4 className="text-lg font-semibold text-gray-100">Milestones</h4>
            </div>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-teal-400 mt-0.5">▹</span>
                HACK-O-OCTO Hackathon at Chandigarh University.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 mt-0.5">▹</span>
                Hack-2 Hatch Hackathon at PEC Chandigarh.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 mt-0.5">▹</span>
                6-week Industrial Training in Web & App Development.
              </li>
            </ul>
          </motion.div>

        </div>
      </section>

      {/* 3. Interactive Projects Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-gray-900 relative z-10">
        <div className="mb-10">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">Engineering Architecture</h3>
          <p className="text-gray-400 text-sm">Click any project card to open deep architectural insights and live links.</p>
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
              <p className="text-teal-400 text-xs font-mono mb-3 tracking-wide">{project.subtitle}</p>
              <p className="text-gray-300 text-sm mb-6 flex-grow leading-relaxed">{project.description}</p>
              
              <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400 font-mono">
                <span>View Architecture</span>
                <span className="text-teal-400 font-semibold group-hover:translate-x-1 transition-transform">&rarr;</span>
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
                  <div className="text-teal-400 text-xs font-mono uppercase tracking-widest mb-1">{selectedProject.subtitle}</div>
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
                <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-gray-800/80 border border-gray-700/60 rounded-md text-xs font-mono text-teal-300">
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
                    className="bg-teal-500 hover:bg-teal-400 text-gray-950 font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-2"
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