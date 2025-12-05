import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteRight, FaStar } from 'react-icons/fa';

// ==========================================
// DATA CONFIGURATION
// ==========================================
const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: "Dr. Rohit Nayar",
    role: "Medical Director",
    image: "https://randomuser.me/api/portraits/men/32.jpg", // Replace with actual image path
    quote: "Working with HoBo e Services has been a transformative experience for our clinic's digital presence. Their SEO strategies are not just theoretical but deeply practical. We've seen a 200% growth in patient inquiries within 3 months!",
    rating: 5
  },
  {
    id: 2,
    name: "Naresh Kumar",
    role: "CEO, TechFlow",
    image: "https://randomuser.me/api/portraits/men/45.jpg", // Replace with actual image path
    quote: "The team is incredibly responsive and skilled. They completely revamped our PPC campaigns, lowering our cost-per-acquisition while doubling our leads. It's rare to find a partner who cares about your ROI as much as you do.",
    rating: 5
  },
  {
    id: 3,
    name: "Sushil Singh",
    role: "Founder, GreenSpace",
    image: "https://randomuser.me/api/portraits/men/22.jpg", // Replace with actual image path
    quote: "Their web development team delivered a masterpiece. The site is fast, responsive, and aesthetically stunning. They understood our brand voice perfectly and translated it into a digital experience that our customers love.",
    rating: 4
  }
];

// ==========================================
// ANIMATION VARIANTS
// ==========================================
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // Custom "Apple-like" ease
    },
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play logic
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextStep();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [index, isPaused]);

  const nextStep = () => {
    setDirection(1);
    setIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS_DATA.length);
  };

  const prevStep = () => {
    setDirection(-1);
    setIndex((prevIndex) => (prevIndex === 0 ? TESTIMONIALS_DATA.length - 1 : prevIndex - 1));
  };

  const goToSlide = (newIndex) => {
    setDirection(newIndex > index ? 1 : -1);
    setIndex(newIndex);
  };

  return (
    <section 
      className="relative w-full py-20 px-6 overflow-hidden bg-gradient-to-br from-[#021333] to-[#041e4d] text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* --- Background Decorative Elements --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        {/* Large Faded Quote Mark */}
        <div className="absolute top-10 left-10 md:left-1/4 text-[20rem] font-serif text-white opacity-[0.03] leading-none select-none">
          “
        </div>
        {/* Glowing Orbs */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto max-w-4xl text-center">
        
        {/* --- Header --- */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-blue-400 font-semibold tracking-wider uppercase text-sm mb-2">Client's Love</h3>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Love from Clients</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Best Services for Online Marketing, SEO, Video Marketing and PPC in Delhi NCR. See what our partners have to say.
          </p>
        </motion.div>

        {/* --- Main Testimonial Card Area --- */}
        <div className="relative min-h-[400px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute w-full"
            >
              {/* The Glass Card */}
              <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl mx-auto max-w-3xl">
                
                {/* Floating Icon */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-600 w-12 h-12 flex items-center justify-center rounded-full shadow-lg border-4 border-[#021333]">
                  <FaQuoteRight className="text-white text-lg" />
                </div>

                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6 mt-4 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < TESTIMONIALS_DATA[index].rating ? "opacity-100" : "opacity-30"} />
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote className="text-lg md:text-2xl font-light italic leading-relaxed text-gray-200 mb-8 font-serif">
                  "{TESTIMONIALS_DATA[index].quote}"
                </blockquote>

                {/* Author Info */}
                <div className="flex flex-col items-center">
                  <h4 className="text-xl font-bold text-white">{TESTIMONIALS_DATA[index].name}</h4>
                  <p className="text-blue-400 text-sm font-medium">{TESTIMONIALS_DATA[index].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- Navigation Avatars --- */}
        <div className="mt-12 flex justify-center items-center gap-6 md:gap-10">
          {TESTIMONIALS_DATA.map((item, idx) => {
            const isActive = idx === index;
            return (
              <button
                key={item.id}
                onClick={() => goToSlide(idx)}
                className={`group relative flex flex-col items-center focus:outline-none transition-all duration-300 ${isActive ? 'scale-110' : 'opacity-50 hover:opacity-100 hover:scale-105'}`}
              >
                {/* Avatar Image */}
                <div className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 transition-colors duration-300 ${isActive ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 'border-transparent'}`}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Active Progress Ring (Optional nice touch) */}
                  {isActive && !isPaused && (
                    <motion.svg 
                      viewBox="0 0 100 100" 
                      className="absolute inset-0 w-full h-full rotate-[-90deg]"
                    >
                      <circle cx="50" cy="50" r="48" fill="none" stroke="transparent" strokeWidth="4" />
                      <motion.circle 
                        cx="50" cy="50" r="48" 
                        fill="none" 
                        stroke="#3b82f6" 
                        strokeWidth="4" 
                        strokeDasharray="301.59" // Circumference of radius 48
                        strokeDashoffset="301.59"
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                      />
                    </motion.svg>
                  )}
                </div>
                
                {/* Name Label (Only visible for non-active items on desktop for clarity, or hidden completely) */}
                <span className={`mt-3 text-xs md:text-sm font-medium transition-colors duration-300 ${isActive ? 'text-blue-400' : 'text-gray-500'}`}>
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;