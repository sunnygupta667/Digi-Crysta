import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { 
  FileText, 
  Megaphone, 
  Layout, 
  Send, 
  Printer, 
  Layers, 
  PenTool, 
  Calendar,
  MousePointerClick,
  Sparkles
} from 'lucide-react';

// ==========================================
// CONFIGURATION DATA
// ==========================================
const FEATURES = [
  {
    id: 1,
    title: "Message Representation",
    description: "Flyers are among the most effective appeals for visual storytelling. We ensure your core message is represented clearly and persuasively to draw immediate attention.",
    icon: <Megaphone className="w-6 h-6" />,
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    id: 2,
    title: "Product Marketing",
    description: "The layout of our brochures draws customers in, ensuring that deals on goods and services are successfully marketed with high-impact visuals.",
    icon: <Layout className="w-6 h-6" />,
    gradient: "from-pink-500 to-rose-500"
  },
  {
    id: 3,
    title: "Event Advertising",
    description: "Our professional flyer design services help you advertise your company for any occasion you require, from grand openings to exclusive galas.",
    icon: <Calendar className="w-6 h-6" />,
    gradient: "from-yellow-400 to-orange-500"
  },
  {
    id: 4,
    title: "Launch Announcements",
    description: "Invite people to a website launch or announce a change in management. We design fresh offers that excite your audience about what's new.",
    icon: <Send className="w-6 h-6" />,
    gradient: "from-purple-500 to-indigo-500"
  }
];

