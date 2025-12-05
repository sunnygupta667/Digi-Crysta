import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { 
  Share2, 
  Globe, 
  Search, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Rss, 
  Megaphone,
  Link,
  MousePointer2
} from 'lucide-react';

// ==========================================
// CONFIGURATION DATA
// ==========================================
const REASONS = [
  {
    id: 1,
    title: "Reputation & Visibility",
    description: "Gaining greater reputation and encouraging more visitors to visit your website naturally. It's about getting found by the right individuals where they spend their time.",
    icon: <Globe className="w-6 h-6" />,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    title: "The SEO Partnership",
    description: "Social networks are becoming essential search engines. A solid SEO strategy must be incorporated into a successful web-based living style as they go hand in hand.",
    icon: <Search className="w-6 h-6" />,
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    id: 3,
    title: "Organic Discovery",
    description: "Despite apparent differences, the objectives of SEO and SMO are similar: improving organic traffic and ensuring your brand is discoverable by search spiders.",
    icon: <Share2 className="w-6 h-6" />,
    gradient: "from-cyan-500 to-teal-500"
  }
];

const DEEP_DIVE_CONTENT = [
  {
    id: "indexing",
    title: "How Social Media Content is Indexed",
    content: "Your overall effort to showcase your content is impacted by the consistency of your online distribution. Web crawlers (spiders) can now crawl and organize your social existence. While not every tweet is indexed, high-engagement content enters the record quickly. If a post becomes a web sensation, search spiders find it efficiently, leading to potential rises in SERPs.",
    icon: <Rss className="w-8 h-8 text-orange-400" />
  },
  {
    id: "authority",
    title: "Developing Authority",
    content: "Web crawlers add power to websites that are highly esteemed. Authority emerges over time as you provide quality content and relevant backlinks. By concentrating on creating an attractive network of social followers, your content gains more relevant places to reside, boosting your domain's perceived expertise.",
    icon: <ShieldCheck className="w-8 h-8 text-green-400" />
  },
  {
    id: "people",
    title: "The Human Element",
    content: "SEO shouldn't be your sole focus. Black hat techniques fail because they remove the 'client' from the equation. SMO is essential because it is made up of real people. It enables you to target specific personas, divide your audience, and understand the real-world effect your brand is having.",
    icon: <Users className="w-8 h-8 text-pink-400" />
  }
];

