import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, Search, Rocket, Trophy, ArrowRight } from 'lucide-react';

// ==========================================
// CONFIGURATION DATA
// ==========================================
const PROCESS_STEPS = [
  {
    id: 1,
    title: "Planning",
    short: "Plan",
    description: "We define goals, KPIs, and strategies tailored to your specific business needs.",
    icon: <ClipboardList />,
    color: "bg-blue-500",
    text: "text-blue-400",
    border: "border-blue-500",
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    id: 2,
    title: "Research",
    short: "Research",
    description: "Deep dive into market trends, competitor analysis, and audience behavior.",
    icon: <Search />,
    color: "bg-purple-500",
    text: "text-purple-400",
    border: "border-purple-500",
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: 3,
    title: "Optimizing",
    short: "Optimize",
    description: "Continuous implementation of technical SEO, content, and ad performance tweaks.",
    icon: <Rocket />,
    color: "bg-amber-500",
    text: "text-amber-400",
    border: "border-amber-500",
    gradient: "from-amber-500/20 to-orange-500/20"
  },
  {
    id: 4,
    title: "Results",
    short: "Result",
    description: "Measurable growth, detailed reporting, and scaling your ROI to new heights.",
    icon: <Trophy />,
    color: "bg-emerald-500",
    text: "text-emerald-400",
    border: "border-emerald-500",
    gradient: "from-emerald-500/20 to-green-500/20"
  }
];

// ==========================================
// MAIN COMPONENT
// ==========================================
const Process = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="relative w-full py-20 md:py-32 bg-gradient-to-br from-[#021333] to-[#041e4d] overflow-hidden">
      
      {/* --- BACKGROUND FX --- */}
      {/* 1. Static Mesh Grid */}
      <div className="absolute inset-0 opacity-[0.05]" 
           style={{ 
             backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
             backgroundSize: '30px 30px' 
           }}>
      </div>

      {/* 2. Rotating Gradient Orb */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm mb-4"
          >
            <span className="text-blue-300 font-semibold text-xs tracking-widest uppercase">The Workflow</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Process at <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Digi Crysta</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-xl mx-auto"
          >
            We simplify complex digital challenges into four strategic steps.
          </motion.p>
        </div>

        {/* --- INTERACTIVE DECK (Desktop & Mobile) --- */}
        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[450px]">
          {PROCESS_STEPS.map((step) => {
            const isActive = activeStep === step.id;

            return (
              <motion.div
                key={step.id}
                layout
                onClick={() => setActiveStep(step.id)}
                onMouseEnter={() => setActiveStep(step.id)}
                className={`
                  relative overflow-hidden rounded-2xl border cursor-pointer transition-all duration-500 ease-out
                  ${isActive ? 'flex-[3] border-white/20 ring-1 ring-white/10' : 'flex-[1] border-white/5 hover:border-white/10 bg-[#0f172a]/60'}
                  backdrop-blur-xl group
                `}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {/* Background Gradient for Active State */}
                <div className={`absolute inset-0 bg-gradient-to-b ${step.gradient} opacity-0 transition-opacity duration-500 ${isActive ? 'opacity-100' : ''}`} />
                
                {/* Card Content Container */}
                <div className="relative h-full flex flex-col p-6 md:p-8">
                  
                  {/* Top Section: Number & Icon */}
                  <div className="flex justify-between items-start mb-4">
                    <div className={`
                      w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-300
                      ${isActive ? step.color : 'bg-white/5'}
                    `}>
                      {React.cloneElement(step.icon, { className: "w-5 h-5 md:w-6 md:h-6" })}
                    </div>
                    
                    <span className={`text-2xl font-black transition-colors duration-300 ${isActive ? 'text-white/20' : 'text-white/10'}`}>
                      0{step.id}
                    </span>
                  </div>

                  {/* Middle Section: Vertical Text for Inactive State (Desktop Only) */}
                  {!isActive && (
                    <div className="hidden lg:flex flex-grow items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                      <span className="transform -rotate-90 whitespace-nowrap text-lg font-bold text-gray-400 tracking-widest uppercase">
                        {step.short}
                      </span>
                    </div>
                  )}

                  {/* Bottom Section: Content */}
                  <div className={`mt-auto transition-all duration-500 ${!isActive ? 'lg:opacity-0 lg:translate-y-4' : 'opacity-100 translate-y-0'}`}>
                    <h3 className={`text-xl md:text-2xl font-bold text-white mb-3 ${isActive ? 'translate-x-0' : '-translate-x-2'}`}>
                      {step.title}
                    </h3>
                    
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-4">
                            {step.description}
                          </p>
                          
                          {/* Decorative line */}
                          <div className={`h-1 w-12 rounded-full ${step.color.replace('bg-', 'bg-')}`} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Mobile-only visible title for inactive cards to ensure readability */}
                  <div className={`lg:hidden mt-4 ${isActive ? 'hidden' : 'block'}`}>
                    <h3 className="text-lg font-bold text-gray-400">{step.title}</h3>
                  </div>

                  {/* Arrow Icon appearing on hover/active */}
                  <div className={`absolute bottom-6 right-6 transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                     <ArrowRight className={`w-6 h-6 ${step.text}`} />
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;