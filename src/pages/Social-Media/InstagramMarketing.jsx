import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { 
  Instagram, 
  Heart, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Smartphone, 
  Zap, 
  Share2,
  Camera,
  BarChart2,
  Target
} from 'lucide-react';

// ==========================================
// CONFIGURATION DATA
// ==========================================
const GOALS = [
  {
    id: 1,
    title: "Generate Traffic",
    description: "Drive high-quality traffic from stories and posts directly to your website or landing pages using strategic bio links and CTAs.",
    icon: <TrendingUp className="w-6 h-6" />,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 2,
    title: "Lead Generation",
    description: "Capture interest efficiently. Use Instagram's visual appeal to qualify leads and guide them through your sales funnel.",
    icon: <Target className="w-6 h-6" />,
    gradient: "from-orange-500 to-red-500"
  },
  {
    id: 3,
    title: "Sales Drive",
    description: "Convert followers into customers. Leverage Shoppable Posts and exclusive promotions to boost e-commerce sales directly in-app.",
    icon: <ShoppingBag className="w-6 h-6" />,
    gradient: "from-pink-500 to-rose-500"
  },
  {
    id: 4,
    title: "App Installation",
    description: "Showcase your app's features through engaging video content to drive downloads and increase active user base.",
    icon: <Smartphone className="w-6 h-6" />,
    gradient: "from-blue-500 to-purple-500"
  },
  {
    id: 5,
    title: "Boost Engagement",
    description: "Foster a community. Create content that demands interaction—likes, comments, and shares—to signal relevance to the algorithm.",
    icon: <Heart className="w-6 h-6" />,
    gradient: "from-red-500 to-pink-600"
  },
  {
    id: 6,
    title: "People Reach",
    description: "Expand your horizon. Utilize hashtags, reels, and explore page optimization to get your brand in front of massive new audiences.",
    icon: <Users className="w-6 h-6" />,
    gradient: "from-indigo-500 to-violet-500"
  }
];