// ==========================================
// COMPONENT: ORBITAL SIGNAL ANIMATION
// ==========================================
const OrbitalSignals = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      {/* Central Core (Website) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/20 blur-[40px] rounded-full" />
      
      {/* Orbit 1 */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-blue-500/10 rounded-full"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
      </motion.div>

      {/* Orbit 2 (Reverse) */}
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-indigo-500/10 rounded-full"
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-indigo-400 rounded-full shadow-[0_0_15px_rgba(129,140,248,0.8)]" />
        <div className="absolute top-1/2 right-0 w-2 h-2 bg-purple-400 rounded-full" />
      </motion.div>

      {/* Orbit 3 */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-cyan-500/5 rounded-full"
      >
         <div className="absolute top-1/2 left-0 w-2 h-2 bg-teal-400 rounded-full" />
      </motion.div>

      {/* Connecting Signal Lines (Abstract) */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <motion.line 
          x1="50%" y1="50%" x2="20%" y2="20%" 
          stroke="url(#grad1)" 
          strokeWidth="1"
          strokeDasharray="5,5"
        />
        <motion.line 
          x1="50%" y1="50%" x2="80%" y2="80%" 
          stroke="url(#grad1)" 
          strokeWidth="1"
          strokeDasharray="5,5"
        />
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0 }} />
            <stop offset="50%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0 }} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// ==========================================
// COMPONENT: SPOTLIGHT CARD
// ==========================================
const SpotlightCard = ({ item, index }) => {
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
      <motion.div
        style={{ background: spotlight }}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />

      <div className="relative z-10 p-8 flex flex-col h-full">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} p-0.5 mb-6 group-hover:scale-110 transition-transform`}>
           <div className="w-full h-full bg-[#0a162e] rounded-[10px] flex items-center justify-center">
             {item.icon}
           </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
          {item.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
const SocialMediaOptimization = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#021333] text-slate-100 font-sans selection:bg-cyan-500/30 overflow-hidden">
      
      {/* --- BACKGROUND DESIGN --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        <div className="absolute top-0 left-0 w-[600px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full" />
        
        {/* ANIMATION: Orbital Signals */}
        <OrbitalSignals />
      </div>

      <div className="relative z-10">
        
        {/* --- HERO SECTION --- */}
        <section className="relative pt-32 pb-20 px-6 min-h-[60vh] flex items-center justify-center text-center">
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
              <Share2 className="w-4 h-4" />
              <span>Amplify Your Presence</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              Social Media <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Optimization
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"
            >
              Maximize your social networks to get found by the right individuals. Social networks are becoming essential search engines—make sure you're indexed.
            </motion.p>
          </motion.div>
        </section>

        {/* --- THREE REASONS GRID --- */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-cyan-400 font-bold text-sm tracking-wider uppercase mb-2 block">Why SMO Matters</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Three Core Reasons</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {REASONS.map((item, idx) => (
                <SpotlightCard key={item.id} item={item} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* --- DEEP DIVE SECTIONS (ALTERNATING) --- */}
        <section className="py-20 px-6 bg-slate-900/20">
          <div className="container mx-auto max-w-6xl space-y-24">
            {DEEP_DIVE_CONTENT.map((section, idx) => (
              <div key={section.id} className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}>
                
                {/* Text */}
                <motion.div 
                  initial={{ opacity: 0, x: idx % 2 === 1 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex-1 space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                      {section.icon}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">{section.title}</h3>
                  </div>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    {section.content}
                  </p>
                </motion.div>

                {/* Visual (Abstract Card) */}
                <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.6 }}
                   className="flex-1 w-full"
                >
                  <div className="relative h-64 bg-gradient-to-br from-[#0a162e] to-[#021333] border border-white/5 rounded-3xl p-8 flex items-center justify-center shadow-2xl overflow-hidden group">
                     {/* Background Pattern */}
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                     
                     {/* Floating Badge */}
                     <div className="relative z-10 flex flex-col items-center gap-3">
                        {section.id === 'indexing' && (
                           <div className="flex gap-4">
                              {[1,2,3].map(i => (
                                <motion.div 
                                  key={i}
                                  animate={{ y: [0, -10, 0] }}
                                  transition={{ delay: i * 0.2, duration: 2, repeat: Infinity }}
                                  className="w-12 h-16 bg-slate-700/50 rounded-md border border-slate-600"
                                />
                              ))}
                           </div>
                        )}
                        {section.id === 'authority' && (
                           <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                              <ShieldCheck className="w-12 h-12 text-green-400" />
                           </div>
                        )}
                        {section.id === 'people' && (
                           <div className="flex -space-x-4">
                              {[1,2,3,4].map(i => (
                                <div key={i} className="w-12 h-12 rounded-full bg-slate-600 border-4 border-[#0a162e]" />
                              ))}
                           </div>
                        )}
                     </div>
                  </div>
                </motion.div>

              </div>
            ))}
          </div>
        </section>

        {/* --- RESOURCES & SEARCH MARKETING --- */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-cyan-500/20 rounded-3xl p-10 md:p-12"
            >
              <div className="flex flex-col md:flex-row gap-12">
                <div className="flex-1 space-y-6">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Megaphone className="w-6 h-6 text-cyan-400" />
                    Industry Insights
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    The search industry focuses on the impact of social media on search engine optimization (SMO). While social signals (likes, shares) don't directly improve ranking in Google's algorithm, they increase traffic and visibility, which <strong>does</strong> correlate with higher rankings.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-slate-300 text-sm">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                      Direct correlation between SERP rank and social signals.
                    </li>
                    <li className="flex items-center gap-2 text-slate-300 text-sm">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                      Social media acts as a discovery engine for new content.
                    </li>
                  </ul>
                </div>
                
                <div className="flex-1 bg-white/5 rounded-2xl p-6 border border-white/5">
                  <h4 className="text-white font-bold mb-4 border-b border-white/10 pb-2">Resources</h4>
                  <ul className="space-y-4">
                     <li className="group cursor-pointer">
                        <span className="text-cyan-400 font-bold block text-sm group-hover:underline">Marketing Expo</span>
                        <span className="text-xs text-slate-500">Look for upcoming events and seminars.</span>
                     </li>
                     <li className="group cursor-pointer">
                        <span className="text-cyan-400 font-bold block text-sm group-hover:underline">Digital Marketing Depot</span>
                        <span className="text-xs text-slate-500">Access free on-demand SEM presentations.</span>
                     </li>
                     <li className="group cursor-pointer">
                        <span className="text-cyan-400 font-bold block text-sm group-hover:underline">News & Advice</span>
                        <span className="text-xs text-slate-500">Get the most recent search-promoting news.</span>
                     </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-500/20 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10" />
              
              <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Boost Your Search Results</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                 If you are engaging in online life promotion, you are increasing your possibilities of doing well in search results. Start optimizing today.
              </p>
              <button className="relative z-10 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
                <TrendingUp className="w-5 h-5" />
                Start Optimization
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default SocialMediaOptimization;