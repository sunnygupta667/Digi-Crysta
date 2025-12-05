import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { 
  Search, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Layers, 
  Eye, 
  Twitter, 
  Users, 
  BarChart3, 
  Target, 
  Sliders,
  MousePointer2
} from 'lucide-react';

// ==========================================
// CONFIGURATION DATA
// ==========================================
const FEATURES = [
  {
    id: 1,
    title: "Device Targeting",
    description: "Unlike competitors, Bing allows advertisers to exclude desktop traffic or specifically target mobile devices by operating system. You retain full control over bid adjustments for desktops, tablets, and smartphones independently.",
    icon: <Smartphone className="w-6 h-6" />,
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    id: 2,
    title: "Partner Transparency",
    description: "Gain full visibility into which search partners drive traffic to your site. Run 'Site URL' reports and exclude specific underperforming partners without opting out of the entire network.",
    icon: <Eye className="w-6 h-6" />,
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    id: 3,
    title: "Social Extensions",
    description: "Bing automatically displays your Twitter follower count next to your ads, adding immediate social proof and credibility that encourages higher click-through rates.",
    icon: <Twitter className="w-6 h-6" />,
    gradient: "from-sky-400 to-blue-400"
  },
  {
    id: 4,
    title: "Demographic Control",
    description: "Adjust bids based on age and gender directly within search campaigns. Bing offers sophisticated demographic targeting options often reserved for display networks on other platforms.",
    icon: <Users className="w-6 h-6" />,
    gradient: "from-indigo-500 to-purple-600"
  }
];

// ==========================================
// COMPONENT: HOLOGRAPHIC GRID ANIMATION
// ==========================================
const HolographicGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none perspective-1000">
      {/* Moving Grid Floor */}
      <motion.div
        initial={{ rotateX: 60, y: 0 }}
        animate={{ y: [0, 40] }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute inset-[-50%] w-[200%] h-[200%] opacity-20"
        style={{
          background: `
            linear-gradient(transparent 0%, rgba(6, 182, 212, 0.5) 1px, transparent 2px),
            linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.5) 1px, transparent 2px)
          `,
          backgroundSize: '40px 40px',
          transformOrigin: 'center top'
        }}
      />

      {/* Glowing Data Blocks */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            scale: 0,
            x: Math.random() * 100 + "vw",
            y: Math.random() * 50 + 50 + "vh"
          }}
          animate={{ 
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.5, 0.5]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
          className="absolute w-8 h-8 bg-cyan-500/20 border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.4)] backdrop-blur-sm"
        />
      ))}
      
      {/* Horizon Fade */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#021333] to-transparent z-10" />
    </div>
  );
};

// ==========================================
// COMPONENT: INTERACTIVE FEATURE CARD
// ==========================================
const FeatureCard = ({ feature, index }) => {
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
          <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <span className="text-white drop-shadow-md">{feature.icon}</span>
          </div>
          <div className="bg-white/5 p-1.5 rounded-lg border border-white/10 group-hover:border-cyan-500/30 transition-colors">
            <Sliders className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
          {feature.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed flex-grow">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
const BingAdvertising = () => {
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
        
        {/* ANIMATION: Holographic Grid */}
        <HolographicGrid />
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
              <span>Microsoft Advertising Network</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              Bing <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Advertising
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"
            >
              Leverage superior device targeting options and demographic control. While others force migration, Bing Ads offers the transparency and flexibility professional marketers demand.
            </motion.p>
          </motion.div>
        </section>

        {/* --- DETAILED CONTENT SECTION --- */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              
              {/* Left Column: Device Targeting */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="bg-[#0a162e]/50 border border-white/5 rounded-2xl p-8 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Monitor className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Superior Device Control</h3>
                  </div>
                  
                  <p className="text-slate-400 leading-relaxed mb-6">
                    The forced migration to enhanced campaigns elsewhere has shown disdain for the paid search community. Campaigns are often searched by default via desktops, tablets, and mobile devices indiscriminately.
                  </p>
                  <p className="text-slate-400 leading-relaxed">
                    <strong>Bing Ads is different.</strong> Users can regulate bids for mobile devices independently, or choose to focus purely on desktop searches. As of right now, Bing advertisers can still exclude desktop traffic or target specific mobile operating systems, offering granular control that maximizes ROI.
                  </p>
                </div>

                <div className="bg-[#0a162e]/50 border border-white/5 rounded-2xl p-8 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-indigo-500/10 rounded-lg">
                      <Target className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Advanced Demographics</h3>
                  </div>
                  
                  <p className="text-slate-400 leading-relaxed">
                    While Google Ads offers demographic targeting primarily on the display network, Bing Ads brings this power to <strong>Search</strong>. Clients can modify bids based on age and gender ranges directly for search queries. This advanced targeting helps advertisers reach the exact persona for their products and services without guessing.
                  </p>
                </div>
              </motion.div>

              {/* Right Column: Transparency & Partners */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="relative h-[400px] bg-gradient-to-br from-[#0f172a] to-[#021333] border border-cyan-500/20 rounded-2xl p-8 overflow-hidden shadow-2xl">
                  {/* Background Grid for Visual Interest */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xl font-bold text-white">Partner Transparency</h3>
                      <Layers className="w-5 h-5 text-cyan-400" />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-slate-300">
                        <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                          <span className="text-red-400 font-bold">G</span>
                        </div>
                        <p>Target Search OR Search + Partners. No granular exclusion.</p>
                      </div>
                      
                      <div className="flex items-center justify-center py-2">
                        <div className="h-8 w-px bg-slate-700" />
                      </div>

                      <div className="flex items-center gap-4 text-sm text-white bg-cyan-500/10 p-3 rounded-lg border border-cyan-500/20">
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                          <span className="text-cyan-400 font-bold">B</span>
                        </div>
                        <div>
                          <p className="font-bold text-cyan-300">Total Visibility</p>
                          <p className="text-xs text-slate-400 mt-1">Run "Site URL" reports. See exactly which partner (e.g., MSN.com) drives traffic and exclude specific ones without opting out entirely.</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                        <span>MSN.com CPA</span>
                        <span className="text-green-400 font-mono">$82.00</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-cyan-500 to-blue-500" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0a162e]/50 border border-white/5 rounded-2xl p-8 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-sky-500/10 rounded-lg">
                      <Twitter className="w-6 h-6 text-sky-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Social Extensions</h3>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Bing creates automated social extensions by displaying the number of Twitter followers next to your advertisements. This adds a layer of trust and activity that Google's retired platforms can no longer match.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* --- FEATURES GRID --- */}
        <section className="py-20 px-6 bg-slate-900/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-cyan-400 font-bold text-sm tracking-wider uppercase mb-2 block">Key Advantages</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Why Choose Bing Ads?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((feature, idx) => (
                <FeatureCard key={feature.id} feature={feature} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500/20 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10" />
              
              <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Stop Flying Blind</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                 Gain the transparency and control your campaigns deserve. Switch to a strategy that prioritizes granular targeting and ROI.
              </p>
              <button className="relative z-10 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
                <BarChart3 className="w-5 h-5" />
                Audit Your Strategy
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default BingAdvertising;