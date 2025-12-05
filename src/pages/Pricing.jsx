import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Check, 
  Search, 
  Video, 
  Rocket, 
  Sparkles 
} from 'lucide-react';

// ==========================================
// CONFIGURATION DATA
// ==========================================
const PRICING_PLANS = [
  {
    id: 1,
    title: "SEO",
    price: "9,999",
    icon: <Search className="w-6 h-6" />,
    description: "Dominate search results organically.",
    features: [
      "Upto 10 Keywords",
      "Time Allotted 50 Hours/Month",
      "On Page & Off Page SEO",
      "Link Building & Local SEO",
      "Keyword Ranking Report",
      "Google Analytics Traffic Report",
      "Monthly Reporting"
    ],
    recommended: false,
    accent: "from-blue-400 to-cyan-300",
    shadow: "shadow-blue-500/20"
  },
  {
    id: 2,
    title: "VIDEOS",
    price: "6,999",
    icon: <Video className="w-6 h-6" />,
    description: "Engage your audience with professional shoots.",
    features: [
      "Videos Planning & Management",
      "1 Package Includes 3 Videos",
      "1 Video Upto 3 Minutes",
      "All Video Shoot on Same Day",
      "Social Media Promotion",
      "Video Shoot by DSLR",
      "Royalty-free Music"
    ],
    recommended: true,
    accent: "from-purple-400 to-pink-400",
    shadow: "shadow-purple-500/20"
  },
  {
    id: 3,
    title: "PPC",
    price: "14,999",
    icon: <Rocket className="w-6 h-6" />,
    description: "Instant traffic and high-conversion leads.",
    features: [
      "Ad Budget < INR 50,000/M",
      "100 Keywords Setup",
      "Text & Banner Ads",
      "Landing Page Selection",
      "GEO Targeting Setup",
      "Conversion Code Setup",
      "Keyword Bid Optimization",
      "Monthly Reports"
    ],
    recommended: false,
    accent: "from-orange-400 to-red-400",
    shadow: "shadow-orange-500/20"
  }
];

