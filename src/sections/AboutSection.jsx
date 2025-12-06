import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  Users, 
  MonitorPlay, 
  ArrowRight, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

// ==========================================
// DATA & ASSETS
// ==========================================
const FEATURES = [
  {
    id: 1,
    title: "Welcome To Digi Crysta",
    description: "We are eager to brand your items by listening to your clients' and partners' daily steps in the creative process.",
    icon: <Settings className="w-6 h-6" />,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  },
  {
    id: 2,
    title: "How do we operate?",
    description: "As one of the top SEO companies, we guarantee to rank in the top 10. We focus on increasing traffic and producing online leads.",
    icon: <MonitorPlay className="w-6 h-6" />,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20"
  },
  {
    id: 3,
    title: "What we do?",
    description: "We have the ability to change business all around the world. Over 85% of internet users intend to make a purchase via search.",
    icon: <Users className="w-6 h-6" />,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20"
  }
];

// ==========================================
// ANIMATION VARIANTS
// ==========================================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { type: "spring", stiffness: 50 }
  }
};

// ==========================================
// COMPONENT: FEATURE CARD (Right Side)
// ==========================================
const FeatureCard = ({ feature }) => {
  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ scale: 1.02, x: -10 }}
      className={`group relative p-6 rounded-2xl border ${feature.border} bg-[#0f172a]/40 backdrop-blur-md hover:bg-[#0f172a]/60 transition-all duration-300 overflow-hidden`}
    >
      {/* Hover Glow Gradient */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${feature.color.replace('text', 'from')} to-transparent`} />
      
      <div className="relative z-10 flex gap-5 items-start">
        <div className={`shrink-0 w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center ${feature.color} border border-white/5 shadow-lg group-hover:shadow-${feature.color}/20`}>
          {feature.icon}
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
            {feature.title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================
const AboutSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="relative w-full py-20 lg:py-32 bg-gradient-to-br from-[#021333] to-[#041e4d] overflow-hidden">
      
      {/* --- BACKGROUND ANIMATION (Moving Grid) --- */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>
      
      {/* Floating Orbs */}
      <motion.div 
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div 
        animate={{ y: [0, 30, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* --- LEFT COLUMN: CONTENT --- */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Tagline */}
            <div className="flex items-center gap-2 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
              <span className="text-blue-400 font-medium tracking-wider text-sm uppercase">About Digi Crysta</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Get <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                30% Off
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-500 opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </span> Now on Digital Services
            </h2>

            {/* Primary Text */}
            <p className="text-lg text-slate-300 mb-6 leading-relaxed">
              As a division of Energy and Internet of Things, we are <strong className="text-white">Digi Crysta</strong>, one of Noida's top digital marketing agencies. With more than 15+ workers from more than 100 skill sets, the company is based in Delhi NCR, the capital of India.
            </p>

            <p className="text-base text-slate-400 mb-8">
              In the Indian subcontinent, Digi Crysta has been a top supplier of technology and digital marketing (SEO, SEM, SMO, and PPC) staff augmentation and solutions since 2020.
            </p>

            {/* Expandable Section */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mb-8"
                >
                  <div className="bg-white/5 border-l-4 border-blue-500 rounded-r-xl p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3 text-white font-semibold">
                      <Sparkles className="w-5 h-5 text-yellow-400" />
                      <h5>Increase Business Productivity</h5>
                    </div>
                    <ul className="space-y-3 text-slate-300 text-sm">
                      <li className="flex gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                        Our strategy is to use the same brand for the same purpose.
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                        We ensure every phase of the shape design process goes well by listening to clients.
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10">{isExpanded ? 'Read Less' : 'Know More'}</span>
              <ArrowRight className={`w-5 h-5 relative z-10 transition-transform duration-300 ${isExpanded ? '-rotate-90' : 'group-hover:translate-x-1'}`} />
            </motion.button>
          </motion.div>

          {/* --- RIGHT COLUMN: STACKED CARDS --- */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-5 relative"
          >
            {/* Decorative line behind cards */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/30 to-transparent hidden md:block" />

            {FEATURES.map((feature) => (
              <div key={feature.id} className="relative">
                {/* Connector Dot */}
                <div className="absolute left-[30px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6] hidden md:block z-20"></div>
                <div className="md:pl-16">
                  <FeatureCard feature={feature} />
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;