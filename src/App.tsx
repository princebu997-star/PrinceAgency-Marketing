import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Palette, 
  Globe, 
  ChevronDown, 
  Menu, 
  X,
  Instagram
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, AnimatePresence } from 'framer-motion';

// --- Types ---

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  link: string;
  description: string;
  tags: string[];
}

interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
}

// --- Data ---

const PROJECTS: Project[] = [
  {
    id: 'rajaji-haveli',
    title: 'Rajaji Haveli | Family Restaurant',
    category: 'Web Development',
    image: 'https://picsum.photos/seed/restaurant/1200/800',
    link: 'https://rajajihaveli.netlify.app/',
    description: 'A premium, responsive website for a traditional family restaurant. Features a digital showcase of their heritage, menu, and location with a focus on elegant UI and smooth user experience.',
    tags: ['React', 'Tailwind CSS', 'Netlify', 'Responsive']
  },
  {
    id: 'flight-local',
    title: 'Flight Local | Travel Booking',
    category: 'Web App',
    image: 'https://picsum.photos/seed/travel/1200/800',
    link: '#',
    description: 'A comprehensive flight booking platform designed for local travel agencies. Includes real-time search, booking management, and an admin dashboard for agents.',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL']
  },
  {
    id: 'neon-dashboard',
    title: 'Neon Analytics | SaaS Dashboard',
    category: 'UI/UX Design',
    image: 'https://picsum.photos/seed/dashboard/1200/800',
    link: '#',
    description: 'A futuristic, data-heavy dashboard for a crypto analytics platform. Focus on data visualization, dark mode aesthetics, and real-time updates.',
    tags: ['Figma', 'React', 'D3.js', 'Tailwind']
  }
];

const EXPERIENCES: Experience[] = [
  {
    id: 'freelance',
    role: 'Senior Frontend Developer',
    company: 'Freelance',
    period: '2023 - Present',
    description: [
      'Delivered 15+ high-performance web applications for international clients.',
      'Specialized in React, Next.js, and modern CSS frameworks.',
      'Improved site performance scores by an average of 40% for client projects.'
    ],
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS']
  },
  {
    id: 'agency',
    role: 'Web Developer',
    company: 'Creative Agency',
    period: '2021 - 2023',
    description: [
      'Collaborated with designers to translate Figma designs into pixel-perfect code.',
      'Built and maintained component libraries used across multiple projects.',
      'Mentored junior developers and conducted code reviews.'
    ],
    skills: ['JavaScript', 'HTML/CSS', 'Vue.js', 'Git']
  }
];

// --- Components ---

const MouseFollower = () => {
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      backgroundColor: "transparent",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      height: 32,
      width: 32,
      transition: {
        type: "spring",
        mass: 0.6
      }
    },
    text: {
      height: 80,
      width: 80,
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "none",
      mixBlendMode: "difference" as any,
      transition: {
        type: "spring",
        mass: 0.6
      }
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] hidden md:block"
      variants={variants}
      animate={cursorVariant}
    />
  );
};

