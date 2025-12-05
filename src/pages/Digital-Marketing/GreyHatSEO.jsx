import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from 'framer-motion';
import { 
  ShieldAlert, 
  MousePointer2, 
  RefreshCcw, 
  GlobeLock, 
  Eye, 
  AlertTriangle,
  Search,
  Zap,
  Anchor,
  FileText
} from 'lucide-react';

// ==========================================
// CONFIGURATION DATA
// ==========================================
const TACTICS = [
  {
    id: 1,
    title: "Clickbait Headlines",
    description: "The term 'bait' describes a tactic whereby someone can find a link or piece of content that encourages readers to click. While it improves CTR, it risks high bounce rates if expectations aren't met.",
    icon: <MousePointer2 className="w-6 h-6" />,
    riskLevel: "Low",
    color: "text-yellow-400",
    gradient: "from-yellow-400 to-orange-500"
  },
  {
    id: 2,
    title: "Content Spinning",
    description: "Using software to rewrite existing articles by replacing words with synonyms. It creates 'unique' content for search engines but often results in lower readability for humans.",
    icon: <RefreshCcw className="w-6 h-6" />,
    riskLevel: "Medium",
    color: "text-orange-400",
    gradient: "from-orange-400 to-red-500"
  },
  {
    id: 3,
    title: "Expired Domains",
    description: "Purchasing old domains with high authority that have expired and repurposing them. This leverages their existing backlink profile to boost new content rankings quickly.",
    icon: <GlobeLock className="w-6 h-6" />,
    riskLevel: "High",
    color: "text-red-400",
    gradient: "from-red-400 to-pink-600"
  },
  {
    id: 4,
    title: "Cloaking (Soft)",
    description: "Showing slightly different content to search engines than to users. While hard cloaking is Black Hat, Grey Hat involves subtle changes, like prioritizing text for bots and visuals for humans.",
    icon: <Eye className="w-6 h-6" />,
    riskLevel: "High",
    color: "text-red-500",
    gradient: "from-red-500 to-purple-600"
  }
];