// ==========================================
// COMPONENT: FLOATING PAPER STORM ANIMATION
// ==========================================
const FloatingFlyers = () => {
  // Generate random "flyers"
  const flyers = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100, // percentage
    scale: Math.random() * 0.5 + 0.5,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
    rotation: Math.random() * 360,
    color: i % 3 === 0 ? 'bg-cyan-500' : i % 3 === 1 ? 'bg-pink-500' : 'bg-yellow-400' // CMY Colors
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none perspective-1000">
      {flyers.map((flyer) => (
        <motion.div
          key={flyer.id}
          initial={{ y: "110vh", opacity: 0, rotateX: 0, rotateY: 0, rotateZ: flyer.rotation }}
          animate={{ 
            y: "-20vh", 
            opacity: [0, 0.6, 0],
            rotateX: [0, 180, 360],
            rotateY: [0, 180, 360],
            rotateZ: [flyer.rotation, flyer.rotation + 180]
          }}
          transition={{
            duration: flyer.duration,
            repeat: Infinity,
            ease: "linear",
            delay: flyer.delay
          }}
          className={`absolute w-24 h-32 md:w-32 md:h-44 ${flyer.color} bg-opacity-10 backdrop-blur-sm border border-white/10 rounded-sm shadow-xl`}
          style={{ left: `${flyer.x}%`, scale: flyer.scale }}
        >
          {/* Simulated Text Lines on Flyer */}
          <div className="p-4 flex flex-col gap-2 opacity-50">
            <div className="w-3/4 h-2 bg-white/40 rounded" />
            <div className="w-full h-1 bg-white/20 rounded" />
            <div className="w-full h-1 bg-white/20 rounded" />
            <div className="w-1/2 h-1 bg-white/20 rounded" />
            <div className="mt-4 w-full h-12 bg-white/10 rounded" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ==========================================
// COMPONENT: INTERACTIVE FEATURE CARD
// ==========================================
const DesignCard = ({ item, index }) => {
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
      {/* Spotlight Effect (Cyan Tint) */}
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
            <Layers className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
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
const FlyerDesign = () => {
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
        
        {/* Ambient Print Lights (CMYK feel) */}
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-pink-900/10 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-900/5 blur-[150px] rounded-full" />
        
        {/* ANIMATION: Floating Paper Storm */}
        <FloatingFlyers />
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
              <FileText className="w-4 h-4" />
              <span>Effective Visual Marketing</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              Flyer <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400">
                Design Services
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"
            >
              Marketing has been the primary focus for a long time. The layout of our brochures draws customers in, ensuring that your message is successfully represented.
            </motion.p>
          </motion.div>
        </section>

        {/* --- INTRO & STRATEGY --- */}
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
                    Visual Appeal & <span className="text-cyan-400">Impact</span>
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full mb-6" />
                </div>

                <div className="prose prose-invert text-slate-400 text-lg leading-relaxed space-y-6">
                  <p>
                    In the interim of digital noise, you can use a variety of marketing techniques, but print remains one of the most effective appeals for message representation.
                  </p>
                  <p>
                    Our professional flyer design services help you advertise your company for the occasion you require. Whether it's a website launch or a change in management, the brochure will announce fresh offers clearly and creatively.
                  </p>
                  
                  <div className="flex gap-4 mt-4">
                    <div className="flex-1 p-4 rounded-xl bg-cyan-900/10 border border-cyan-500/20">
                      <div className="flex items-center gap-3 mb-2">
                        <Printer className="w-5 h-5 text-cyan-400" />
                        <h4 className="font-bold text-white text-sm">Print Ready</h4>
                      </div>
                      <p className="text-xs text-slate-400">High-resolution outputs.</p>
                    </div>
                    <div className="flex-1 p-4 rounded-xl bg-pink-900/10 border border-pink-500/20">
                      <div className="flex items-center gap-3 mb-2">
                        <PenTool className="w-5 h-5 text-pink-400" />
                        <h4 className="font-bold text-white text-sm">Custom Art</h4>
                      </div>
                      <p className="text-xs text-slate-400">Tailored to your brand.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Visual Representation (Flyer Mockup) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative h-full min-h-[450px] flex items-center justify-center"
              >
                {/* 3D Tilted Flyer Stack */}
                <div className="relative w-[300px] h-[420px] perspective-1000">
                   {/* Shadow Flyer */}
                   <div className="absolute top-4 left-4 w-full h-full bg-[#0a162e] rounded-xl border border-white/5 opacity-50 transform rotate-6 translate-z-[-20px]" />
                   
                   {/* Main Flyer */}
                   <motion.div 
                     animate={{ rotateY: [0, 5, 0], rotateX: [0, 5, 0] }}
                     transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute inset-0 bg-gradient-to-br from-white to-slate-200 rounded-xl shadow-2xl overflow-hidden transform rotate-[-3deg]"
                   >
                      {/* Flyer Content Mockup */}
                      <div className="h-1/2 bg-cyan-500 relative overflow-hidden">
                         <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600 to-blue-400" />
                         {/* Abstract Shapes */}
                         <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply opacity-50" />
                         <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-400 rounded-full mix-blend-multiply opacity-50" />
                         
                         <div className="absolute inset-0 flex items-center justify-center">
                            <h3 className="text-4xl font-black text-white tracking-tighter uppercase italic transform -rotate-6">Grand<br/>Opening</h3>
                         </div>
                      </div>
                      <div className="h-1/2 p-6 bg-white">
                         <div className="h-4 w-3/4 bg-slate-800 rounded mb-2" />
                         <div className="h-2 w-full bg-slate-300 rounded mb-1" />
                         <div className="h-2 w-full bg-slate-300 rounded mb-1" />
                         <div className="h-2 w-2/3 bg-slate-300 rounded mb-6" />
                         
                         <div className="flex justify-between items-end">
                            <div>
                               <div className="h-2 w-20 bg-slate-400 rounded mb-1" />
                               <div className="h-2 w-16 bg-slate-400 rounded" />
                            </div>
                            <div className="w-12 h-12 bg-black rounded-lg" /> {/* QR Code */}
                         </div>
                      </div>
                   </motion.div>

                   {/* Floating Sparkles */}
                   <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-6 -right-6 text-yellow-400"
                   >
                      <Sparkles className="w-8 h-8 fill-current" />
                   </motion.div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* --- FEATURES GRID --- */}
        <section className="py-20 px-6 bg-slate-900/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-cyan-400 font-bold text-sm tracking-wider uppercase mb-2 block">Our Services</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Design Solutions</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((item, idx) => (
                <DesignCard key={item.id} item={item} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="bg-gradient-to-r from-cyan-900/40 to-pink-900/40 border border-cyan-500/20 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-pink-500/10" />
              
              <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Ready to Make an Impact?</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                 If you want to invite people to a launch or announce a fresh offer, let our designs do the talking.
              </p>
              <button className="relative z-10 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
                <MousePointerClick className="w-5 h-5" />
                Start Your Design
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default FlyerDesign;