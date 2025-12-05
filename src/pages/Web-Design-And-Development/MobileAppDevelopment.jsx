import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { 
  Smartphone, 
  Code, 
  ShieldCheck, 
  Wrench, 
  Zap, 
  Layers, 
  Globe, 
  Cpu,
  MessageSquare,
  Music,
  Bell
} from 'lucide-react';

// ==========================================
// CONFIGURATION DATA
// ==========================================
const FEATURES = [
  {
    id: 1,
    title: "Secure & Reliable",
    description: "We create fully safe, reliable, and interactive iPhone apps that function flawlessly on all Apple-compatible devices, ensuring data protection and stability.",
    icon: <ShieldCheck className="w-6 h-6" />,
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    id: 2,
    title: "Top-Notch Infrastructure",
    description: "Our software solutions utilize top-notch infrastructure to offer clients premium services at affordable costs, balancing quality with budget.",
    icon: <Layers className="w-6 h-6" />,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    title: "Specialized iOS Developers",
    description: "A talented group of iOS developers proficient in Swift and Objective-C, dedicated to producing flawless solutions through nonstop diligent work.",
    icon: <Code className="w-6 h-6" />,
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    id: 4,
    title: "Maintenance & Support",
    description: "We make appealing offers for support packages, making it easier for clients to upgrade applications and providing the finest possible user experience.",
    icon: <Wrench className="w-6 h-6" />,
    gradient: "from-orange-500 to-red-500"
  }
];

