import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  SearchCheck, 
  LayoutTemplate, 
  Smartphone, 
  Link, 
  BarChart4,
  CheckCircle2,
  ThumbsUp,
  Award,
  Zap,
  ArrowRight,
  TrendingUp,
  Users
} from 'lucide-react';

// ==========================================
// CONFIGURATION DATA
// ==========================================
const STRATEGIES = [
  {
    id: 1,
    title: "High-Quality Content",
    description: "Creating valuable, original content that solves user problems. This is the cornerstone of White Hat SEO, ensuring users spend time on your site and engage with your brand.",
    icon: <LayoutTemplate className="w-6 h-6" />,
    benefit: "Sustainable Traffic",
    color: "text-blue-400",
    gradient: "from-blue-400 to-cyan-400"
  },
  {
    id: 2,
    title: "Technical Optimization",
    description: "Ensuring your website is crawlable and indexable. This includes optimizing site architecture, using proper schema markup, and fixing broken links to help bots understand your site.",
    icon: <SearchCheck className="w-6 h-6" />,
    benefit: "Better Indexing",
    color: "text-purple-400",
    gradient: "from-purple-400 to-pink-500"
  },
  {
    id: 3,
    title: "Mobile Responsiveness",
    description: "With mobile-first indexing, ensuring your site performs perfectly on smartphones is non-negotiable. We focus on responsive design and touch-friendly navigation.",
    icon: <Smartphone className="w-6 h-6" />,
    benefit: "User Retention",
    color: "text-green-400",
    gradient: "from-green-400 to-emerald-500"
  },
  {
    id: 4,
    title: "Ethical Link Building",
    description: "Earning backlinks naturally through guest posting, creating shareable infographics, and building relationships, rather than buying links or using link farms.",
    icon: <Link className="w-6 h-6" />,
    benefit: "Domain Authority",
    color: "text-amber-400",
    gradient: "from-amber-400 to-orange-500"
  }
];

const CASE_STUDIES = [
  {
    id: 1,
    client: "TechFlow Solutions",
    industry: "SaaS",
    result: "+150% Organic Traffic",
    desc: "Implemented a content cluster strategy focused on user intent, resulting in page 1 rankings for 40+ high-value keywords.",
    icon: <TrendingUp className="w-5 h-5 text-green-400" />
  },
  {
    id: 2,
    client: "Urban Decor",
    industry: "E-Commerce",
    result: "3x ROI in 6 Months",
    desc: "Fixed technical crawl errors and optimized product schema, leading to a significant increase in rich snippet visibility.",
    icon: <BarChart4 className="w-5 h-5 text-blue-400" />
  },
  {
    id: 3,
    client: "HealthFirst",
    industry: "Healthcare",
    result: "+80% User Retention",
    desc: "Redesigned mobile experience and improved Core Web Vitals, drastically reducing bounce rates and improving trust signals.",
    icon: <Users className="w-5 h-5 text-purple-400" />
  }
];

// ==========================================
// COMPONENT: RISING DATA STREAMS ANIMATION
// ==========================================
const RisingStreams = () => {
  // Create an array of random streams
  const streams = Array.from({ length: 15 }); // Reduced count slightly for mobile performance

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      {streams.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            y: "110vh", 
            x: Math.random() * 100 + "vw", 
            opacity: 0, 
            height: Math.random() * 80 + 40 
          }}
          animate={{ 
            y: "-20vh", 
            opacity: [0, 0.4, 0] 
          }}
          transition={{ 
            duration: Math.random() * 10 + 15, // Slower for smoother feel
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 10
          }}
          className="absolute w-[1px] bg-gradient-to-t from-transparent via-blue-400 to-transparent"
        />
      ))}
    </div>
  );
};

