import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  BarChart2, 
  Globe, 
  MousePointer2, 
  Search, 
  TrendingUp, 
  Target,
  Share2
} from 'lucide-react';

// ==========================================
// HERO SLIDER DATA
// ==========================================
const HERO_SLIDES = [
  {
    id: 1,
    tagline: "Digi Crysta",
    title: "Increase Business",
    highlight: "Productivity",
    description: "Our strategy is to use the same brand for the same purpose. In order to ensure that every phase of the shape design process goes well, we also begin by listening to our clients.",
    color: "text-blue-400",
    gradient: "from-blue-400 to-indigo-600",
    icon: <BarChart2 className="w-12 h-12 text-white" />,
    stats: "Noida's Top Firm"
  },
  {
    id: 2,
    tagline: "SEO Solutions",
    title: "Search Engine",
    highlight: "Optimization",
    description: "If you're searching for SEO solutions, we offer one of the improving possibilities related to SEO services that satisfy budgetary constraints.",
    color: "text-cyan-400",
    gradient: "from-cyan-400 to-teal-600",
    icon: <Search className="w-12 h-12 text-white" />,
    stats: "Budget Friendly"
  },
  {
    id: 3,
    tagline: "Social Media",
    title: "Social Media",
    highlight: "Optimization",
    description: "Get more loyalty, recognition, and business by influencing your social media accounts! We are a leading company in social media advertising.",
    color: "text-orange-400",
    gradient: "from-orange-400 to-red-600",
    icon: <Share2 className="w-12 h-12 text-white" />,
    stats: "Brand Loyalty"
  },
  {
    id: 4,
    tagline: "Paid Advertising",
    title: "Pay Per",
    highlight: "Click",
    description: "Are you ready to face a surge in business due to increased traffic? We use all advertising channels at a cheaper cost to achieve the best return on ad spend.",
    color: "text-purple-400",
    gradient: "from-purple-400 to-pink-600",
    icon: <Target className="w-12 h-12 text-white" />,
    stats: "Best ROI"
  }
];

// ==========================================
// COMPONENT: 3D FLOATING ILLUSTRATION
// ==========================================
const FloatingIllustration = ({ activeSlide }) => {
  return (
    // Added scale-90 for mobile to prevent overflow/overlap
    <div className="relative w-full h-[350px] md:h-[500px] flex items-center justify-center perspective-1000 scale-90 md:scale-100 origin-center">
      
      {/* --- Central Base Plate (Laptop/Screen concept) --- */}
      <motion.div
        animate={{ 
          rotateX: [10, 15, 10], 
          rotateY: [-10, 10, -10],
          y: [0, -10, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-64 h-40 md:w-80 md:h-52 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl flex items-center justify-center"
      >
        {/* Inner Screen Content - Changes based on slide */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className={`w-full h-full absolute inset-0 rounded-2xl bg-gradient-to-br ${activeSlide.gradient} opacity-20`}
          />
        </AnimatePresence>

        {/* Floating Main Icon */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeSlide.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${activeSlide.gradient} flex items-center justify-center shadow-lg shadow-black/30`}
          >
            {activeSlide.icon}
          </motion.div>
        </AnimatePresence>

        {/* Reflection/Shine */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
      </motion.div>

      {/* --- Orbiting Elements (Data Nodes) --- */}
      {/* Node 1: Top Right */}
      <motion.div
        animate={{ y: [-15, 15, -15], x: [5, -5, 5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-0 right-4 md:top-20 md:right-20 p-3 md:p-4 rounded-xl bg-[#0f172a]/80 border border-white/10 backdrop-blur-md shadow-xl z-20 scale-90 md:scale-100"
      >
        <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-green-400 mb-2" />
        <div className="w-12 md:w-16 h-2 bg-white/10 rounded-full mb-1 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "80%" }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            className="h-full bg-green-400" 
          />
        </div>
        <div className="w-8 md:w-10 h-2 bg-white/10 rounded-full" />
      </motion.div>

      {/* Node 2: Bottom Left */}
      <motion.div
        animate={{ y: [15, -15, 15], x: [-5, 5, -5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-4 left-0 md:bottom-20 md:left-10 p-3 md:p-4 rounded-xl bg-[#0f172a]/80 border border-white/10 backdrop-blur-md shadow-xl z-20 flex items-center gap-3 scale-90 md:scale-100"
      >
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
          <Globe className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
        </div>
        <div>
          <div className="text-[10px] md:text-xs text-gray-400">Global Reach</div>
          <div className="text-xs md:text-sm font-bold text-white">Active</div>
        </div>
      </motion.div>

      {/* Node 3: Floating Cursor */}
      <motion.div
        animate={{ 
          x: [-50, 50, -50], 
          y: [-30, 30, -30],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 z-30 pointer-events-none"
      >
        <MousePointer2 className="w-6 h-6 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] fill-current" />
      </motion.div>

      {/* --- Background Rings --- */}
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <div className="w-[280px] h-[280px] md:w-[450px] md:h-[450px] border border-white/5 rounded-full animate-[spin_10s_linear_infinite]" />
        <div className="absolute w-[180px] h-[180px] md:w-[350px] md:h-[350px] border border-dashed border-white/10 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
      </div>
      
    </div>
  );
};

// ==========================================
// MAIN HERO COMPONENT
// ==========================================
const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const activeSlide = HERO_SLIDES[currentIndex];

  return (
    <section className="relative w-full min-h-screen pt-28 pb-16 md:pt-32 flex items-center bg-[#021333] overflow-hidden">
      
      {/* Dynamic Background Gradient (Changes with slide) */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeSlide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b ${activeSlide.gradient} blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2`}
        />
      </AnimatePresence>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* --- LEFT: TEXT CONTENT --- */}
        <div className="flex flex-col items-start text-left order-2 lg:order-1 relative z-30">
          
          {/* Animated Tagline */}
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeSlide.id + "-tag"}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm font-semibold text-blue-300 mb-6 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              {activeSlide.tagline}
            </motion.div>
          </AnimatePresence>

          {/* Animated Headline - FIX: Removed absolute positioning to prevent overlap */}
          <div className="min-h-[120px] md:min-h-[200px] w-full mb-4">
            <AnimatePresence mode='wait'>
              <motion.h1
                key={activeSlide.id + "-title"}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight w-full"
              >
                {activeSlide.title} <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${activeSlide.gradient}`}>
                  {activeSlide.highlight}
                </span>
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Animated Description */}
          <AnimatePresence mode='wait'>
            <motion.p
              key={activeSlide.id + "-desc"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base md:text-lg text-gray-400 leading-relaxed mb-8 max-w-lg min-h-[80px]"
            >
              {activeSlide.description}
            </motion.p>
          </AnimatePresence>

          {/* Buttons & Stats */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-xl bg-gradient-to-r ${activeSlide.gradient} text-white font-bold shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all w-full sm:w-auto justify-center`}
            >
              Start Growing <ArrowRight className="w-5 h-5" />
            </motion.button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Real Results</span>
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={activeSlide.stats}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-white font-bold text-sm whitespace-nowrap"
                  >
                    {activeSlide.stats}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>
          
          {/* Slider Indicators */}
          <div className="flex gap-2 mt-12">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-blue-500' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

        {/* --- RIGHT: 3D ILLUSTRATION --- */}
        <div className="relative order-1 lg:order-2 flex justify-center w-full">
          <FloatingIllustration activeSlide={activeSlide} />
        </div>

      </div>
    </section>
  );
};

export default Hero;