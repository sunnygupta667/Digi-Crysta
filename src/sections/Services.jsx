import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaShareAlt, FaMousePointer, FaArrowRight } from 'react-icons/fa';

// ==========================================
// CONFIGURATION DATA
// ==========================================
const SERVICES_DATA = [
  {
    id: 1,
    title: "Search Engine Optimization",
    description: "In case you are looking for SEO solutions we have one of the enhancing options relevant to SEO services that meet up requirements covering budgets.",
    icon: <FaSearch />,
    color: "text-cyan-400",
    glow: "shadow-cyan-500/50",
    border: "from-transparent via-cyan-400 to-transparent"
  },
  {
    id: 2,
    title: "Social Media Optimization",
    description: "Influence your social media for more devotion, more acknowledgment and more clients! We're a top organization for social media marketing.",
    icon: <FaShareAlt />,
    color: "text-fuchsia-400",
    glow: "shadow-fuchsia-500/50",
    border: "from-transparent via-fuchsia-400 to-transparent"
  },
  {
    id: 3,
    title: "Pay Per Click",
    description: "Are you ready for a boom in business with more traffic? We utilize entire advertisement channels to deliver better return on Ads spending ever seen before.",
    icon: <FaMousePointer />,
    color: "text-orange-400",
    glow: "shadow-orange-500/50",
    border: "from-transparent via-orange-400 to-transparent"
  }
];

// ==========================================
// SUB-COMPONENT: HOLOGRAPHIC CARD
// ==========================================
const HolographicCard = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="group relative h-full"
    >
      {/* 1. Animated Border Container */}
      <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-white/10 to-white/5 opacity-50 blur-sm transition-all duration-500 group-hover:opacity-100" />
      
      {/* 2. The Moving Border Animation */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-full animate-border-flow bg-gradient-to-r ${service.border} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} style={{ backgroundSize: '200% 200%' }}></div>
      </div>

      {/* 3. Main Card Body */}
      <div className="relative h-full flex flex-col items-center text-center rounded-2xl bg-[#0f172a] p-8 md:p-10 border border-white/5 transition-transform duration-300 group-hover:-translate-y-2 overflow-hidden">
        
        {/* Background Radial Gradient Effect */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b ${service.border.replace('from-transparent via-', 'from-').replace(' to-transparent', '/10 to-transparent')} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

        {/* Floating Icon with Pulse */}
        <div className="relative mb-8">
          <div className={`absolute inset-0 rounded-full ${service.glow} blur-2xl opacity-20 group-hover:opacity-60 transition-opacity duration-500`} />
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: index // Stagger animations
            }}
            className={`relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white/5 border border-white/10 ${service.color} text-3xl shadow-xl backdrop-blur-md`}
          >
            {service.icon}
          </motion.div>
        </div>

        {/* Content */}
        <h3 className="mb-4 text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
          {service.title}
        </h3>
        
        <p className="mb-8 text-sm leading-relaxed text-gray-400 group-hover:text-gray-300">
          {service.description}
        </p>

        {/* Bottom Action Area */}
        <div className="mt-auto opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <span className={`inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider ${service.color}`}>
            Explore Service <FaArrowRight className="text-xs" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================
const Services = () => {
  return (
    <section className="relative w-full py-24 bg-[#021333] overflow-hidden">
      
      {/* --- ANIMATED BACKGROUND --- */}
      {/* 1. Moving Cyber Lines */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-pulse-slow"></div>
        <div className="absolute top-0 left-2/4 w-[1px] h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent animate-pulse-slow delay-700"></div>
        <div className="absolute top-0 left-3/4 w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent animate-pulse-slow delay-1000"></div>
      </div>

      {/* 2. Floating Orbs */}
      <motion.div 
        animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"
      />
       <motion.div 
        animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block mb-4 px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10"
          >
            <span className="text-blue-300 font-bold uppercase text-xs tracking-[0.2em]">
              Digi Crysta
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6"
          >
            Enhance Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300">
              Productivity & Growth
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Our approach is to brand the same when needed. We listen to your shape designing procedure and guide you through every step smoothly.
          </motion.p>
        </div>

        {/* --- CARDS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, index) => (
            <HolographicCard key={service.id} service={service} index={index} />
          ))}
        </div>

      </div>

      {/* --- CUSTOM ANIMATION STYLES (FIXED) --- */}
      {/* Changed <style jsx> to just <style> */}
      <style>{`
        @keyframes border-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-border-flow {
          animation: border-flow 3s ease infinite;
        }
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default Services;