// ==========================================
// COMPONENT: SPOTLIGHT + TILT CARD
// ==========================================
const PricingCard = ({ plan }) => {
  const { title, price, icon, features, recommended, description, accent, shadow } = plan;
  const cardRef = useRef(null);

  // --- MOUSE TRACKING & ANIMATION VALUES ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for tilt
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = clientX - left;
    const yPct = clientY - top;
    
    // Update raw values for spotlight
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // Tilt Transforms (mapped from mouse position relative to center)
  // We approximate center based on width/height (assuming ~350px width card)
  const rotateX = useTransform(mouseY, [0, 500], [5, -5]); // Subtle tilt
  const rotateY = useTransform(mouseX, [0, 350], [-5, 5]);

  // Spotlight Gradient Template
  const spotlightGradient = useMotionTemplate`
    radial-gradient(
      350px circle at ${mouseX}px ${mouseY}px,
      rgba(255, 255, 255, 0.1),
      transparent 80%
    )
  `;

  const borderSpotlight = useMotionTemplate`
    radial-gradient(
      350px circle at ${mouseX}px ${mouseY}px,
      rgba(255, 255, 255, 0.4),
      transparent 80%
    )
  `;

  return (
    <motion.div
      className="relative w-full max-w-[350px] mx-auto perspective-1000 h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative h-full rounded-2xl transition-all duration-500 flex flex-col group
          ${recommended 
            ? 'shadow-[0_20px_50px_-12px_rgba(124,58,237,0.5)]' 
            : 'shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.1)]'
          }
        `}
      >
        {/* --- SPOTLIGHT BORDER --- */}
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent z-0 overflow-hidden">
             {/* The Moving Light Border */}
             <motion.div 
               className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
               style={{ background: borderSpotlight }}
             />
        </div>

        {/* --- CARD BACKGROUND & CONTENT --- */}
        {/* Matches About Page: bg-slate-900/50 for glass effect */}
        <div className="relative h-full bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 flex flex-col items-center text-center overflow-hidden z-10 border border-white/5">
          
          {/* Moving Light on Background */}
          <motion.div 
            style={{ background: spotlightGradient }}
            className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />

          {/* Recommended Aurora Effect */}
          {recommended && (
            <div className="absolute inset-[-50%] w-[200%] h-[200%] animate-aurora-spin bg-[conic-gradient(from_0deg,transparent_0deg,#7c3aed_60deg,#db2777_120deg,transparent_180deg,#7c3aed_240deg,#db2777_300deg,transparent_360deg)] opacity-20 blur-2xl -z-20 pointer-events-none" />
          )}

          {/* Icon */}
          <motion.div 
            style={{ transform: "translateZ(30px)" }}
            className={`w-14 h-14 mb-5 rounded-xl flex items-center justify-center text-xl shadow-lg bg-gradient-to-br ${accent} text-white shrink-0 ring-1 ring-white/20`}
          >
            {icon}
          </motion.div>

          {/* Header */}
          <motion.div style={{ transform: "translateZ(20px)" }} className="mb-4 w-full">
            <h3 className="text-xl font-bold text-white mb-1 tracking-wide">{title}</h3>
            {recommended && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-500/20 text-purple-300 text-[10px] font-bold tracking-widest uppercase rounded-full border border-purple-500/30 mb-2 shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                <Sparkles className="w-3 h-3" /> Best Value
              </span>
            )}
            <p className="text-slate-400 text-xs px-2 min-h-[2.5rem] flex items-center justify-center leading-relaxed">
              {description}
            </p>
          </motion.div>

          {/* Price */}
          <motion.div 
            style={{ transform: "translateZ(25px)" }}
            className="mb-6 relative"
          >
            <div className="flex items-start justify-center">
              <span className="text-lg font-medium text-slate-500 mr-1 mt-1">₹</span>
              <span className="text-4xl font-extrabold text-white tracking-tight">{price}</span>
            </div>
            <span className="text-slate-500 text-xs font-medium uppercase tracking-wide mt-1 block">/ month + GST</span>
          </motion.div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

          {/* Features */}
          <motion.div 
             style={{ transform: "translateZ(10px)" }}
             className="w-full flex-1 mb-8"
          >
            <ul className="space-y-3 text-left">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm group/item">
                  <div className={`mt-0.5 p-0.5 rounded-full bg-gradient-to-br ${accent} opacity-80 group-hover/item:opacity-100 transition-opacity shrink-0 shadow-sm`}>
                    <Check className="w-2.5 h-2.5 text-white" />
                  </div>
                  <span className="text-slate-300 group-hover/item:text-white transition-colors leading-tight text-[13px]">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Button */}
          <motion.button 
            style={{ transform: "translateZ(20px)" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg mt-auto relative overflow-hidden group/btn
              ${recommended 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-purple-500/25' 
                : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20'
              }
            `}
          >
            <span className="relative z-10">Choose Plan</span>
            {/* Button Hover Shine */}
            <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ==========================================
// MAIN COMPONENT: PRICING PAGE
// ==========================================
const PricingPage = () => {
  return (
    // EXACT Background match to About Page: #021333 + Radial Pattern
    <div className="min-h-screen bg-[#021333] text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* Background Texture (Subtle Dots) */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-16 px-6">
        {/* Ambient Top Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs md:text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
              Pricing Plans
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Plans that Scale <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                With Your Vision
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Transparent pricing for every stage of your growth. No hidden fees, just results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- PRICING CARDS SECTION --- */}
      <section className="pb-24 pt-4 px-6 relative">
        {/* Ambient Mid Light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-indigo-900/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch justify-center">
            {PRICING_PLANS.map((plan, idx) => (
              <div key={plan.id} className={`${plan.recommended ? 'lg:-mt-8 lg:mb-8 z-20' : 'z-10'}`}>
                 <PricingCard plan={plan} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CSS FOR AURORA ANIMATION --- */}
      <style>{`
        @keyframes aurora-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-aurora-spin {
          animation: aurora-spin 20s linear infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default PricingPage;