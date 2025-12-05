import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { 
  PenTool, 
  Layers, 
  Hexagon, 
  Briefcase, 
  Lightbulb, 
  Feather, 
  LayoutTemplate, 
  CheckCircle,
  Palette,
  MousePointer2
} from 'lucide-react';

// ==========================================
// HELPER COMPONENTS
// ==========================================
// Moved up to ensure they are defined before usage in PROCESS_STEPS
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>
);

const AwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
);

// ==========================================
// CONFIGURATION DATA
// ==========================================
const PROCESS_STEPS = [
  {
    id: 1,
    title: "Needs Analysis",
    description: "We look closely at your needs, objectives, mission, and goals to determine the ideal logo for your company.",
    icon: <SearchIcon />,
    gradient: "from-purple-500 to-indigo-500"
  },
  {
    id: 2,
    title: "Bespoke Design",
    description: "Our bespoke logo design is the ideal fusion of fashion and functionality, capable of outlining ideas and igniting passion.",
    icon: <Palette className="w-6 h-6" />,
    gradient: "from-pink-500 to-rose-500"
  },
  {
    id: 3,
    title: "Business Ready",
    description: "We provide tokens/assets you can easily use on business cards, letterheads, and digital locales immediately.",
    icon: <Briefcase className="w-6 h-6" />,
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    id: 4,
    title: "Expertise & Standing",
    description: "Our meticulous assurance speaks volumes about our expertise. Rely on our ability to create the perfect arrangement.",
    icon: <AwardIcon />,
    gradient: "from-amber-400 to-orange-500"
  }
];

// ==========================================
// COMPONENT: CREATIVE VECTOR FLOW ANIMATION
// ==========================================
const CreativeVectorFlow = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <svg className="w-full h-full">
        {/* Animated Bezier Curve 1 */}
        <motion.path
          d="M0 100 Q 250 250 500 100 T 1000 100"
          fill="none"
          stroke="url(#grad1)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 0],
            opacity: [0, 0.5, 0],
            x: [0, 100, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Animated Bezier Curve 2 */}
        <motion.path
          d="M-100 300 C 200 100, 400 500, 800 300"
          fill="none"
          stroke="url(#grad2)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 0],
            opacity: [0, 0.5, 0],
            x: [0, -50, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Floating Shapes */}
        {[1, 2, 3, 4].map((i) => (
          <motion.rect
            key={i}
            width="40"
            height="40"
            x={Math.random() * 100 + "%"}
            y={Math.random() * 100 + "%"}
            fill="transparent"
            stroke="rgba(168, 85, 247, 0.2)"
            strokeWidth="2"
            rx="10"
            animate={{ 
              rotate: 360,
              y: [0, -50, 0],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              delay: i * 3
            }}
          />
        ))}

        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
            <stop offset="50%" stopColor="#d946ef" stopOpacity="1" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// ==========================================
