import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { 
  Youtube, 
  Play, 
  Video, 
  Target, 
  TrendingUp, 
  Megaphone,
  Settings,
  MonitorPlay
} from 'lucide-react';

// ==========================================
// HELPER COMPONENTS
// ==========================================
// Moved up to ensure it is defined before usage in BENEFITS
const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
);

// ==========================================
// CONFIGURATION DATA
// ==========================================
const BENEFITS = [
  {
    id: 1,
    title: "Increase Business Reach",
    description: "With billions of users worldwide, YouTube allows you to undoubtedly reach a massive, diverse range of consumers across the globe.",
    icon: <GlobeIcon />,
    gradient: "from-red-500 to-orange-500"
  },
  {
    id: 2,
    title: "Target Audience",
    description: "Pinpoint your ideal customers based on interests, demographics, and viewing habits to ensure your video ads are seen by the right people.",
    icon: <Target className="w-6 h-6" />,
    gradient: "from-red-600 to-rose-600"
  },
  {
    id: 3,
    title: "Increase Branding",
    description: "Video is the most powerful medium for storytelling. Build a strong brand identity and emotional connection through compelling visual content.",
    icon: <Megaphone className="w-6 h-6" />,
    gradient: "from-orange-500 to-red-500"
  },
  {
    id: 4,
    title: "Video Optimization",
    description: "Enhance your visibility. We optimize your content to rank higher in search results, driving organic traffic alongside paid campaigns.",
    icon: <Settings className="w-6 h-6" />,
    gradient: "from-rose-500 to-pink-600"
  }
];

const SERVICES = [
  "Optimization of videos",
  "Reporting & Analytics",
  "Keyword Title Research",
  "Great Video Content",
  "Campaign Optimization",
  "Target User Acquisition",
  "SEO Marketing for YouTube",
  "Channel Customization"
];

// ==========================================
// COMPONENT: CINEMATIC STREAM ANIMATION
// ==========================================
const CinematicStream = () => {
  // Generate floating elements (Play buttons, Frames)
  const elements = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    scale: Math.random() * 0.5 + 0.5,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
    type: Math.random() > 0.5 ? 'play' : 'frame'
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Background Gradient Pulse */}
      <motion.div 
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/10 blur-[150px] rounded-full"
      />

      {/* Floating Elements */}
      {elements.map((el) => (
        <motion.div
          key={el.id}
          initial={{ y: "110vh", opacity: 0, rotate: 0 }}
          animate={{ 
            y: "-10vh", 
            opacity: [0, 0.4, 0],
            rotate: [0, 45, 0]
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            ease: "linear",
            delay: el.delay
          }}
          className="absolute text-red-500/20"
          style={{ left: `${el.x}%`, scale: el.scale }}
        >
          {el.type === 'play' ? (
            <div className="w-16 h-16 rounded-full border-4 border-current flex items-center justify-center">
              <Play className="w-8 h-8 fill-current ml-1" />
            </div>
          ) : (
            <div className="w-20 h-14 border-4 border-current rounded-lg flex items-center justify-center">
              <div className="w-2 h-2 bg-current rounded-full mx-1" />
              <div className="w-2 h-2 bg-current rounded-full mx-1" />
              <div className="w-2 h-2 bg-current rounded-full mx-1" />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

// ==========================================
// COMPONENT: INTERACTIVE BENEFIT CARD
// ==========================================
const BenefitCard = ({ item, index }) => {
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
      rgba(220, 38, 38, 0.15), 
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
      className="group relative h-full bg-[#0a162e]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-red-500/30 transition-all duration-300"
    >
      {/* Spotlight Effect (Red Tint) */}
      <motion.div
        style={{ background: spotlight }}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />

      <div className="relative z-10 p-8 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <span className="text-white drop-shadow-md">{item.icon}</span>
          </div>
          <div className="bg-white/5 p-1.5 rounded-lg border border-white/10 group-hover:border-red-500/30 transition-colors">
            <Video className="w-4 h-4 text-slate-400 group-hover:text-red-400" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-300 transition-colors">
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
const YoutubePaidMarketing = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#021333] text-slate-100 font-sans selection:bg-red-500/30 overflow-hidden">
      
      {/* --- BACKGROUND DESIGN --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Radial Dot Texture */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        
        {/* Ambient YouTube Lights */}
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-red-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-orange-900/10 blur-[120px] rounded-full" />
        
        {/* ANIMATION: Cinematic Stream */}
        <CinematicStream />
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <Youtube className="w-4 h-4 fill-current" />
              <span>World's Largest Video Platform</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              YouTube <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                Paid Marketing
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"
            >
              With billions of users worldwide, YouTube is one of the most popular online platforms. Reach a wide range of consumers and increase branding with targeted video campaigns.
            </motion.p>
          </motion.div>
        </section>

        {/* --- BENEFITS GRID --- */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-red-400 font-bold text-sm tracking-wider uppercase mb-2 block">Why YouTube?</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Marketing Benefits</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {BENEFITS.map((item, idx) => (
                <BenefitCard key={item.id} item={item} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* --- LEAD GEN & SERVICES --- */}
        <section className="py-20 px-6 bg-slate-900/30">
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
                    Generate More <span className="text-red-500">Leads</span>
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-red-600 to-orange-500 rounded-full mb-6" />
                </div>

                <div className="prose prose-invert text-slate-400 text-lg leading-relaxed space-y-6">
                  <p>
                    Do you still want to generate more leads through YouTube Marketing? Our extensive network includes specialists who work with startups and established brands alike.
                  </p>
                  <p>
                    Our trending services combine meticulous research with effective planning to capitalize on the hottest video trends. There is a strong network to facilitate channel growth thanks to a group of dedicated video specialists.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {SERVICES.map((service, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                        {service}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Visual Representation (Video Player Mockup) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative h-full min-h-[400px] flex items-center justify-center"
              >
                <div className="relative w-full max-w-md aspect-video bg-black rounded-2xl border border-slate-800 shadow-2xl overflow-hidden group">
                  {/* Video Screen */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                        <Play className="w-8 h-8 text-white fill-current ml-1" />
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-700">
                      <div className="h-full w-2/3 bg-red-600 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full shadow-md" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Analytics */}
                  <motion.div 
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -right-6 -bottom-6 bg-[#0f172a] p-4 rounded-xl border border-white/10 shadow-xl"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      <span className="text-white font-bold text-sm">Views Spiking</span>
                    </div>
                    <div className="w-32 h-10 flex items-end gap-1">
                      {[40, 60, 45, 70, 50, 80, 90].map((h, i) => (
                        <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-red-500/50 rounded-t-sm" />
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="bg-gradient-to-r from-red-900/40 to-orange-900/40 border border-red-500/20 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10" />
              
              <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Start Your Video Journey</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                 Capitalize on the hottest trends and extensive reach of YouTube. Let our experts optimize your channel for maximum impact.
              </p>
              <button className="relative z-10 px-8 py-4 bg-[#FF0000] hover:bg-[#cc0000] text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
                <MonitorPlay className="w-5 h-5" />
                Launch Campaign
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default YoutubePaidMarketing;