import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { 
  Skull, 
  AlertTriangle, 
  Terminal, 
  LockKeyhole, 
  Zap,
  Globe,
  Search,
  ServerCrash,
  FileCode,
  ShieldAlert,
  WifiOff
} from 'lucide-react';

// ==========================================
// CONFIGURATION DATA
// ==========================================
// Derived from your provided text, polished for professional presentation
const STRATEGIES = [
  {
    id: 1,
    title: "Content & Service Eminence",
    description: "Focusing on contribution eminence content and services that align with specific, often aggressive, growth targets.",
    icon: <FileCode className="w-6 h-6" />,
    color: "text-red-400",
    gradient: "from-red-500 to-orange-600"
  },
  {
    id: 2,
    title: "Speed & Accessibility",
    description: "Prioritizing fast site load times and mobile-friendliness to ensure rapid indexing and user retention despite aggressive tactics.",
    icon: <Zap className="w-6 h-6" />,
    color: "text-yellow-400",
    gradient: "from-yellow-400 to-orange-500"
  },
  {
    id: 3,
    title: "Expressive Meta Tags",
    description: " utilizing expressive, keyword-rich meta tags to maximize click-through rates and search engine visibility instantly.",
    icon: <Terminal className="w-6 h-6" />,
    color: "text-purple-400",
    gradient: "from-purple-500 to-indigo-600"
  },
  {
    id: 4,
    title: "Navigation Architecture",
    description: "Creation of site structures that are easy to navigate for users, while potentially guiding bots through specific funnels.",
    icon: <Globe className="w-6 h-6" />,
    color: "text-cyan-400",
    gradient: "from-cyan-400 to-blue-500"
  }
];