// ==========================================
// COMPONENT: GRADIENT AURORA ANIMATION
// ==========================================
const GradientAurora = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Orb 1: Purple/Pink */}
      <motion.div
        animate={{ 
          x: [0, 100, -100, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen"
      />
      {/* Orb 2: Orange/Yellow */}
      <motion.div
        animate={{ 
          x: [0, -100, 100, 0],
          y: [0, 100, -100, 0],
          scale: [1, 1.5, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-orange-500/10 blur-[100px] rounded-full mix-blend-screen"
      />
      {/* Orb 3: Pink/Red */}
      <motion.div
        animate={{ 
          x: [0, 50, -50, 0],
          y: [0, 50, 50, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-pink-600/10 blur-[120px] rounded-full mix-blend-screen"
      />
    </div>
  );
};

// ==========================================
// COMPONENT: INTERACTIVE GOAL CARD
// ==========================================
const GoalCard = ({ goal, index }) => {
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
      rgba(255, 255, 255, 0.08),
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
      className="group relative h-full bg-[#0a162e]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-pink-500/30 transition-all duration-300"
    >
      {/* Spotlight Effect */}
      <motion.div
        style={{ background: spotlight }}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />

      <div className="relative z-10 p-8 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${goal.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <span className="text-white drop-shadow-md">{goal.icon}</span>
          </div>
          {/* Heart Icon Interaction */}
          <Heart className="w-5 h-5 text-slate-600 group-hover:text-pink-500 group-hover:fill-pink-500 transition-all duration-300 transform group-hover:scale-110" />
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-pink-300 transition-colors">
          {goal.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed flex-grow">
          {goal.description}
        </p>
      </div>
    </motion.div>
  );
};

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
const InstagramMarketing = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#021333] text-slate-100 font-sans selection:bg-pink-500/30 overflow-hidden">
      
      {/* --- BACKGROUND DESIGN --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Radial Dot Texture */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        
        {/* ANIMATION: Gradient Aurora Flow */}
        <GradientAurora />
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-orange-500/10 border border-pink-500/20 text-pink-300 text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <Instagram className="w-4 h-4" />
              <span>Visual Storytelling Mastery</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              Instagram <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
                Marketing
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"
            >
              Achieve quantifiable outcomes with visually compelling campaigns. We help you define your brand and execute strategies that convert.
            </motion.p>
          </motion.div>
        </section>

        {/* --- STRATEGY & THEORY --- */}
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
                    Refining Your <span className="text-pink-500">Brand Strategy</span>
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full mb-6" />
                </div>

                <div className="prose prose-invert text-slate-400 text-lg leading-relaxed space-y-6">
                  <p>
                    This marketing strategy works well because it has a specific goal to achieve quantifiable outcomes. Unlike other platforms, Instagram requires a high degree of visual consistency.
                  </p>
                  <p>
                    When establishing an Instagram campaign, you must be clear about your goals and the brand you intend to employ. A well-defined objective aids in refining the brand's Instagram communication strategy, ensuring every post serves a purpose.
                  </p>
                  
                  <div className="flex items-center gap-4 mt-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg">
                      <BarChart2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">Data-Driven Creativity</h4>
                      <p className="text-xs text-slate-400">Combining aesthetics with analytics.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Visual Representation (Instagram Post Mockup) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative h-full min-h-[400px] flex items-center justify-center"
              >
                <div className="relative w-[320px] bg-[#000000] rounded-[2rem] border-4 border-slate-800 shadow-2xl overflow-hidden">
                  {/* Insta Header */}
                  <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px]">
                         <div className="w-full h-full bg-black rounded-full border-2 border-black" />
                      </div>
                      <div className="h-2 w-20 bg-slate-700 rounded" />
                    </div>
                    <div className="w-1 h-1 bg-slate-500 rounded-full box-content border-l-[4px] border-r-[4px] border-transparent" />
                  </div>

                  {/* Image Area */}
                  <div className="aspect-square bg-gradient-to-br from-indigo-900 to-purple-900 relative group overflow-hidden">
                     <div className="absolute inset-0 flex items-center justify-center">
                        <Camera className="w-16 h-16 text-white/20" />
                     </div>
                     {/* Heart Animation on Hover */}
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Heart className="w-24 h-24 text-white fill-white animate-ping" />
                     </div>
                  </div>

                  {/* Action Bar */}
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between text-white">
                      <div className="flex gap-4">
                        <Heart className="w-6 h-6 hover:text-red-500 transition-colors cursor-pointer" />
                        <MessageCircle className="w-6 h-6 hover:text-blue-400 transition-colors cursor-pointer" />
                        <Share2 className="w-6 h-6 hover:text-green-400 transition-colors cursor-pointer" />
                      </div>
                      <div className="w-6 h-6 border-2 border-white rounded-sm" />
                    </div>
                    <div className="h-2 w-24 bg-slate-700 rounded" />
                    <div className="h-2 w-full bg-slate-800 rounded" />
                    <div className="h-2 w-2/3 bg-slate-800 rounded" />
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-4 top-20 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 shadow-xl"
                >
                  <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                </motion.div>
                
                <motion.div 
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-4 bottom-32 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 shadow-xl"
                >
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </motion.div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* --- GOALS GRID --- */}
        <section className="py-20 px-6 bg-slate-900/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-pink-500 font-bold text-sm tracking-wider uppercase mb-2 block">Objectives</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Campaign Goals</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {GOALS.map((goal, idx) => (
                <GoalCard key={goal.id} goal={goal} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-pink-500/20 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-orange-500/10" />
              
              <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Ready to Go Viral?</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                 Leverage the power of visual storytelling. Start your Instagram journey with a well-defined strategy and measurable goals.
              </p>
              <button className="relative z-10 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg shadow-pink-500/25 transition-all transform hover:-translate-y-1">
                Launch Instagram Campaign
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

// Helper Icon for Mockup
const MessageCircle = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
);

export default InstagramMarketing;