import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { 
  Facebook, 
  Smartphone, 
  Zap, 
  Target, 
  Users, 
  BarChart, 
  ThumbsUp, 
  MessageCircle, 
  Share2,
  Download,
  Layout,
  Megaphone
} from 'lucide-react';

// ==========================================
// CONFIGURATION DATA
// ==========================================
const STATS = [
  { label: "Monthly Active Users", value: "1.7B+", icon: <Users className="w-5 h-5 text-blue-400" /> },
  { label: "Mobile Usage Time", value: "70%", icon: <Smartphone className="w-5 h-5 text-purple-400" /> },
  { label: "Ad System", value: "Advanced", icon: <Zap className="w-5 h-5 text-yellow-400" /> },
];

const AD_TYPES = [
  {
    id: 1,
    title: "App Engagement",
    description: "Encourage current users to take action within an app or showcase specific capabilities. The call to action centers around explicit highlights to stimulate movement inside the application.",
    icon: <Zap className="w-6 h-6" />,
    color: "text-blue-400",
    gradient: "from-blue-500 to-indigo-600",
    target: "Existing & New Users"
  },
  {
    id: 2,
    title: "App Installs",
    description: "Concentrate purely on gaining new users. These ads emphasize the main goal and fundamental capabilities of the program rather than explicit deep-dive features.",
    icon: <Download className="w-6 h-6" />,
    color: "text-green-400",
    gradient: "from-green-500 to-emerald-600",
    target: "New Users Only"
  },
  {
    id: 3,
    title: "Brand Awareness",
    description: "Designed for exceptional context, exposing your brand to a variety of people. Producing outstanding content that attracts users is key for these campaigns.",
    icon: <Megaphone className="w-6 h-6" />,
    color: "text-purple-400",
    gradient: "from-purple-500 to-pink-600",
    target: "Broad Audience"
  },
  {
    id: 4,
    title: "Lead Generation",
    description: "Inbound marketers maximize Facebook lead ads because users can easily fill out forms without leaving the platform, streamlining the conversion process.",
    icon: <Target className="w-6 h-6" />,
    color: "text-orange-400",
    gradient: "from-orange-500 to-red-600",
    target: "Potential Leads"
  }
];

// ==========================================
// COMPONENT: SOCIAL RIPPLE ANIMATION
// ==========================================
const SocialRipples = () => {
  // Generate random ripple sources
  const ripples = Array.from({ length: 8 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {ripples.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            scale: 0, 
            opacity: 0.5,
            x: Math.random() * 100 + "vw",
            y: Math.random() * 100 + "vh"
          }}
          animate={{ 
            scale: [0, 4], 
            opacity: [0.5, 0] 
          }}
          transition={{ 
            duration: Math.random() * 5 + 8, 
            repeat: Infinity, 
            ease: "easeOut",
            delay: Math.random() * 5
          }}
          className="absolute w-32 h-32 rounded-full border border-blue-500/20 bg-blue-500/5"
        />
      ))}
    </div>
  );
};