// ==========================================
// COMPONENT: DIGITAL RAIN ANIMATION
// ==========================================
const DigitalRain = () => {
  // Generate random columns of binary code
  const columns = Array.from({ length: 30 }); 

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 font-mono">
      {columns.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            y: -100, 
            x: Math.random() * 100 + "vw", 
            opacity: 0 
          }}
          animate={{ 
            y: "110vh", 
            opacity: [0, 1, 0] 
          }}
          transition={{ 
            duration: Math.random() * 5 + 5, // Random speed
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 5
          }}
          className="absolute text-[10px] md:text-xs text-blue-500/50 flex flex-col items-center gap-1 leading-none select-none"
        >
          {Array.from({ length: Math.floor(Math.random() * 10 + 5) }).map((_, j) => (
            <span key={j}>{Math.random() > 0.5 ? '1' : '0'}</span>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

// ==========================================
// COMPONENT: GLITCH CARD
// ==========================================
const GlitchCard = ({ strategy, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    x.set(clientX - left);
    y.set(clientY - top);
  }

  const spotlight = useMotionTemplate`
    radial-gradient(
      300px circle at ${x}px ${y}px,
      rgba(255, 255, 255, 0.05),
      transparent 80%
    )
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      className="group relative h-full bg-[#050b1a]/80 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden"
    >
      {/* Spotlight */}
      <motion.div
        style={{ background: spotlight }}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />

      <div className="relative z-10 p-8">
        <div className="flex justify-between items-start mb-6">
          <div className={`p-3 rounded-lg bg-gradient-to-br ${strategy.gradient} bg-opacity-10 shadow-lg group-hover:shadow-red-500/20 transition-all`}>
            <span className="text-white">{strategy.icon}</span>
          </div>
          <LockKeyhole className="w-4 h-4 text-slate-600 group-hover:text-red-400 transition-colors" />
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-200 transition-colors">
          {strategy.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          {strategy.description}
        </p>
      </div>

      {/* Subtle Glitch Line on Hover */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-red-500/50 -translate-x-full group-hover:animate-glitch-slide" />
    </motion.div>
  );
};

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
const BlackHatSEO = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#021333] text-slate-100 font-sans selection:bg-red-500/30 overflow-hidden">
      
      {/* --- BACKGROUND DESIGN --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Radial Dot Texture */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        
        {/* Ambient Darker Lights */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full" />
        
        {/* ANIMATION: Digital Rain */}
        <DigitalRain />
      </div>

      <div className="relative z-10">
        
        {/* --- HERO SECTION --- */}
        <section className="relative pt-32 pb-20 px-6 min-h-[60vh] flex items-center justify-center text-center">
          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <Skull className="w-4 h-4" />
              <span>Aggressive Growth Tactics</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              Black Hat <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">
                SEO Strategies
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"
            >
              Strategies that exist outside the established structures. Used to safeguard websites and reclaim visibility in highly competitive or restricted environments.
            </motion.p>
          </motion.div>
        </section>

        {/* --- CORE DEFINITION --- */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Left: Text */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Beyond the <span className="text-red-400">Rules</span>
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-purple-600 rounded-full mb-6" />
                </div>

                <div className="prose prose-invert text-slate-400 text-lg leading-relaxed space-y-6">
                  <p>
                    The terms <strong>"Black Hat SEO"</strong> offer a comprehensive alignment with the terms and conditions of Google and other search engines used in digital marketing.
                  </p>
                  <p className="border-l-2 border-red-500/30 pl-4 italic text-slate-300">
                    "There aren't many strategies that adhere to established structures, yet the results can be powerful."
                  </p>
                  <p>
                    Black Hat SEO is often used to safeguard websites that have been banned by search engines. With Google being used by millions, it remains one of the most potent tools for attracting traffic, even when sites face a sharp decline in visibility.
                  </p>
                </div>
              </motion.div>

              {/* Right: Visual Terminal */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative bg-[#0a0f1e] border border-slate-700/50 rounded-lg p-1 shadow-2xl font-mono text-sm">
                  {/* Terminal Header */}
                  <div className="bg-slate-800/50 px-4 py-2 flex items-center gap-2 rounded-t-md border-b border-slate-700/50">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-2 text-xs text-slate-400">root@seo-server:~</span>
                  </div>
                  
                  {/* Terminal Body */}
                  <div className="p-6 space-y-2 text-slate-300">
                    <div className="flex gap-2">
                      <span className="text-green-400">➜</span>
                      <span>initiate_protocol --aggressive</span>
                    </div>
                    <div className="text-slate-500 text-xs">Accessing search index...</div>
                    <div className="text-slate-500 text-xs">Bypassing filter blocks...</div>
                    <div className="flex gap-2">
                      <span className="text-green-400">➜</span>
                      <span>deploy_meta_tags --rich</span>
                    </div>
                    <div className="text-yellow-400 text-xs">[WARNING] High keyword density detected.</div>
                    <div className="text-blue-400 text-xs">Traffic flow increasing...</div>
                    <div className="text-blue-400 text-xs">Recovering lost visibility...</div>
                    <div className="flex gap-2 mt-4 animate-pulse">
                      <span className="text-green-400">➜</span>
                      <span className="w-2 h-4 bg-slate-400 block" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- STRATEGIES GRID --- */}
        <section className="py-20 px-6 bg-slate-900/20">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-red-400 font-bold text-sm tracking-wider uppercase mb-2 block">Tactical Overview</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Methodologies</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {STRATEGIES.map((strategy, idx) => (
                <GlitchCard key={strategy.id} strategy={strategy} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* --- IMPORTANCE / RECOVERY SECTION --- */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-5xl relative z-10">
            <div className="bg-gradient-to-br from-[#0f172a] to-[#021333] border border-red-500/10 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(239,68,68,0.05)] relative overflow-hidden">
              
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 text-center md:text-left">
                  <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 text-red-500 mx-auto md:mx-0">
                     <ShieldAlert className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Why is Black Hat Important?</h2>
                  <p className="text-slate-400 leading-relaxed mb-6">
                    In an ecosystem where websites can be banned or penalized abruptly, Black Hat techniques are often employed as a recovery mechanism. It serves as a tool to safeguard assets and attract visitors when traditional channels face a sharp decline.
                  </p>
                </div>

                <div className="flex-1 w-full">
                  {/* Stat Bars */}
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2 text-slate-300">
                        <span>Traffic Recovery Speed</span>
                        <span className="text-red-400 font-bold">Fast</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "90%" }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-red-600 to-orange-500" 
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2 text-slate-300">
                        <span>Risk Factor</span>
                        <span className="text-red-400 font-bold">High</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "85%" }}
                          transition={{ duration: 1, delay: 0.4 }}
                          className="h-full bg-gradient-to-r from-red-600 to-purple-500" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>

      {/* --- CUSTOM CSS FOR GLITCH ANIMATION --- */}
      <style>{`
        @keyframes glitch-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-glitch-slide {
          animation: glitch-slide 1.5s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default BlackHatSEO;