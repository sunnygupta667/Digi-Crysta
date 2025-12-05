import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { 
  Crown, 
  Share2, 
  Search, 
  BarChart, 
  Users, 
  Target, 
  Zap, 
  Globe, 
  MousePointerClick,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

// ==========================================
// CONFIGURATION DATA
// ==========================================
const STRATEGIES = [
  {
    id: 1,
    title: "Audience Connection",
    description: "Connect deeply with your target audience by optimizing your social networking profiles. Make your brand accessible and relatable where your customers spend their time.",
    icon: <Users className="w-6 h-6" />,
    gradient: "from-amber-400 to-orange-500"
  },
  {
    id: 2,
    title: "Consistent Updates",
    description: "They identify your brand thanks to frequent updates about your corporate life and the constant provision of useful, high-value information.",
    icon: <Share2 className="w-6 h-6" />,
    gradient: "from-orange-500 to-red-500"
  },
  {
    id: 3,
    title: "Brand Identity",
    description: "Creating a strong brand and growing your audience are essential components. We help establish a distinct voice that cuts through the noise.",
    icon: <Crown className="w-6 h-6" />,
    gradient: "from-yellow-400 to-amber-600"
  }
];

const SEO_IMPACT = [
  {
    title: "Higher Click-Through Rates",
    desc: "More people will click on your material in search results as they recognize your brand. High CTRs signal relevance to Google, boosting your visibility.",
    icon: <MousePointerClick className="w-5 h-5 text-amber-400" />
  },
  {
    title: "Reduced Bounce Rate",
    desc: "Brand recognition leads to higher engagement. Reducing your bounce rate gives you a significant advantage over competing destinations in SERP placement.",
    icon: <TrendingUp className="w-5 h-5 text-orange-400" />
  },
  {
    title: "Organic Search Growth",
    desc: "Cultivating brand awareness leads to more people actively searching for your brand name, directly lifting your website's natural search traffic.",
    icon: <Search className="w-5 h-5 text-yellow-400" />
  }
];

// ==========================================
// COMPONENT: GOLDEN PULSE NETWORK ANIMATION
// ==========================================
const GoldenNetwork = () => {
  // Generate random satellite nodes
  const satellites = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    angle: (i / 8) * 360, // distribute around circle
    radius: 150 + Math.random() * 100,
    size: Math.random() * 4 + 4,
    duration: Math.random() * 20 + 10
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Central Brand Hub */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Core */}
        <div className="w-32 h-32 bg-amber-500/20 rounded-full blur-[40px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-amber-500/30 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-amber-400 rounded-full shadow-[0_0_20px_rgba(251,191,36,0.8)]" />
        
        {/* Expanding Ring Waves */}
        <motion.div 
          animate={{ scale: [1, 3], opacity: [0.5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-amber-500/20 rounded-full"
        />
        <motion.div 
          animate={{ scale: [1, 3], opacity: [0.5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-amber-500/20 rounded-full"
        />
      </div>

      {/* Satellite Nodes */}
      {satellites.map((node) => (
        <motion.div
          key={node.id}
          animate={{ rotate: 360 }}
          transition={{ duration: node.duration, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 w-0 h-0"
        >
          <div 
            className="absolute bg-amber-400/50 rounded-full"
            style={{ 
              width: node.size, 
              height: node.size,
              transform: `translate(${node.radius}px, 0)` // Push out to radius
            }}
          >
             {/* Connection Line to Center */}
             <div className="absolute top-1/2 right-full w-[100px] h-[1px] bg-gradient-to-r from-transparent to-amber-500/20 origin-right transform rotate-180" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ==========================================
// COMPONENT: INTERACTIVE STRATEGY CARD
// ==========================================
const StrategyCard = ({ item, index }) => {
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
      rgba(251, 191, 36, 0.1), 
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
      className="group relative h-full bg-[#0a162e]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all duration-300"
    >
      {/* Spotlight Effect (Amber Tint) */}
      <motion.div
        style={{ background: spotlight }}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />

      <div className="relative z-10 p-8 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <span className="text-white drop-shadow-md">{item.icon}</span>
          </div>
          <div className="bg-white/5 p-1.5 rounded-lg border border-white/10 group-hover:border-amber-500/30 transition-colors">
            <Crown className="w-4 h-4 text-slate-400 group-hover:text-amber-400" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
          {item.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed flex-grow">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
const BrandMarketingServices = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#021333] text-slate-100 font-sans selection:bg-amber-500/30 overflow-hidden">
      
      {/* --- BACKGROUND DESIGN --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Radial Dot Texture */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        
        {/* Ambient Warm Lights */}
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-amber-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-orange-900/10 blur-[120px] rounded-full" />
        
        {/* ANIMATION: Golden Pulse Network */}
        <GoldenNetwork />
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <Target className="w-4 h-4" />
              <span>Authority & Awareness</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              Brand Marketing <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Services
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"
            >
              How to increase searches on your brand number? Creating a strong brand and growing your audience are essential. We help you connect, engage, and dominate your niche.
            </motion.p>
          </motion.div>
        </section>

        {/* --- STRATEGY CONTENT --- */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-amber-400 font-bold text-sm tracking-wider uppercase mb-2 block">Core Principles</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Building Your Identity</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {STRATEGIES.map((item, idx) => (
                <StrategyCard key={item.id} item={item} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* --- SEO IMPACT SECTION --- */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Left: Interactive Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative h-full min-h-[400px] flex items-center justify-center order-2 lg:order-1"
              >
                {/* The "Brand Magnet" Visual */}
                <div className="relative w-64 h-64">
                   <div className="absolute inset-0 bg-amber-500 rounded-full opacity-20 animate-pulse" />
                   <div className="absolute inset-4 bg-amber-600 rounded-full opacity-20 animate-pulse delay-75" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.4)] flex items-center justify-center transform rotate-12">
                         <Crown className="w-16 h-16 text-white drop-shadow-md" />
                      </div>
                   </div>

                   {/* Orbiting Search Icons */}
                   <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-[-40px]"
                   >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0a162e] border border-amber-500/50 p-2 rounded-lg shadow-lg">
                         <Search className="w-6 h-6 text-amber-400" />
                      </div>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-[#0a162e] border border-amber-500/50 p-2 rounded-lg shadow-lg">
                         <MousePointerClick className="w-6 h-6 text-amber-400" />
                      </div>
                   </motion.div>
                </div>
              </motion.div>

              {/* Right: Content */}
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-white mb-6">
                  The <span className="text-amber-400">SEO Ripple Effect</span>
                </h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                  Recall that because of their decreased bounce rate, brand clicks are unquestionably becoming more crucial based on Google's algorithms. Reducing bounce rate gives you an advantage over competing destinations.
                </p>
                
                <div className="space-y-4">
                  {SEO_IMPACT.map((impact, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-amber-500/30 transition-colors"
                    >
                      <div className="bg-amber-500/10 p-2 rounded-lg mt-1">
                        {impact.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg mb-1">{impact.title}</h4>
                        <p className="text-slate-400 text-sm">{impact.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="bg-gradient-to-r from-amber-900/40 to-orange-900/40 border border-amber-500/20 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10" />
              
              <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Elevate Your Brand</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                 More people actively searching for your brand helps your website's natural search traffic as well as your social profiles. Start building your legacy today.
              </p>
              <button className="relative z-10 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
                <ShieldCheck className="w-5 h-5" />
                Start Branding
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default BrandMarketingServices;