// ==========================================
// COMPONENT: INTERACTIVE STRATEGY CARD
// ==========================================
const StrategyCard = ({ strategy, index }) => {
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
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      className="group relative h-full bg-[#0a162e]/60 backdrop-blur-xl border border-blue-500/10 hover:border-blue-500/30 rounded-2xl overflow-hidden transition-colors"
    >
      {/* Spotlight Effect */}
      <motion.div
        style={{ background: spotlight }}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />

      <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
        <div className="flex flex-wrap justify-between items-start mb-6 gap-3">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${strategy.gradient} bg-opacity-10 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <span className="text-white drop-shadow-md">{strategy.icon}</span>
          </div>
          <span className={`flex items-center gap-1 text-[10px] font-bold px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-200 uppercase tracking-wider`}>
            <CheckCircle2 className="w-3 h-3" /> {strategy.benefit}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
          {strategy.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed flex-grow">
          {strategy.description}
        </p>
      </div>
    </motion.div>
  );
};

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
const WhiteHatSEO = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [showCaseStudies, setShowCaseStudies] = useState(false);
  
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
        
        {/* Ambient Clean Lights */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] md:w-[800px] md:h-[500px] bg-cyan-600/10 blur-[120px] rounded-full" />
        
        {/* NEW ANIMATION: Rising Data Streams */}
        <RisingStreams />
      </div>

      <div className="relative z-10">
        
        {/* --- HERO SECTION --- */}
        <section className="relative pt-32 pb-20 px-4 md:px-6 min-h-[60vh] flex items-center justify-center text-center">
          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-xs md:text-sm font-medium mb-8 backdrop-blur-sm shadow-[0_0_15px_rgba(34,197,94,0.1)]"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>100% Google Compliant Strategies</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              White Hat <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                Ethical Growth
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto px-4"
            >
              Sustainable, long-term SEO strategies that focus on human audiences and strictly adhere to search engine guidelines. No tricks, just results.
            </motion.p>
          </motion.div>
        </section>

        {/* --- DEFINITION & PHILOSOPHY --- */}
        <section className="py-16 md:py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6 md:space-y-8 order-2 lg:order-1"
              >
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    The Philosophy of <span className="text-blue-400">Purity</span>
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-green-400 rounded-full mb-6" />
                </div>

                <div className="prose prose-invert text-slate-400 text-base md:text-lg leading-relaxed space-y-4 md:space-y-6">
                  <p>
                    <strong>White Hat SEO</strong> refers to the usage of optimization strategies, techniques, and tactics that focus on a human audience opposed to search engines and completely follows search engine rules and policies.
                  </p>
                  <p>
                    For example, a website that is optimized for search engines, yet focuses on relevancy and organic ranking is considered to be optimized using White Hat SEO practices.
                  </p>
                  <div className="flex flex-col gap-4 mt-4">
                    <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                      <ThumbsUp className="w-6 h-6 text-green-400 shrink-0 mt-1" />
                      <div>
                        <h4 className="text-white font-bold text-sm">Human First Approach</h4>
                        <p className="text-sm text-slate-400">We prioritize user experience (UX), creating content that engages and retains real people.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                      <Award className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
                      <div>
                        <h4 className="text-white font-bold text-sm">Long-Term Stability</h4>
                        <p className="text-sm text-slate-400">Immunity from Google Algorithm updates (Core Updates, Penguin, Panda) because we follow the rules.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Visual Representation (Responsive Orbit) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative h-[300px] md:h-[450px] flex items-center justify-center order-1 lg:order-2"
              >
                 {/* Glowing Center Hub */}
                 <div className="relative w-40 h-40 md:w-64 md:h-64 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(34,211,238,0.3)] md:shadow-[0_0_80px_rgba(34,211,238,0.3)] z-10 animate-pulse">
                    <ShieldCheck className="w-16 h-16 md:w-24 md:h-24 text-white drop-shadow-lg" />
                 </div>
                 
                 {/* Orbiting Elements - Responsive Sizing */}
                 <div className="absolute w-[280px] h-[280px] md:w-[400px] md:h-[400px] border border-dashed border-white/10 rounded-full animate-spin-slow" />
                 <div className="absolute w-[350px] h-[350px] md:w-[550px] md:h-[550px] border border-white/5 rounded-full" />

                 {/* Satellite Nodes - Responsive Positioning */}
                 <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[280px] h-[280px] md:w-[400px] md:h-[400px]"
                 >
                   <div className="absolute -top-2 left-1/2 w-4 h-4 md:w-6 md:h-6 bg-green-400 rounded-full shadow-[0_0_20px_rgba(74,222,128,0.6)]" />
                 </motion.div>

                 <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[350px] h-[350px] md:w-[550px] md:h-[550px]"
                 >
                   <div className="absolute top-1/2 -right-2 w-3 h-3 md:w-4 md:h-4 bg-blue-400 rounded-full shadow-[0_0_20px_rgba(96,165,250,0.6)]" />
                 </motion.div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* --- STRATEGIES GRID --- */}
        <section className="py-16 md:py-20 px-4 md:px-6 bg-slate-900/20">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <span className="text-green-400 font-bold text-sm tracking-wider uppercase mb-2 block">Our Methodology</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">The Pillars of SEO</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {STRATEGIES.map((strategy, idx) => (
                <StrategyCard key={strategy.id} strategy={strategy} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* --- FOOTER CTA SECTION --- */}
        <section className="py-20 md:py-24 px-4 md:px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-b from-[#0f172a] to-[#021333] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden transition-all duration-500"
            >
              {/* Background Glow */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-50" />

              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-400">
                 <Zap className="w-8 h-8" />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Ready for Sustainable Growth?</h2>
              <p className="text-slate-400 text-base md:text-lg mb-8 max-w-2xl mx-auto">
                Stop worrying about the next algorithm update destroying your business. Build a solid foundation with Digi Crysta's White Hat strategies.
              </p>
              
              <div className="flex justify-center">
                <button 
                  onClick={() => setShowCaseStudies(!showCaseStudies)}
                  className="group relative px-8 py-4 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  {showCaseStudies ? 'Hide Case Studies' : 'View Case Studies'}
                  <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${showCaseStudies ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                </button>
              </div>

              {/* EXPANDABLE CASE STUDIES */}
              <AnimatePresence>
                {showCaseStudies && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                      {CASE_STUDIES.map((study, idx) => (
                        <motion.div
                          key={study.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="bg-slate-900/50 border border-white/5 p-6 rounded-xl hover:border-blue-500/30 transition-colors"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            {study.icon}
                            <span className="text-xs font-bold uppercase text-slate-500">{study.industry}</span>
                          </div>
                          <h4 className="text-white font-bold text-lg mb-1">{study.client}</h4>
                          <span className="text-green-400 font-bold text-sm block mb-3">{study.result}</span>
                          <p className="text-slate-400 text-xs leading-relaxed">{study.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </div>
        </section>

      </div>

      {/* --- CSS FOR SPINNERS --- */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default WhiteHatSEO;