const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 200); // Amplify movement
    y.set(yPct * 200);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      <div style={{ transform: "translateZ(50px)" }} className="h-full">
        {children}
      </div>
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#050505]/95 backdrop-blur-md py-4 shadow-xl' : 'py-6 md:py-8'}`}>
        <div className="mx-auto px-4 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <button 
              className="w-12 h-12 rounded-full bg-white/10 flex flex-col items-center justify-center gap-1.5 hover:bg-white/20 transition-all border border-white/20 group shadow-lg" 
              onClick={() => setIsOpen(true)}
              aria-label="Open Menu"
            >
              <div className="w-6 h-[2px] bg-white group-hover:bg-accent transition-colors"></div>
              <div className="w-6 h-[2px] bg-white group-hover:bg-accent transition-colors"></div>
            </button>
            <motion.a 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              href="#home" 
              className="text-2xl font-bold tracking-tighter"
            >
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Prince Agency</span><span className="text-white">.</span><span className="logo-cursor text-purple-500">_</span>
            </motion.a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            <a href="mailto:princep243502@gmail.com" className="text-white/80 hover:text-accent transition-colors flex items-center gap-2 font-mono text-sm">
              <Mail size={18} />
              <span>princep243502@gmail.com</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Side Nav Drawer - Moved outside nav to fix stacking context */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[280px] md:w-[400px] bg-[#050505] z-[110] flex flex-col p-8 md:p-12 border-r border-white/10 shadow-2xl"
            >
              <button className="self-end w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all mb-12 border border-white/10" onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
              <div className="flex flex-col gap-6 md:gap-8">
                <a href="#home" className="text-2xl md:text-3xl font-bold hover:text-accent transition-colors font-mono flex items-center group" onClick={() => setIsOpen(false)}>
                  <span className="text-accent mr-3 opacity-0 group-hover:opacity-100 transition-opacity text-sm md:text-base">//</span>home
                </a>
                <a href="#expertise" className="text-2xl md:text-3xl font-bold hover:text-accent transition-colors font-mono flex items-center group" onClick={() => setIsOpen(false)}>
                  <span className="text-accent mr-3 opacity-0 group-hover:opacity-100 transition-opacity text-sm md:text-base">//</span>expertise
                </a>
                <a href="#work" className="text-2xl md:text-3xl font-bold hover:text-accent transition-colors font-mono flex items-center group" onClick={() => setIsOpen(false)}>
                  <span className="text-accent mr-3 opacity-0 group-hover:opacity-100 transition-opacity text-sm md:text-base">//</span>work
                </a>
                <a href="#experience" className="text-2xl md:text-3xl font-bold hover:text-accent transition-colors font-mono flex items-center group" onClick={() => setIsOpen(false)}>
                  <span className="text-accent mr-3 opacity-0 group-hover:opacity-100 transition-opacity text-sm md:text-base">//</span>experience
                </a>
                <a href="#contact" className="text-2xl md:text-3xl font-bold hover:text-accent transition-colors font-mono flex items-center group" onClick={() => setIsOpen(false)}>
                  <span className="text-accent mr-3 opacity-0 group-hover:opacity-100 transition-opacity text-sm md:text-base">//</span>contact
                </a>
              </div>

              <div className="mt-auto pt-8 border-t border-white/10">
                <p className="text-[10px] font-mono text-text-secondary uppercase tracking-widest mb-4">Socials</p>
                <div className="flex gap-5">
                  <a href="https://instagram.com/prince_96977" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-accent transition-colors"><Instagram size={20} /></a>
                  <a href="#" className="text-white/80 hover:text-accent transition-colors"><Github size={20} /></a>
                  <a href="mailto:princep243502@gmail.com" className="text-white/80 hover:text-accent transition-colors"><Mail size={20} /></a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/10 via-[#050505] to-[#050505] opacity-50 blur-3xl"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-accent font-mono mb-6 tracking-widest text-sm md:text-base uppercase"
        >
          Creative Developer & Designer
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hero-title mb-8 leading-tight"
        >
          Crafting Digital <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">Experiences</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="hero-subtitle text-text-secondary"
        >
          I build accessible, pixel-perfect, performant, and engaging digital experiences for the web.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <a href="#work" className="group relative px-8 py-4 bg-white text-black font-bold tracking-wider overflow-hidden rounded-full transition-transform hover:scale-105">
            <span className="relative z-10 flex items-center gap-2">
              VIEW WORK <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
          </a>
          <a href="#contact" className="px-8 py-4 border border-white/20 rounded-full hover:bg-white/5 transition-colors font-mono text-sm tracking-widest uppercase">
            Contact Me
          </a>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Scroll</span>
        <div className="scroll-indicator">
          <div className="scroll-dot"></div>
        </div>
      </motion.div>
    </section>
  );
};

