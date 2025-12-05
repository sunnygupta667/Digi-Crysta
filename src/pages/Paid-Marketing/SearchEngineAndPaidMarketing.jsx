import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { 
  Search, 
  Globe, 
  ShoppingBag, 
  MapPin, 
  Smartphone, 
  Megaphone, 
  FileText, 
  Link, 
  Scissors, 
  BarChart2,
  Award,
  Users,
  Briefcase,
  Layers,
  Cpu
} from 'lucide-react';

// ==========================================
// CONFIGURATION DATA
// ==========================================
const SEM_LIBRARY = [
  { title: "Branding", icon: <Award className="w-5 h-5" />, desc: "Strategies for building brand identity through search." },
  { title: "Landing Pages", icon: <FileText className="w-5 h-5" />, desc: "Optimizing destination pages for maximum conversion." },
  { title: "Local Search", icon: <MapPin className="w-5 h-5" />, desc: "Dominate local listings and map packs." },
  { title: "Mobile Search", icon: <Smartphone className="w-5 h-5" />, desc: "Tailoring campaigns for the mobile-first world." },
  { title: "Public Relations", icon: <Megaphone className="w-5 h-5" />, desc: "Managing reputation and news visibility." },
  { title: "Shopping Search", icon: <ShoppingBag className="w-5 h-5" />, desc: "Product listing ads and merchant center optimization." },
];

const SEM_TOOLS = [
  { title: "Keyword Research", icon: <Search className="w-6 h-6" />, color: "text-blue-400", bg: "bg-blue-500/10" },
  { title: "Link Building", icon: <Link className="w-6 h-6" />, color: "text-green-400", bg: "bg-green-500/10" },
  { title: "URL Shorteners", icon: <Scissors className="w-6 h-6" />, color: "text-purple-400", bg: "bg-purple-500/10" },
  { title: "Web Analytics", icon: <BarChart2 className="w-6 h-6" />, color: "text-orange-400", bg: "bg-orange-500/10" },
];

const SEM_INDUSTRY = [
  "Acquisition",
  "Awards",
  "Community",
  "Conferences",
  "Organizations",
  "Statistics"
];

// ==========================================
// COMPONENT: DIGITAL TARGET SCOPE ANIMATION
// ==========================================
const TargetScope = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Moving Crosshair */}
      <motion.div
        animate={{ 
          x: ["10vw", "80vw", "20vw", "90vw", "50vw"],
          y: ["10vh", "20vh", "80vh", "70vh", "50vh"],
        }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear",
          times: [0, 0.25, 0.5, 0.75, 1]
        }}
        className="absolute top-0 left-0 w-64 h-64 border border-cyan-500/10 rounded-full flex items-center justify-center"
      >
        <div className="absolute w-full h-[1px] bg-cyan-500/20" />
        <div className="absolute h-full w-[1px] bg-cyan-500/20" />
        <div className="w-48 h-48 border border-cyan-500/10 rounded-full animate-ping-slow" />
        <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee]" />
      </motion.div>

      {/* Floating Data Points */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut"
          }}
          style={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`
          }}
          className="absolute w-32 h-32 border border-dashed border-white/5 rounded-full flex items-center justify-center"
        >
          <div className="w-1 h-1 bg-white/20 rounded-full" />
        </motion.div>
      ))}
    </div>
  );
};

// ==========================================
// COMPONENT: INTERACTIVE CARD
// ==========================================
const InfoCard = ({ item, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    x.set(clientX - left);
    y.set(clientY - top);
  }

  const spotlight = useMotionTemplate`
    radial-gradient(
      250px circle at ${x}px ${y}px,
      rgba(6, 182, 212, 0.1), 
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
      className="group relative h-full bg-[#0a162e]/60 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300"
    >
      <motion.div
        style={{ background: spotlight }}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />

      <div className="relative z-10 p-6 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 group-hover:text-white transition-colors">
            {item.icon}
          </div>
          <h3 className="font-bold text-white text-lg group-hover:text-cyan-300 transition-colors">
            {item.title}
          </h3>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
};

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
const SearchEngineAndPaidMarketing = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#021333] text-slate-100 font-sans selection:bg-cyan-500/30 overflow-hidden">
      
      {/* --- BACKGROUND DESIGN --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Radial Dot Texture */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        
        {/* Ambient Lights */}
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full" />
        
        {/* ANIMATION: Target Scope */}
        <TargetScope />
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <Cpu className="w-4 h-4" />
              <span>Comprehensive SEM Strategies</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              Search Engine & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Paid Marketing
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"
            >
              Every day, Search Engine Land publishes news articles on search advertising in addition to regular in-the-channel strategies, guidance, and tips from our knowledgeable authors.
            </motion.p>
          </motion.div>
        </section>

        {/* --- SEM LIBRARY ARCHIVES --- */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-cyan-400 font-bold text-sm tracking-wider uppercase mb-2 block">Knowledge Base</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">SEM Library Archives</h2>
              <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
                All of the stories we've written about SEM are collected here. Explore our specialized subcategories:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SEM_LIBRARY.map((item, idx) => (
                <InfoCard key={idx} item={item} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* --- TOOLS & INDUSTRY --- */}
        <section className="py-20 px-6 bg-slate-900/30">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              
              {/* Left: SEM Tools */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <Layers className="w-6 h-6 text-cyan-400" />
                  SEM Tools & Tech
                </h3>
                <div className="space-y-4">
                  {SEM_TOOLS.map((tool, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-[#0a162e] border border-white/5 hover:border-white/10 transition-colors">
                      <div className={`p-3 rounded-lg ${tool.bg} ${tool.color}`}>
                        {tool.icon}
                      </div>
                      <span className="text-white font-medium text-lg">{tool.title}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right: SEM Industry */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-blue-400" />
                  SEM Industry Landscape
                </h3>
                <div className="bg-gradient-to-br from-[#0f172a] to-[#0a162e] p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] rounded-full pointer-events-none" />
                  
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    The SEM industry sector focuses on inquiry-promoting rather than just advertising. We cover major subsections including:
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {SEM_INDUSTRY.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-3 text-xs text-slate-500 uppercase tracking-widest font-bold">
                      <Globe className="w-4 h-4" />
                      Global Coverage
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

      </div>

      {/* --- CSS FOR ANIMATIONS --- */}
      <style>{`
        @keyframes ping-slow {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default SearchEngineAndPaidMarketing;