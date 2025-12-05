import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { 
  Search, 
  MousePointerClick, 
  TrendingUp, 
  DollarSign, 
  Layout, 
  Target, 
  BarChart, 
  Globe,
  Zap,
  CheckCircle2
} from 'lucide-react';

// ==========================================
// CONFIGURATION DATA
// ==========================================
const BENEFITS = [
  {
    id: 1,
    title: "Immediate Visibility",
    description: "Place adverts directly on the Google search results page. Your ads appear at the top and bottom, distinguishing themselves with a small 'Ad' tag for immediate attention.",
    icon: <Layout className="w-6 h-6" />,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    title: "High Conversion Intent",
    description: "In actuality, over 75% of clicks on comparisons now come from paid search. PPC visitors are significantly more likely to purchase than standard organic visitors.",
    icon: <MousePointerClick className="w-6 h-6" />,
    gradient: "from-red-500 to-orange-500"
  },
  {
    id: 3,
    title: "Cost-Effective Budgeting",
    description: "PPC is extremely cost-effective. You engage in an efficient way to spend a marketing budget because you are only charged when the target audience actually clicks.",
    icon: <DollarSign className="w-6 h-6" />,
    gradient: "from-green-500 to-emerald-500"
  },
  {
    id: 4,
    title: "Precision Keyword Targeting",
    description: "Bids are placed on specific keywords that the target audience types into search fields. The search engine matches your ad to the user's exact query.",
    icon: <Target className="w-6 h-6" />,
    gradient: "from-yellow-400 to-amber-500"
  }
];