// ==========================================
// COMPONENT: INTERACTIVE CARD
// ==========================================
const TacticCard = ({ tactic, index }) => {
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
      rgba(255, 255, 255, 0.1),
      transparent 80%
    )
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      className="group relative h-full bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden"
    >
      {/* Spotlight Effect */}
      <motion.div
        style={{ background: spotlight }}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />

      <div className="relative z-10 p-8 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${tactic.gradient} bg-opacity-10 shadow-lg`}>
            <span className="text-white drop-shadow-md">{tactic.icon}</span>
          </div>
          <span className={`text-xs font-bold px-3 py-1 rounded-full border border-white/10 bg-white/5 text-slate-300`}>
            {tactic.riskLevel} Risk
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">
          {tactic.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed flex-grow">
          {tactic.description}
        </p>
      </div>
    </motion.div>
  );
};

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
const GreyHatSEO = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#021333] text-slate-100 font-sans selection:bg-blue-500/30 overflow-hidden">
      
      {/* --- BACKGROUND DESIGN --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Radial Dot Texture (Matches Pricing Page) */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        
        {/* Ambient Lights */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10">
        
        {/* --- HERO SECTION --- */}
        <section className="relative pt-32 pb-20 px-6 min-h-[70vh] flex items-center justify-center text-center">
          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Advanced SEO Strategies</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              Grey Hat <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                SEO Techniques
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"
            >
              Everything in Grey Hat revolves around the interpretation of "SEO practice." 
              It is a place where strategies exist in contradiction to established guidelines 
              to accelerate growth without crossing into the darkness.
            </motion.p>
          </motion.div>
        </section>

        {/* --- THEORY & DEFINITION SECTION --- */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              
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
                    Defining the <span className="text-blue-400">Grey Area</span>
                  </h2>
                  <div className="h-1 w-20 bg-blue-500 rounded-full mb-6" />
                </div>

                <div className="prose prose-invert text-slate-400 text-lg leading-relaxed space-y-6">
                  <p>
                    The phrase <strong>"SEO practice"</strong> is still used by search engines to describe stated rules. 
                    However, few Grey Hat practitioners take a step back from the wheel and define Grey Hat methods 
                    for any published content that comes from Google.
                  </p>
                  <p className="pl-4 border-l-2 border-blue-500/50 italic text-slate-300">
                    "It is a place where reasonable people can agree on strategies that are in contradiction to established guidelines."
                  </p>
                  <p>
                    When it comes to quick examples, the term <strong>"bait"</strong> describes a tactic whereby 
                    someone can find a link or piece of content that encourages readers to click. This leverages 
                    psychology rather than purely technical merit.
                  </p>
                </div>
              </motion.div>

              {/* Visual/Iconic Representation */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="relative bg-gradient-to-br from-slate-900/80 to-[#021333]/80 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 text-blue-500/20">
                    <Zap className="w-24 h-24" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-8 border-b border-white/10 pb-4">Strategy Spectrum</h3>
                  
                  <div className="space-y-6">
                    {/* White Hat */}
                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-green-400/50 transition-colors">
                        <Anchor className="w-5 h-5 text-slate-400 group-hover:text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold group-hover:text-green-400 transition-colors">White Hat</h4>
                        <p className="text-sm text-slate-500">Stated Rules & Safe Practice</p>
                      </div>
                    </div>

                    {/* Grey Hat (Highlighted) */}
                    <div className="relative">
                      <div className="absolute -left-4 -right-4 -top-2 -bottom-2 bg-blue-500/10 rounded-xl border border-blue-500/20" />
                      <div className="relative flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                          <Search className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-lg">Grey Hat</h4>
                          <p className="text-sm text-blue-200">The "Bait" & The Contradiction</p>
                        </div>
                      </div>
                    </div>

                    {/* Black Hat */}
                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-red-400/50 transition-colors">
                        <AlertTriangle className="w-5 h-5 text-slate-400 group-hover:text-red-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold group-hover:text-red-400 transition-colors">Black Hat</h4>
                        <p className="text-sm text-slate-500">Violations & Penalties</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- TACTICS GRID --- */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-blue-400 font-bold text-sm tracking-wider uppercase mb-2 block">Methodology</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Common Tactics</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {TACTICS.map((tactic, idx) => (
                <TacticCard key={tactic.id} tactic={tactic} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* --- RISK VS REWARD --- */}
        <section className="py-24 px-6 relative overflow-hidden bg-slate-900/30">
          <div className="container mx-auto max-w-5xl relative z-10">
            <div className="bg-gradient-to-r from-[#0a162e] to-[#0f1f3d] rounded-3xl p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden">
              
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />

              <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 mb-4 text-yellow-500">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-bold uppercase tracking-wide text-xs">Strategic Analysis</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Risk vs Reward</h3>
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    Grey Hat techniques are often used when a business needs quicker traction than pure SEO allows. It defines methods for any published content that technically comes from Google indexation but leverages "Bait" to encourage clicks.
                  </p>
                  <ul className="space-y-3">
                    {["Faster indexing of new content", "Higher CTR via psychological triggers", "Leveraging existing authority"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex-1 w-full">
                  <div className="bg-[#021333]/80 rounded-xl p-6 border border-white/5 backdrop-blur-sm">
                    {/* Progress Bar 1 */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-white">Ranking Speed</span>
                        <span className="text-xs text-green-400">High</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "85%" }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-blue-600 to-green-400"
                        />
                      </div>
                    </div>

                    {/* Progress Bar 2 */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-white">Sustainability</span>
                        <span className="text-xs text-yellow-400">Moderate</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "50%" }}
                          transition={{ duration: 1, delay: 0.4 }}
                          className="h-full bg-gradient-to-r from-blue-600 to-yellow-400"
                        />
                      </div>
                    </div>

                    {/* Progress Bar 3 */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-white">Risk Factor</span>
                        <span className="text-xs text-red-400">Elevated</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "65%" }}
                          transition={{ duration: 1, delay: 0.6 }}
                          className="h-full bg-gradient-to-r from-blue-600 to-red-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default GreyHatSEO;