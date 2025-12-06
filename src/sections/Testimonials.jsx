import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// ==========================================
// DATA CONFIGURATION
// ==========================================
const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: "Dr. Rohit Nayar",
    role: "Medical Director",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "Working with Digi Crysta has been a transformative experience for our clinic's digital presence. Their SEO strategies are not just theoretical but deeply practical. We've seen a 200% growth in patient inquiries within 3 months!",
    rating: 5
  },
  {
    id: 2,
    name: "Naresh Kumar",
    role: "CEO, TechFlow",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    quote: "The team is incredibly responsive and skilled. They completely revamped our PPC campaigns, lowering our cost-per-acquisition while doubling our leads. It's rare to find a partner who cares about your ROI as much as you do.",
    rating: 5
  },
  {
    id: 3,
    name: "Sushil Singh",
    role: "Founder, GreenSpace",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    quote: "Their web development team delivered a masterpiece. The site is fast, responsive, and aesthetically stunning. They understood our brand voice perfectly and translated it into a digital experience that our customers love.",
    rating: 4
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  // Animation Variants for the Card
  const cardVariants = {
    hidden: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.8,
      rotate: direction > 0 ? 5 : -5,
    }),
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.8,
      rotate: direction > 0 ? -5 : 5,
      transition: {
        duration: 0.4,
      },
    }),
  };

  return (
    <section className="relative w-full py-20 lg:py-32 bg-gradient-to-br from-[#021333] to-[#041e4d] overflow-hidden text-white">
      
      {/* --- Background VFX --- */}
      {/* Rotating Ring */}
      <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
      <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[450px] h-[450px] border border-dashed border-blue-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
      
      {/* Gradient Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

          {/* ==========================
              LEFT COLUMN: Header & Text
             ========================== */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-xs md:text-sm font-medium tracking-wide text-blue-200">
                  Client Success Stories
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Trusted by <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
                  Market Leaders
                </span>
              </h2>

              <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Discover how <strong>Digi Crysta</strong> transforms businesses through data-driven marketing, SEO, and development strategies.
              </p>

              {/* Navigation Buttons (Desktop) */}
              <div className="hidden lg:flex items-center gap-4">
                <button 
                  onClick={handlePrev}
                  className="group w-14 h-14 flex items-center justify-center rounded-full border border-white/20 hover:border-blue-400 hover:bg-blue-500/10 transition-all duration-300"
                >
                  <FaArrowLeft className="text-white group-hover:-translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={handleNext}
                  className="group w-14 h-14 flex items-center justify-center rounded-full border border-white/20 hover:border-blue-400 hover:bg-blue-500/10 transition-all duration-300"
                >
                  <FaArrowRight className="text-white group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* ==========================
              RIGHT COLUMN: The Card
             ========================== */}
          <div className="w-full lg:w-1/2 relative h-[500px] flex items-center justify-center">
            
            {/* Animated Pulse Ring behind active card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />

            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute w-full max-w-md"
              >
                {/* Floating "Idle" Animation Container */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  {/* User Image (Popping Out) */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20">
                    <div className="relative w-24 h-24 p-1 rounded-full bg-gradient-to-br from-blue-400 to-purple-500">
                       <img 
                        src={TESTIMONIALS_DATA[currentIndex].image} 
                        alt={TESTIMONIALS_DATA[currentIndex].name}
                        className="w-full h-full rounded-full object-cover border-4 border-[#0f172a]"
                       />
                       {/* Quote Icon Badge */}
                       <div className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg border-2 border-[#0f172a]">
                         <FaQuoteLeft size={12} />
                       </div>
                    </div>
                  </div>

                  {/* Main Glass Card */}
                  <div className="relative pt-16 pb-10 px-8 md:px-10 bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden">
                    
                    {/* Background Decorative Quote */}
                    <FaQuoteLeft className="absolute top-10 right-8 text-white/5 text-8xl pointer-events-none" />

                    {/* Content */}
                    <div className="text-center relative z-10">
                      
                      {/* Rating */}
                      <div className="flex justify-center gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={`text-sm ${i < TESTIMONIALS_DATA[currentIndex].rating ? 'text-amber-400' : 'text-gray-600'}`} 
                          />
                        ))}
                      </div>

                      <blockquote className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8 italic">
                        "{TESTIMONIALS_DATA[currentIndex].quote}"
                      </blockquote>

                      <div className="border-t border-white/10 pt-6">
                        <h4 className="text-xl font-bold text-white mb-1">
                          {TESTIMONIALS_DATA[currentIndex].name}
                        </h4>
                        <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider">
                          {TESTIMONIALS_DATA[currentIndex].role}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Back Glow */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl -z-10" />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Mobile Navigation (Below Card) */}
            <div className="lg:hidden absolute -bottom-12 left-0 w-full flex justify-center gap-6 z-20">
              <button 
                  onClick={handlePrev}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md active:scale-95 transition-transform"
                >
                  <FaArrowLeft className="text-white" />
                </button>
                <button 
                  onClick={handleNext}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 shadow-lg active:scale-95 transition-transform"
                >
                  <FaArrowRight className="text-white" />
                </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;