const Expertise = () => {
  const skills = [
    { name: 'Frontend Dev', icon: <Code2 size={32} />, desc: 'React, Next.js, TypeScript, Tailwind' },
    { name: 'UI/UX Design', icon: <Palette size={32} />, desc: 'Figma, Prototyping, Design Systems' },
    { name: 'Motion', icon: <Globe size={32} />, desc: 'Framer Motion, GSAP, WebGL' },
  ];

  return (
    <section id="expertise" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="section-title">Expertise</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <TiltCard key={index} className="h-full">
              <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-2xl h-full hover:bg-white/10 transition-colors group">
                <div className="mb-6 text-accent group-hover:text-white transition-colors duration-300">
                  {skill.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{skill.name}</h3>
                <p className="text-text-secondary leading-relaxed">{skill.desc}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const Work = () => {
  return (
    <section id="work" className="py-24 md:py-32 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="section-title">Selected Work</h2>
        
        <div className="flex flex-col gap-20 md:gap-32">
          {PROJECTS.map((project, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              key={project.id} 
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center`}
            >
              <div className="w-full md:w-3/5 group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl aspect-video shadow-2xl border border-white/5">
                  <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-20 transition-opacity z-10"></div>
                  {project.id === 'rajaji-haveli' ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
                        referrerPolicy="no-referrer"
                      />
                    </a>
                  ) : (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
              </div>
              
              <div className="w-full md:w-2/5 flex flex-col justify-center">
                <span className="text-accent font-mono text-xs tracking-widest uppercase mb-4">{project.category}</span>
                {project.id === 'rajaji-haveli' ? (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                    <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">{project.title}</h3>
                  </a>
                ) : (
                  <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">{project.title}</h3>
                )}
                <p className="text-text-secondary mb-8 leading-relaxed text-lg">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 border border-white/20 rounded-full text-xs font-mono text-white/80 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-6">
                  {project.id === 'rajaji-haveli' && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-accent transition-colors border-b border-transparent hover:border-accent pb-1 w-fit">
                      <span className="uppercase tracking-widest text-sm font-bold">Visit Site</span>
                      <ExternalLink size={16} />
                    </a>
                  )}
                  {project.id !== 'rajaji-haveli' && (
                    <a href={project.link} className="flex items-center gap-2 text-white hover:text-accent transition-colors border-b border-transparent hover:border-accent pb-1 w-fit">
                      <span className="uppercase tracking-widest text-sm font-bold">View Project</span>
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h2 className="section-title">Where I've Worked</h2>
        
        <div className="space-y-12">
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="group">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-accent transition-colors">
                  {exp.role} <span className="text-accent">@ {exp.company}</span>
                </h3>
                <span className="font-mono text-sm text-text-secondary mt-2 md:mt-0">{exp.period}</span>
              </div>
              
              <ul className="space-y-4 mb-6">
                {exp.description.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-text-secondary leading-relaxed">
                    <span className="text-accent mt-1.5 text-xs">▹</span>
                    {item}
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-wrap gap-3">
                {exp.skills.map(skill => (
                  <span key={skill} className="text-xs font-mono text-white/50 bg-white/5 px-2 py-1 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <p className="text-accent font-mono text-sm tracking-widest uppercase mb-6">What's Next?</p>
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Get In Touch</h2>
        <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          I'm currently looking for new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        
        <a href="mailto:princep243502@gmail.com" className="inline-block px-10 py-5 border border-accent text-accent hover:bg-accent/10 transition-colors rounded font-mono text-sm tracking-widest uppercase">
          Say Hello
        </a>

        <div className="mt-24 flex justify-center gap-8">
          <a href="#" className="text-text-secondary hover:text-accent transition-colors transform hover:-translate-y-1 duration-300">
            <Github size={24} />
          </a>
          <a href="https://instagram.com/prince_96977" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors transform hover:-translate-y-1 duration-300">
            <Instagram size={24} />
          </a>
          <a href="#" className="text-text-secondary hover:text-accent transition-colors transform hover:-translate-y-1 duration-300">
            <Linkedin size={24} />
          </a>
        </div>
      </div>
      
      <footer className="absolute bottom-6 w-full text-center">
        <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
          Designed & Built by Prince Agency
        </p>
      </footer>
    </section>
  );
};

function App() {
  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-accent/30 selection:text-white">
      <MouseFollower />
      <Navbar />
      <main>
        <Hero />
        <Expertise />
        <Work />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}

export default App;