// ==========================================
// COMPONENT: INTERACTIVE AD CARD
// ==========================================
const AdCard = ({ ad, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    x.set(clientX - left);
    y.set(clientY - top);
  }

  const spotlight = useMotionTemplate`
    radial-gradient(
      350px circle at ${x}px ${y}px,
      rgba(59, 130, 246, 0.1),
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
      className="group relative h-full bg-[#0a162e]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300"
    >
      {/* Spotlight Effect */}
      <motion.div
        style={{ background: spotlight }}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />

      <div className="relative z-10 p-8 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${ad.gradient} bg-opacity-10 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <span className="text-white drop-shadow-md">{ad.icon}</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400">
            {ad.target}
          </span>
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
          {ad.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed flex-grow">
          {ad.description}
        </p>

        {/* Footer Interaction Hint */}
        <div className="mt-6 flex items-center gap-2 text-xs font-medium text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
          <span>Learn Strategy</span>
          <div className="h-px w-8 bg-blue-400" />
        </div>
      </div>
    </motion.div>
  );
};

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
const FacebookAdvertising = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#021333] text-slate-100 font-sans selection:bg-blue-500/30 overflow-hidden">
      
      {/* --- BACKGROUND DESIGN --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Radial Dot Texture */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        
        {/* Ambient Social Lights */}
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
        
        {/* ANIMATION: Social Ripples */}
        <SocialRipples />
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <Facebook className="w-4 h-4 fill-current" />
              <span>Social Media Dominance</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              Facebook <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Advertising
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"
            >
              With over 1.7 billion monthly users, Facebook's advanced advertising system offers a variety of possibilities to target the right audience.
            </motion.p>
          </motion.div>
        </section>

        {/* --- STATS SECTION --- */}
        <section className="py-10 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {STATS.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/5 border border-white/5 rounded-2xl p-6 flex items-center gap-4 backdrop-blur-sm"
                >
                  <div className="p-3 rounded-full bg-[#021333] border border-white/10">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- MAIN CONTENT & THEORY --- */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Why Choose <span className="text-blue-400">Facebook?</span>
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6" />
                </div>

                <div className="prose prose-invert text-slate-400 text-lg leading-relaxed space-y-6">
                  <p>
                    Did you know that Americans use their phones for more than <strong>70% of the time</strong>? The Facebook advertising systems have grown and became more advanced to capitalize on this mobile-first behavior.
                  </p>
                  <p>
                    Additionally, Facebook offers a variety of possibilities, making it challenging for advertisers to choose the right kind of Facebook advertising. However, one can support various campaign objectives by selecting the correct Ad Type.
                  </p>
                  <div className="flex gap-4">
                    <div className="flex-1 p-4 rounded-xl bg-blue-900/20 border border-blue-500/20 text-center">
                      <ThumbsUp className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                      <div className="text-sm font-bold text-white">Engagement</div>
                    </div>
                    <div className="flex-1 p-4 rounded-xl bg-purple-900/20 border border-purple-500/20 text-center">
                      <Share2 className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                      <div className="text-sm font-bold text-white">Reach</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Visual Representation (Mobile Ad Concept) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative h-full min-h-[400px] flex items-center justify-center"
              >
                <div className="relative w-[300px] h-[500px] bg-[#0f172a] rounded-[2.5rem] border-8 border-[#1e293b] shadow-2xl overflow-hidden flex flex-col">
                  {/* Phone Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1e293b] rounded-b-xl z-20" />
                  
                  {/* Screen Content */}
                  <div className="flex-1 bg-gradient-to-b from-[#0f172a] to-[#021333] p-4 pt-10 relative">
                    {/* Animated Chat Bubbles */}
                    <div className="space-y-4">
                      {[1, 2, 3].map((_, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.5 + 0.5 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-8 h-8 rounded-full bg-blue-500/20" />
                          <div className="flex-1">
                            <div className="h-2 w-20 bg-slate-700 rounded mb-2" />
                            <div className="h-16 bg-slate-800 rounded-xl w-full p-2">
                               <div className="h-2 w-full bg-slate-700/50 rounded mb-2" />
                               <div className="h-2 w-2/3 bg-slate-700/50 rounded" />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Like/Reaction Overlay */}
                    <motion.div 
                       animate={{ y: [0, -10, 0] }}
                       transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                       className="absolute bottom-20 right-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/40 z-30"
                    >
                      <ThumbsUp className="w-6 h-6 text-white fill-current" />
                    </motion.div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -right-12 top-20 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-xl animate-bounce-slow">
                   <div className="flex items-center gap-2">
                     <Users className="w-5 h-5 text-blue-400" />
                     <span className="text-white font-bold text-sm">Targeting</span>
                   </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* --- AD TYPES GRID --- */}
        <section className="py-20 px-6 bg-slate-900/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-blue-400 font-bold text-sm tracking-wider uppercase mb-2 block">Campaign Options</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Ad Types Explained</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {AD_TYPES.map((ad, idx) => (
                <AdCard key={ad.id} ad={ad} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-white/10 rounded-3xl p-12 shadow-2xl relative">
              <h2 className="text-3xl font-bold text-white mb-6">Boost Your Brand Awareness</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                 For brand recognition efforts, consider producing outstanding content that attracts users. Let Digi Crysta handle your campaign strategy.
              </p>
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1">
                Start Your Campaign
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* --- CUSTOM CSS --- */}
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default FacebookAdvertising;