// ==========================================
// COMPONENT: FLOATING UI ECOSYSTEM ANIMATION
// ==========================================
const FloatingUI = () => {
  // Generate random UI elements
  const elements = [
    { id: 1, type: 'chat', x: 10, y: 20, delay: 0, duration: 15 },
    { id: 2, type: 'music', x: 80, y: 15, delay: 2, duration: 18 },
    { id: 3, type: 'bell', x: 20, y: 80, delay: 4, duration: 20 },
    { id: 4, type: 'profile', x: 85, y: 70, delay: 1, duration: 16 },
    { id: 5, type: 'bar', x: 50, y: 50, delay: 3, duration: 22 },
    { id: 6, type: 'chat', x: 15, y: 50, delay: 5, duration: 19 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 blur-[100px] rounded-full" />

      {elements.map((el) => (
        <motion.div
          key={el.id}
          initial={{ y: 50, opacity: 0 }}
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.4, 0.8, 0.4],
            x: [0, 10, 0]
          }}
          transition={{
            duration: el.duration / 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: el.delay
          }}
          className="absolute"
          style={{ left: `${el.x}%`, top: `${el.y}%` }}
        >
          {/* UI Element Mockups */}
          <div className="bg-white/10 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-xl">
            {el.type === 'chat' && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-500/50 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <div className="space-y-1">
                  <div className="w-16 h-2 bg-white/20 rounded" />
                  <div className="w-10 h-2 bg-white/20 rounded" />
                </div>
              </div>
            )}
            {el.type === 'music' && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-pink-500/50 flex items-center justify-center">
                  <Music className="w-5 h-5 text-white" />
                </div>
                <div className="w-20 h-2 bg-white/30 rounded" />
              </div>
            )}
            {el.type === 'bell' && (
              <div className="relative">
                <Bell className="w-6 h-6 text-yellow-400" />
                <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              </div>
            )}
            {el.type === 'profile' && (
              <div className="flex flex-col items-center gap-2 w-20">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500" />
                <div className="w-full h-2 bg-white/20 rounded" />
              </div>
            )}
            {el.type === 'bar' && (
              <div className="flex items-end gap-1 h-10">
                <div className="w-2 h-6 bg-green-400/50 rounded-t" />
                <div className="w-2 h-10 bg-green-400/50 rounded-t" />
                <div className="w-2 h-4 bg-green-400/50 rounded-t" />
                <div className="w-2 h-8 bg-green-400/50 rounded-t" />
              </div>
            )}
          </div>
        </motion.div>
      ))}
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
      rgba(99, 102, 241, 0.15), 
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
      className="group relative h-full bg-[#0a162e]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-300"
    >
      {/* Spotlight Effect (Indigo Tint) */}
      <motion.div
        style={{ background: spotlight }}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />

      <div className="relative z-10 p-8 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <span className="text-white drop-shadow-md">{item.icon}</span>
          </div>
          <div className="bg-white/5 p-1.5 rounded-lg border border-white/10 group-hover:border-indigo-500/30 transition-colors">
            <Smartphone className="w-4 h-4 text-slate-400 group-hover:text-indigo-400" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
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
const MobileAppDevelopment = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#021333] text-slate-100 font-sans selection:bg-indigo-500/30 overflow-hidden">
      
      {/* --- BACKGROUND DESIGN --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Radial Dot Texture */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        
        {/* ANIMATION: Floating UI Ecosystem */}
        <FloatingUI />
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <Smartphone className="w-4 h-4" />
              <span>iOS & Android Solutions</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              Mobile App <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Development
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"
            >
              We are among the top iPhone app development firms in the world. We create fully safe, reliable, and interactive apps that function flawlessly on all compatible devices.
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
                    Flawless <span className="text-indigo-400">Execution</span>
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6" />
                </div>

                <div className="prose prose-invert text-slate-400 text-lg leading-relaxed space-y-6">
                  <p>
                    Our software solutions feature top-notch infrastructure that offers clients services at affordable costs. We have quickly risen to the top of the iOS development industry.
                  </p>
                  <p>
                    All credit goes to our diligent developers who work nonstop to produce flawless solutions. If you want to provide your clients with the finest possible experience, designing successful iOS applications is the key.
                  </p>
                  
                  <div className="flex gap-4 mt-4">
                    <div className="flex-1 p-4 rounded-xl bg-blue-900/10 border border-blue-500/20">
                      <div className="flex items-center gap-3 mb-2">
                        <Cpu className="w-5 h-5 text-blue-400" />
                        <h4 className="font-bold text-white text-sm">Tech Stack</h4>
                      </div>
                      <p className="text-xs text-slate-400">Swift, Objective-C, React Native.</p>
                    </div>
                    <div className="flex-1 p-4 rounded-xl bg-indigo-900/10 border border-indigo-500/20">
                      <div className="flex items-center gap-3 mb-2">
                        <Globe className="w-5 h-5 text-indigo-400" />
                        <h4 className="font-bold text-white text-sm">Global Reach</h4>
                      </div>
                      <p className="text-xs text-slate-400">Serving clients worldwide.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Visual Representation (Phone Mockup) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative h-full min-h-[450px] flex items-center justify-center"
              >
                {/* Phone Frame */}
                <div className="relative w-[280px] h-[550px] bg-[#0f172a] rounded-[3rem] border-8 border-[#1e293b] shadow-2xl overflow-hidden z-10">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1e293b] rounded-b-xl z-20" />
                  
                  {/* Screen Content */}
                  <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-blue-900 relative p-4 pt-12">
                    {/* App Header */}
                    <div className="flex justify-between items-center mb-6">
                      <div className="w-8 h-8 bg-white/20 rounded-full" />
                      <div className="w-20 h-2 bg-white/20 rounded" />
                    </div>

                    {/* App Cards */}
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          initial={{ x: 50, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ delay: i * 0.2 }}
                          className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/5"
                        >
                          <div className="h-20 bg-white/5 rounded-xl mb-3" />
                          <div className="h-2 w-2/3 bg-white/20 rounded mb-2" />
                          <div className="h-2 w-1/2 bg-white/20 rounded" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Floating Action Button */}
                    <div className="absolute bottom-6 right-6 w-14 h-14 bg-blue-500 rounded-full shadow-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Background Decor */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[600px] bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-[4rem] blur-xl -z-10" />
              </motion.div>

            </div>
          </div>
        </section>

        {/* --- FEATURES GRID --- */}
        <section className="py-20 px-6 bg-slate-900/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-indigo-400 font-bold text-sm tracking-wider uppercase mb-2 block">Why Choose Us</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">App Excellence</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((item, idx) => (
                <FeatureCard key={item.id} item={item} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/20 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10" />
              
              <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Build Your App Today</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                 Partner with a talented group of iOS developers who are proficient, diligent, and ready to turn your vision into a flawless reality.
              </p>
              <button className="relative z-10 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
                <Smartphone className="w-5 h-5" />
                Start Development
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default MobileAppDevelopment;