import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Search, Rocket, Trophy } from 'lucide-react';

// ==========================================
// CONFIGURATION DATA
// ==========================================
const PROCESS_STEPS = [
  {
    id: 1,
    title: "Planning",
    description: "We define goals, KPIs, and strategies tailored to your specific business needs.",
    icon: <ClipboardList className="w-6 h-6 md:w-8 md:h-8" />,
    color: "from-cyan-400 to-blue-500",
    shadow: "shadow-cyan-500/50"
  },
  {
    id: 2,
    title: "Research",
    description: "Deep dive into market trends, competitor analysis, and audience behavior.",
    icon: <Search className="w-6 h-6 md:w-8 md:h-8" />,
    color: "from-purple-400 to-pink-500",
    shadow: "shadow-purple-500/50"
  },
  {
    id: 3,
    title: "Optimizing",
    description: "Continuous implementation of technical SEO, content, and ad performance tweaks.",
    icon: <Rocket className="w-6 h-6 md:w-8 md:h-8" />,
    color: "from-amber-400 to-orange-500",
    shadow: "shadow-orange-500/50"
  },
  {
    id: 4,
    title: "Results",
    description: "Measurable growth, detailed reporting, and scaling your ROI to new heights.",
    icon: <Trophy className="w-6 h-6 md:w-8 md:h-8" />,
    color: "from-emerald-400 to-green-500",
    shadow: "shadow-emerald-500/50"
  }
];

// ==========================================
// SUB-COMPONENT: PROCESS CARD
// ==========================================
const ProcessStep = ({ step, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className="relative flex flex-col items-center md:flex-row md:justify-center w-full md:w-1/4 z-10 group mb-12 md:mb-0">

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        viewport={{ once: true }}
        className={`
          relative md:absolute w-full max-w-xs md:max-w-[280px] p-6 rounded-2xl border border-white/10 bg-[#0f172a]/90 backdrop-blur-xl 
          flex flex-col gap-3 text-center md:text-left mt-6 md:mt-0
          ${isEven ? 'md:-top-[190px]' : 'md:top-[120px]'}
        `}
      >
        <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
          {step.title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed">
          {step.description}
        </p>

        <div className={`hidden md:block absolute left-1/2 -translate-x-1/2 w-[2px] h-10 md:h-16 bg-gradient-to-b ${step.color} opacity-30
          ${isEven ? '-bottom-10 md:-bottom-16' : '-top-10 md:-top-16'}
        `} />
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.2 + 0.1 }}
        viewport={{ once: true }}
        className="relative z-20 order-first md:order-none"
      >
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${step.color} blur-lg opacity-40 group-hover:opacity-80 transition-opacity duration-500`} />
        
        <div className={`
          relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white 
          bg-gradient-to-br ${step.color} shadow-lg ${step.shadow}
          border-4 border-[#021333] z-20 transition-transform duration-300 group-hover:scale-110
        `}>
          {step.icon}
        </div>

        <div className="md:hidden absolute top-14 left-1/2 -translate-x-1/2 w-[2px] h-32 bg-white/10 -z-10" />
      </motion.div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================
const Process = () => {
  return (
    <section className="relative w-full py-24 md:pt-28 md:pb-80 px-4 bg-gradient-to-br from-[#021333] to-[#041e4d] overflow-hidden">
      
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl ">
        
        <div className="text-center mb-16 md:mb-48 py-10">
          <motion.h4 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-3"
          >
            How We Work
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white"
          >
            Our Working <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Process</span>
          </motion.h2>
        </div>

        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center max-w-6xl mx-auto">
          
          <div className="absolute top-[28px] md:top-[32px] left-0 w-full h-1 bg-white/10 hidden md:block rounded-full overflow-hidden">
            <motion.div 
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-1/2 h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-70"
            />
          </div>

          {PROCESS_STEPS.map((step, index) => (
            <ProcessStep key={step.id} step={step} index={index} />
          ))}

        </div>

      </div>
    </section>
  );
};

export default Process;
