import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  Users, 
  Search, 
  Target, 
  Lightbulb, 
  DollarSign, 
  MonitorPlay,
  ArrowRight
} from 'lucide-react';

// ==========================================
// CONFIGURATION DATA
// ==========================================
const CARDS_DATA = [
  {
    id: 1,
    title: "Welcome To Digi Crysta",
    description: "We are eager to brand your items by listening to your clients' and partners' daily steps in the creative process.",
    icon: <Settings className="w-8 h-8" />,
    color: "bg-blue-500",
    gradient: "from-blue-400 to-blue-600"
  },
  {
    id: 2,
    title: "How do we operate?",
    description: "As one of the top SEO companies, we guarantee to rank in the top 10. Furthermore, given the current situation, it is reasonable to increase traffic and produce online leads.",
    icon: <MonitorPlay className="w-8 h-8" />,
    color: "bg-cyan-500",
    gradient: "from-cyan-400 to-blue-500"
  },
  {
    id: 3,
    title: "What we do?",
    description: "We have the ability to change business all around the world. When using various search engines, over 85% of internet users intend to make a purchase.",
    icon: <Users className="w-8 h-8" />,
    color: "bg-indigo-500",
    gradient: "from-indigo-400 to-purple-600"
  }
];

// ==========================================
// SUB-COMPONENT: 3D TILT INFO CARD
// ==========================================
const InfoCard = ({ card, index }) => {
  // --- 3D TILT LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  
  // Dynamic sheen gradient that follows mouse
  const sheenGradient = useTransform(
    mouseX,
    [-0.5, 0.5],
    ["linear-gradient(115deg, transparent 0%, rgba(255,255,255,0) 100%)", "linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.05) 100%)"]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative w-full perspective-1000"
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative p-6 md:p-8 rounded-2xl bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transition-shadow duration-300 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.2)] overflow-hidden h-full"
      >
        {/* Sheen Overlay */}
        <motion.div 
          style={{ background: sheenGradient }}
          className="absolute inset-0 z-20 pointer-events-none"
        />

        {/* Hover Gradient Background (Behind content) */}
        <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-10`} />
        
        {/* Content Container with Z-translation for depth */}
        <div style={{ transform: "translateZ(20px)" }} className="relative z-10">
          {/* Icon */}
          <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${card.color} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
            <div className={`text-${card.color.split('-')[1]}-400`}>
              <span className="text-white group-hover:text-blue-200 transition-colors">
                {card.icon}
              </span>
            </div>
          </div>

          <h3 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
            {card.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {card.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================
const AboutSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="relative w-full py-16 md:py-24 bg-gradient-to-br from-[#021333] to-[#041e4d] overflow-hidden">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">

        {/* --- TOP SECTION: 3D CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-32">
          {CARDS_DATA.map((card, idx) => (
            <InfoCard key={card.id} card={card} index={idx} />
          ))}
        </div>

        {/* --- BOTTOM SECTION: SPLIT CONTENT --- */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* LEFT: THE "DIGITAL ORBIT" ANIMATION */}
          <div className="w-full lg:w-1/2 relative h-[350px] md:h-[500px] flex items-center justify-center overflow-hidden lg:overflow-visible">
            
            <div className="relative w-full h-full flex items-center justify-center scale-[0.55] sm:scale-75 md:scale-100 origin-center transition-transform duration-300">
                {/* Central Glow */}
                <div className="absolute w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />

                {/* Orbit Rings */}
                <div className="absolute w-[300px] h-[300px] border border-dashed border-blue-400/30 rounded-full animate-spin-slow" />
                <div className="absolute w-[450px] h-[450px] border border-dashed border-indigo-400/30 rounded-full animate-spin-reverse-slow" />

                {/* Central Hub (Laptop Representation) */}
                <motion.div 
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 w-40 h-28 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-2xl shadow-blue-500/30 flex items-center justify-center transform perspective-1000 rotate-x-12"
                >
                  {/* Screen Glow */}
                  <div className="absolute inset-1 bg-white/10 rounded-lg blur-sm" />
                  
                  <div className="absolute bottom-0 w-full h-1 bg-white/20" />
                  <Search className="relative z-20 text-white w-12 h-12 opacity-90 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                  
                  {/* Floating Base */}
                  <div className="absolute -bottom-10 w-32 h-4 bg-black/40 blur-xl rounded-full" />
                </motion.div>

                {/* Orbiting Satellite 1: Target */}
                <motion.div 
                  className="absolute"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{ width: "300px", height: "300px" }}
                >
                  <motion.div 
                    whileHover={{ scale: 1.2 }}
                    className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#0f172a] rounded-full shadow-[0_0_20px_rgba(248,113,113,0.3)] border border-red-400/50 flex items-center justify-center animate-counter-spin cursor-pointer"
                  >
                    <Target className="w-6 h-6 text-red-400" />
                  </motion.div>
                </motion.div>

                {/* Orbiting Satellite 2: Dollar/Growth */}
                <motion.div 
                  className="absolute"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  style={{ width: "450px", height: "450px" }}
                >
                  <motion.div 
                    whileHover={{ scale: 1.2 }}
                    className="absolute top-1/2 -right-6 -translate-y-1/2 w-12 h-12 bg-[#0f172a] rounded-full shadow-[0_0_20px_rgba(74,222,128,0.3)] border border-green-400/50 flex items-center justify-center animate-counter-spin cursor-pointer"
                  >
                    <DollarSign className="w-6 h-6 text-green-400" />
                  </motion.div>
                </motion.div>

                {/* Orbiting Satellite 3: Ideas */}
                <motion.div 
                  className="absolute"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  style={{ width: "450px", height: "450px" }}
                >
                  <motion.div 
                    whileHover={{ scale: 1.2 }}
                    className="absolute top-1/2 -left-6 -translate-y-1/2 w-12 h-12 bg-[#0f172a] rounded-full shadow-[0_0_20px_rgba(251,191,36,0.3)] border border-amber-400/50 flex items-center justify-center animate-counter-spin cursor-pointer"
                  >
                    <Lightbulb className="w-6 h-6 text-amber-400" />
                  </motion.div>
                </motion.div>
            </div>

          </div>

          {/* RIGHT: CONTENT */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            <div className="mb-2 w-12 h-1 bg-blue-500 rounded-full mx-auto lg:mx-0" />
            <h4 className="text-xs md:text-sm font-bold text-blue-400 tracking-widest uppercase mb-4">
              About Our Agency
            </h4>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              Get 30% Off Now <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                on Digital Marketing Services in Noida
              </span>
            </h2>
            
            <p className="text-base md:text-lg text-gray-300 mb-6 leading-relaxed">
              As a division of Energy and Internet of Things, we are Digi Crysta, one of Noida's top digital marketing agencies. With more than 15+ workers from more than 100 skill sets, the company is based in Delhi NCR, the capital of India.
            </p>
            
            <p className="text-sm md:text-base text-gray-400 mb-8 leading-relaxed">
              In the Indian subcontinent, Digi Crysta has been a top supplier of technology and digital marketing (SEO, SEM, SMO, and PPC) staff augmentation and solutions since 2020.
            </p>

            {/* EXPANDABLE TEXT SECTION */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="text-sm md:text-base text-gray-300 mb-8 leading-relaxed border-l-2 border-blue-500 pl-4 bg-white/5 p-4 rounded-r-lg">
                    <h5 className="font-bold text-white mb-2">Increase Business Productivity with Noida's Top Digital Marketing Firm, Digi Crysta</h5>
                    <p className="mb-2">Our strategy is to use the same brand for the same purpose.</p>
                    <p>In order to ensure that every phase of the shape design process goes well, we also begin by listening to our clients.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="inline-block"
            >
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="group flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-300 mx-auto lg:mx-0"
              >
                {isExpanded ? 'Read Less' : 'Know More'}
                <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? '-rotate-90' : 'group-hover:translate-x-1'}`} />
              </button>
            </motion.div>
          </motion.div>
        </div>

      </div>

      {/* --- CSS FOR ORBIT ANIMATIONS --- */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse-slow {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        /* Counter-spin keeps the icon upright while its parent container rotates */
        @keyframes counter-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-reverse-slow {
          animation: spin-reverse-slow 25s linear infinite;
        }
        .animate-counter-spin {
          animation: counter-spin 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default AboutSection;