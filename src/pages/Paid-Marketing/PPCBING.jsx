import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { 
  MousePointer2, 
  TrendingDown, 
  Trophy, 
  Target, 
  BarChart3, 
  Search, 
  ArrowUpRight, 
  DollarSign, 
  PieChart,
  Zap
} from 'lucide-react';

// ==========================================
// CONFIGURATION DATA
// ==========================================
const BENEFITS = [
  {
    id: 1,
    title: "Less Competition",
    description: "Because Bing Ads employs a similar auction dynamic to Google Ads but with fewer advertisers, you benefit from a significant lack of competition.",
    icon: <Trophy className="w-6 h-6" />,
    gradient: "from-cyan-500 to-teal-500"
  },
  {
    id: 2,
    title: "Lower Cost Per Click",
    description: "We observed that almost all clients advertising on both platforms saw an average of 33.5% lower CPC on Bing compared to Google.",
    icon: <TrendingDown className="w-6 h-6" />,
    gradient: "from-green-400 to-emerald-600"
  },
  {
    id: 3,
    title: "Better Placements",
    description: "Due to lower saturation, your advertisements frequently secure higher, more visible placements on the search results page.",
    icon: <Target className="w-6 h-6" />,
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    id: 4,
    title: "Higher CTR",
    description: "Bing users often have higher intent. Advertisements frequently experience higher click-through rates (CTR) than those on competitor platforms.",
    icon: <MousePointer2 className="w-6 h-6" />,
    gradient: "from-purple-500 to-pink-500"
  }
];

// ==========================================
// COMPONENT: SONAR RADAR ANIMATION
// ==========================================
const SonarRadar = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Radar Sweep Line */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] origin-center animate-spin-slow opacity-20">
        <div className="w-1/2 h-full absolute right-0 top-0 bg-gradient-to-l from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 transform rotate-90" 
             style={{ maskImage: 'linear-gradient(to bottom, transparent, black)' }} 
        />
      </div>

      {/* Static Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-cyan-500/10 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-cyan-500/5 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-cyan-500/5 rounded-full" />

      {/* Random "Found" Targets (Pings) */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: Math.random() * 3 + 1,
            delay: Math.random() * 5
          }}
          style={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`
          }}
          className="absolute"
        >
          <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-cyan-400/50 rounded-full animate-ping" />
        </motion.div>
      ))}
    </div>
  );
};

// ==========================================
// COMPONENT: INTERACTIVE CARD
// ==========================================
const StatCard = ({ item, index }) => {
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
      rgba(6, 182, 212, 0.1), 
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
      className="group relative h-full bg-[#0a162e]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300"
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
          <div className="bg-white/5 p-1.5 rounded-lg border border-white/10 group-hover:border-cyan-500/30 transition-colors">
            <Zap className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
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
const PPCBing = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#021333] text-slate-100 font-sans selection:bg-cyan-500/30 overflow-hidden">
      
      {/* --- BACKGROUND DESIGN --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Radial Dot Texture */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        
        {/* Ambient Lights */}
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full" />
        
        {/* ANIMATION: Sonar Radar */}
        <SonarRadar />
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <Search className="w-4 h-4" />
              <span>Undervalued Opportunity</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              PPC <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Bing Ads
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"
            >
              Given that Bing Ads provide significant benefits for marketers, it is reasonable to wonder why it's often an afterthought. Tap into less expensive CPC and a high-intent audience.
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
                    The Hidden <span className="text-cyan-400">Advantage</span>
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mb-6" />
                </div>

                <div className="prose prose-invert text-slate-400 text-lg leading-relaxed space-y-6">
                  <p>
                    The majority of small and medium-sized businesses think of Bing Ads as an afterthought, but they ought to think about it far sooner. 
                  </p>
                  <p>
                    Because Bing Ads employs a similar auction dynamic to Google Ads, its advertisers benefit from a lack of competition in a number of ways. We observed that almost all of the large managed network of clients who were advertising on both Google and Bing had significantly lower costs.
                  </p>
                  
                  <div className="bg-[#0a162e] border border-white/10 rounded-xl p-6 shadow-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-300 text-sm">Average CPC Savings</span>
                      <span className="text-green-400 font-bold text-xl">-33.5%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="w-[33.5%] h-full bg-green-500" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Visual Representation (Comparison Chart) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative h-full min-h-[400px] flex items-center justify-center"
              >
                <div className="relative w-full max-w-md bg-[#0f172a] rounded-3xl border border-slate-700 shadow-2xl p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="text-white font-bold">Cost Comparison</h4>
                    <BarChart3 className="w-5 h-5 text-slate-400" />
                  </div>

                  <div className="space-y-6">
                    {/* Google Bar */}
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-2">
                        <span>Competitor CPC</span>
                        <span>High</span>
                      </div>
                      <div className="h-10 bg-slate-800 rounded-lg relative overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "85%" }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="absolute h-full bg-red-500/20 border-r-2 border-red-500" 
                        />
                      </div>
                    </div>

                    {/* Bing Bar */}
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-2">
                        <span>Bing Ads CPC</span>
                        <span className="text-green-400">Optimal</span>
                      </div>
                      <div className="h-10 bg-slate-800 rounded-lg relative overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "55%" }}
                          transition={{ duration: 1, delay: 0.4 }}
                          className="absolute h-full bg-green-500/20 border-r-2 border-green-500" 
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400 font-bold text-sm">
                          33.5% Less
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Stat */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -right-4 -bottom-4 bg-cyan-500 text-white p-4 rounded-2xl shadow-lg border border-cyan-400"
                  >
                    <div className="flex items-center gap-2">
                      <ArrowUpRight className="w-5 h-5" />
                      <div>
                        <div className="text-xs opacity-80">Placements</div>
                        <div className="font-bold">Premium</div>
                      </div>
                    </div>
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
              <span className="text-cyan-400 font-bold text-sm tracking-wider uppercase mb-2 block">Why Switch?</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Bing Ads Benefits</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {BENEFITS.map((item, idx) => (
                <StatCard key={item.id} item={item} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500/20 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10" />
              
              <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Stop Overpaying for Clicks</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                 There is less competition for Bing Ads than for less expensive CPC. Start advertising where your budget goes further.
              </p>
              <button className="relative z-10 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
                <DollarSign className="w-5 h-5" />
                Start Saving on Ads
              </button>
            </div>
          </div>
        </section>

      </div>
      
      {/* --- CSS FOR ANIMATION --- */}
      <style>{`
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PPCBing;