// ==========================================
// COMPONENT: ALGORITHM NETWORK ANIMATION
// ==========================================
const AlgorithmNetwork = () => {
  // Generate random nodes
  const nodes = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    color: ['#4285F4', '#DB4437', '#F4B400', '#0F9D58'][i % 4], // Google Colors
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg className="w-full h-full">
        {/* Abstract Connecting Lines */}
        {nodes.map((node, i) => (
          <motion.line
            key={`line-${i}`}
            x1={`${node.x}%`}
            y1={`${node.y}%`}
            x2={`${nodes[(i + 1) % nodes.length].x}%`}
            y2={`${nodes[(i + 1) % nodes.length].y}%`}
            stroke={node.color}
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: node.duration,
              repeat: Infinity,
              ease: "linear",
              delay: node.delay
            }}
          />
        ))}

        {/* Pulsing Nodes */}
        {nodes.map((node, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size}
            fill={node.color}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 2, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: node.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
      
      {/* Soft Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#021333]/50 to-[#021333]" />
    </div>
  );
};

// ==========================================
// COMPONENT: INTERACTIVE FEATURE CARD
// ==========================================
const FeatureCard = ({ item, index }) => {
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
      rgba(66, 133, 244, 0.1), 
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
        <div className="flex justify-between items-start mb-6">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <span className="text-white drop-shadow-md">{item.icon}</span>
          </div>
          <div className="bg-white/5 p-1.5 rounded-lg border border-white/10 group-hover:border-blue-500/30 transition-colors">
            <Zap className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
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
const PPCGoogle = () => {
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
        
        {/* Ambient Google Brand Lights */}
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-red-900/10 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-900/5 blur-[150px] rounded-full" />
        
        {/* ANIMATION: Algorithm Network */}
        <AlgorithmNetwork />
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
              <Globe className="w-4 h-4" />
              <span>Global Search Dominance</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              PPC <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-red-400 to-yellow-400">
                Google Ads
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"
            >
              For many years, PPC has been a successful paid marketing advertising tactic. Leverage the world's top online advertising platform to place your brand at the top of search results.
            </motion.p>
          </motion.div>
        </section>

        {/* --- STRATEGY CONTENT --- */}
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
                    The Auction <span className="text-blue-400">Advantage</span>
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-6" />
                </div>

                <div className="prose prose-invert text-slate-400 text-lg leading-relaxed space-y-6">
                  <p>
                    Google Ads (formerly AdWords) is among the top online advertising platforms that let companies place adverts on the search results page. The sole distinction between these adverts and typical search results is the small green word <strong>"Ad"</strong>.
                  </p>
                  <p>
                    In the PPC industry, bids are placed on keywords that the target audience types into each search field. When a user enters a search query, the search engine matches the keyword instantly.
                  </p>
                  
                  <div className="space-y-4 mt-4">
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-900/10 border border-blue-500/20">
                      <Search className="w-6 h-6 text-blue-400" />
                      <div>
                        <h4 className="font-bold text-white text-sm">Search Intent</h4>
                        <p className="text-xs text-slate-400">Captures users actively looking for solutions.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-green-900/10 border border-green-500/20">
                      <TrendingUp className="w-6 h-6 text-green-400" />
                      <div>
                        <h4 className="font-bold text-white text-sm">Natural Rankings</h4>
                        <p className="text-xs text-slate-400">Techniques progressively assist natural site growth.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Visual Representation (Search Page Mockup) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative h-full min-h-[450px] flex items-center justify-center"
              >
                <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
                  {/* Fake Search Bar */}
                  <div className="p-4 border-b border-slate-100 flex items-center gap-3 shadow-sm relative z-10">
                    <div className="w-8 h-8 rounded-full bg-slate-100 p-2">
                      <div className="w-full h-full rounded-full border-2 border-slate-400" />
                    </div>
                    <div className="flex-1 h-10 bg-slate-100 rounded-full flex items-center px-4">
                      <Search className="w-4 h-4 text-slate-400 mr-2" />
                      <div className="w-24 h-2 bg-slate-300 rounded" />
                    </div>
                  </div>

                  {/* Search Results */}
                  <div className="p-6 space-y-6 bg-slate-50 min-h-[350px]">
                    {/* AD Result 1 */}
                    <motion.div 
                      initial={{ y: 10, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-black text-xs px-1 border border-black rounded-[3px]">Ad</span>
                        <div className="w-32 h-3 bg-slate-300 rounded" />
                      </div>
                      <div className="w-3/4 h-4 bg-blue-600 rounded" />
                      <div className="w-full h-2 bg-slate-300 rounded" />
                      <div className="w-5/6 h-2 bg-slate-300 rounded" />
                    </motion.div>

                    {/* AD Result 2 */}
                    <motion.div 
                      initial={{ y: 10, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-black text-xs px-1 border border-black rounded-[3px]">Ad</span>
                        <div className="w-24 h-3 bg-slate-300 rounded" />
                      </div>
                      <div className="w-2/3 h-4 bg-blue-600 rounded" />
                      <div className="w-full h-2 bg-slate-300 rounded" />
                    </motion.div>

                    {/* Organic Result */}
                    <motion.div 
                      initial={{ y: 10, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="space-y-2 pt-4 border-t border-slate-200"
                    >
                      <div className="w-20 h-3 bg-slate-300 rounded" />
                      <div className="w-1/2 h-4 bg-blue-900/80 rounded" />
                      <div className="w-full h-2 bg-slate-300 rounded" />
                    </motion.div>
                  </div>

                  {/* Cursor Animation */}
                  <motion.div 
                    animate={{ 
                      x: [50, 150, 150], 
                      y: [100, 80, 80],
                      scale: [1, 1, 0.9]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 left-0"
                  >
                    <MousePointerClick className="w-8 h-8 text-black fill-white drop-shadow-xl" />
                  </motion.div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* --- BENEFITS GRID --- */}
        <section className="py-20 px-6 bg-slate-900/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-blue-400 font-bold text-sm tracking-wider uppercase mb-2 block">Key Advantages</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Why Use PPC?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {BENEFITS.map((item, idx) => (
                <FeatureCard key={item.id} item={item} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="bg-gradient-to-r from-blue-900/40 to-green-900/40 border border-blue-500/20 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10" />
              
              <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Maximize Your Budget</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                 Choose among websites that are pertinent to the page without dealing with pop-ups. PPC is extremely cost-effective and meant to be seen by your target audience.
              </p>
              <button className="relative z-10 px-8 py-4 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-500 hover:to-green-400 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
                <BarChart className="w-5 h-5" />
                Start Advertising
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default PPCGoogle;