// COMPONENT: INTERACTIVE FEATURE CARD
// ==========================================
const DesignCard = ({ item, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    x.set(clientX - left);
    y.set(clientY - top);
  }

  const spotlight = useMotionTemplate`
    radial-gradient(
      350px circle at ${x}px ${y}px,
      rgba(217, 70, 239, 0.1), 
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
      className="group relative h-full bg-[#0a162e]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300"
    >
      {/* Spotlight Effect (Purple Tint) */}
      <motion.div
        style={{ background: spotlight }}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />

      <div className="relative z-10 p-8 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <span className="text-white drop-shadow-md">{item.icon}</span>
          </div>
          <div className="bg-white/5 p-1.5 rounded-lg border border-white/10 group-hover:border-purple-500/30 transition-colors">
            <Feather className="w-4 h-4 text-slate-400 group-hover:text-purple-400" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
          {item.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed flex-grow">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
const LogoDesigning = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#021333] text-slate-100 font-sans selection:bg-purple-500/30 overflow-hidden">
      
      {/* --- BACKGROUND DESIGN --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Radial Dot Texture */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        
        {/* Ambient Creative Lights */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full" />
        
        {/* ANIMATION: Creative Vector Flow */}
        <CreativeVectorFlow />
      </div>

      <div className="relative z-10">
        
        {/* --- HERO SECTION --- */}
        <section className="relative pt-32 pb-20 px-6 min-h-[60vh] flex items-center justify-center text-center">
          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            className="max-w-4xl mx-auto"
          >
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <PenTool className="w-4 h-4" />
              <span>Identity & Branding</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              Logo <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                Designing
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"
            >
              Customers are familiar with a brand; if you want to enthrall everyone, just use a clear and concise emblem. Our meticulous assurance speaks volumes about our expertise.
            </motion.p>
          </motion.div>
        </section>

        {/* --- STRATEGY CONTENT --- */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Fusion of <span className="text-purple-400">Fashion & Function</span>
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6" />
                </div>

                <div className="prose prose-invert text-slate-400 text-lg leading-relaxed space-y-6">
                  <p>
                    Over the years, we have gained recognition and distinction for our commitment to meeting the needs of our clients. We look at your needs, objectives, mission, and goals to determine the ideal logo for your company.
                  </p>
                  <p>
                    Generally speaking, you may rely on our ability to create the perfect arrangement that represents your company's name. Our bespoke logo design is capable of outlining ideas and igniting passion for your image.
                  </p>
                  
                  <div className="flex gap-4 mt-4">
                    <div className="flex-1 p-4 rounded-xl bg-purple-900/10 border border-purple-500/20">
                      <div className="flex items-center gap-3 mb-2">
                        <Hexagon className="w-5 h-5 text-purple-400" />
                        <h4 className="font-bold text-white text-sm">Concise Emblem</h4>
                      </div>
                      <p className="text-xs text-slate-400">Clear visual identity.</p>
                    </div>
                    <div className="flex-1 p-4 rounded-xl bg-pink-900/10 border border-pink-500/20">
                      <div className="flex items-center gap-3 mb-2">
                        <Lightbulb className="w-5 h-5 text-pink-400" />
                        <h4 className="font-bold text-white text-sm">Ideal Logo</h4>
                      </div>
                      <p className="text-xs text-slate-400">Aligned with your mission.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Visual Representation (Artboard Mockup) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative h-full min-h-[400px] flex items-center justify-center"
              >
                <div className="relative w-[350px] aspect-square bg-[#0f172a] rounded-xl border border-slate-700 shadow-2xl p-6 relative overflow-hidden group">
                  {/* Grid Background */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10" />
                  
                  {/* Tools Header */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="text-slate-500 text-xs font-mono">logo_v1.ai</div>
                  </div>

                  {/* Logo Concept Construction */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-32 h-32">
                       {/* Geometric Shapes */}
                       <motion.div 
                         animate={{ rotate: 360 }}
                         transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                         className="absolute inset-0 border-2 border-dashed border-purple-500/30 rounded-full"
                       />
                       <div className="absolute inset-0 border-2 border-cyan-500/50 rounded-lg transform rotate-45" />
                       <div className="absolute inset-4 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-lg shadow-lg shadow-purple-500/40 flex items-center justify-center">
                          <Hexagon className="w-16 h-16 text-white" />
                       </div>
                       
                       {/* Guide Lines */}
                       <div className="absolute -left-10 top-1/2 w-[200px] h-[1px] bg-blue-500/20" />
                       <div className="absolute left-1/2 -top-10 h-[200px] w-[1px] bg-blue-500/20" />
                    </div>
                  </div>

                  {/* Cursor */}
                  <motion.div 
                    animate={{ 
                      x: [50, 100, 80],
                      y: [100, 150, 120]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 left-0 text-white drop-shadow-md"
                  >
                    <MousePointer2 className="w-6 h-6 fill-black" />
                  </motion.div>
                </div>

                {/* Floating Palettes */}
                <motion.div 
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-6 top-20 bg-slate-800 p-3 rounded-lg border border-slate-600 shadow-xl"
                >
                  <div className="flex gap-2">
                    <div className="w-4 h-4 rounded-full bg-purple-500" />
                    <div className="w-4 h-4 rounded-full bg-pink-500" />
                    <div className="w-4 h-4 rounded-full bg-cyan-500" />
                  </div>
                </motion.div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* --- PROCESS GRID --- */}
        <section className="py-20 px-6 bg-slate-900/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-purple-400 font-bold text-sm tracking-wider uppercase mb-2 block">Our Process</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Crafting Excellence</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROCESS_STEPS.map((item, idx) => (
                <DesignCard key={item.id} item={item} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/20 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
              
              <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Free Your Time</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                 If you give us the task of creating your association's logo, you are free to devote your time to other important business matters.
              </p>
              <button className="relative z-10 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
                <PenTool className="w-5 h-5" />
                Start Designing
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default LogoDesigning;