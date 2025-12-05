import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { 
  BookOpen, 
  LayoutTemplate, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  Eye, 
  FileText, 
  Printer, 
  Zap,
  PenTool
} from 'lucide-react';

// ==========================================
// CONFIGURATION DATA
// ==========================================
const FEATURES = [
  {
    id: 1,
    title: "Consumer Education",
    description: "The primary goal is to educate consumers about your goods and services. Brochures provide a tangible way to convey complex information clearly.",
    icon: <BookOpen className="w-6 h-6" />,
    gradient: "from-teal-500 to-emerald-500"
  },
  {
    id: 2,
    title: "Cost-Effective",
    description: "Reputation for efficient and reasonably priced marketing. We offer digital and print-ready formats that maximize your budget.",
    icon: <DollarSign className="w-6 h-6" />,
    gradient: "from-green-500 to-teal-600"
  },
  {
    id: 3,
    title: "Firm Integrity",
    description: "Our expertise in consulting brochure design ensures your firm projects integrity, professionalism, and reliability to potential clients.",
    icon: <ShieldCheck className="w-6 h-6" />,
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    id: 4,
    title: "Fast Turnaround",
    description: "This fantastic design service offers short turnaround times for consistently higher job accuracy, meeting your deadlines without compromising quality.",
    icon: <Clock className="w-6 h-6" />,
    gradient: "from-indigo-500 to-purple-500"
  }
];

// ==========================================
// COMPONENT: FOLDING PERSPECTIVE ANIMATION
// ==========================================
const FoldingPanels = () => {
  // Generate panels
  const panels = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    width: Math.random() * 60 + 100,
    height: Math.random() * 100 + 150,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none perspective-[1000px]">
      {panels.map((panel) => (
        <motion.div
          key={panel.id}
          initial={{ 
            opacity: 0, 
            rotateY: 0,
            z: -100
          }}
          animate={{ 
            opacity: [0, 0.4, 0],
            rotateY: [0, 180, 0], // Folding motion
            y: [-50, 50, -50], // Gentle floating
            z: [-100, 0, -100]
          }}
          transition={{
            duration: panel.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: panel.delay
          }}
          style={{ 
            left: `${panel.x}%`, 
            top: `${panel.y}%`,
            width: panel.width,
            height: panel.height,
            transformStyle: "preserve-3d"
          }}
          className="absolute"
        >
          {/* Front Face */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-indigo-500/10 border border-teal-500/20 backdrop-blur-sm rounded-lg" />
          
          {/* Fold Line Highlight */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/10" />
        </motion.div>
      ))}
    </div>
  );
};

// ==========================================
// COMPONENT: INTERACTIVE FEATURE CARD
// ==========================================
const ServiceCard = ({ item, index }) => {
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
      rgba(20, 184, 166, 0.15), 
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
      className="group relative h-full bg-[#0a162e]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-teal-500/30 transition-all duration-300"
    >
      {/* Spotlight Effect (Teal Tint) */}
      <motion.div
        style={{ background: spotlight }}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />

      <div className="relative z-10 p-8 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <span className="text-white drop-shadow-md">{item.icon}</span>
          </div>
          <div className="bg-white/5 p-1.5 rounded-lg border border-white/10 group-hover:border-teal-500/30 transition-colors">
            <LayoutTemplate className="w-4 h-4 text-slate-400 group-hover:text-teal-400" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-300 transition-colors">
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
const BrochureDesigning = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#021333] text-slate-100 font-sans selection:bg-teal-500/30 overflow-hidden">
      
      {/* --- BACKGROUND DESIGN --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Radial Dot Texture */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        
        {/* Ambient Professional Lights */}
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-teal-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-indigo-900/10 blur-[120px] rounded-full" />
        
        {/* ANIMATION: Folding Panels */}
        <FoldingPanels />
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span>Small-Scale Marketing Strategy</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              Brochure <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-500">
                Designing
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"
            >
              The primary goal of this strategy is to educate consumers. Our brochures grab attention with brief, impactful information and consistently high job accuracy.
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
                    Grab <span className="text-teal-400">Attention</span>
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full mb-6" />
                </div>

                <div className="prose prose-invert text-slate-400 text-lg leading-relaxed space-y-6">
                  <p>
                    Brochure designing is a small-scale marketing strategy with a primary goal: to educate consumers about goods and services. It has a longstanding reputation for being an efficient and reasonably priced marketing tool.
                  </p>
                  <p>
                    The brief information in our pamphlets is ideal for grabbing consumers' attention quickly. Our brochures can be found online, where one can look for the most affordable prices, ensuring your message reaches the widest audience possible.
                  </p>
                  
                  <div className="flex gap-4 mt-4">
                    <div className="flex-1 p-4 rounded-xl bg-teal-900/10 border border-teal-500/20">
                      <div className="flex items-center gap-3 mb-2">
                        <Eye className="w-5 h-5 text-teal-400" />
                        <h4 className="font-bold text-white text-sm">Visuals</h4>
                      </div>
                      <p className="text-xs text-slate-400">Eye-catching layouts.</p>
                    </div>
                    <div className="flex-1 p-4 rounded-xl bg-indigo-900/10 border border-indigo-500/20">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="w-5 h-5 text-indigo-400" />
                        <h4 className="font-bold text-white text-sm">Content</h4>
                      </div>
                      <p className="text-xs text-slate-400">Concise messaging.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Visual Representation (Tri-Fold Brochure Mockup) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative h-full min-h-[450px] flex items-center justify-center perspective-[1000px]"
              >
                {/* 3D Folding Brochure */}
                <div className="relative w-[300px] h-[400px] transform-style-3d group">
                   {/* Back/Center Panel */}
                   <div className="absolute inset-0 bg-white rounded-r-lg shadow-xl overflow-hidden border-r border-slate-300">
                      <div className="h-full w-full bg-slate-50 p-6 flex flex-col">
                         <div className="h-32 bg-teal-500/20 rounded-lg mb-4 w-full" />
                         <div className="h-2 w-full bg-slate-300 rounded mb-2" />
                         <div className="h-2 w-full bg-slate-300 rounded mb-2" />
                         <div className="h-2 w-2/3 bg-slate-300 rounded" />
                      </div>
                   </div>

                   {/* Left Panel (Folded) */}
                   <motion.div 
                     animate={{ rotateY: [-20, -45, -20] }}
                     transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute top-0 left-0 w-full h-full bg-slate-100 rounded-l-lg shadow-2xl origin-left transform-style-3d border-l border-slate-300"
                     style={{ width: '98%', left: '1%' }} // Slight inset to prevent z-fighting
                   >
                      <div className="h-full w-full p-6 flex flex-col justify-between bg-white">
                         <div>
                           <div className="w-12 h-12 bg-teal-500 rounded-full mb-6" />
                           <h3 className="text-2xl font-bold text-slate-800 mb-2">Modern<br/>Design</h3>
                           <div className="h-1 w-10 bg-teal-500" />
                         </div>
                         <div className="space-y-2">
                            <div className="h-2 w-full bg-slate-200 rounded" />
                            <div className="h-2 w-3/4 bg-slate-200 rounded" />
                         </div>
                      </div>
                      
                      {/* Shadow Overlay for depth */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
                   </motion.div>
                </div>

                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [-15, 15, -15] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-8 top-20 bg-teal-600 text-white p-3 rounded-lg shadow-xl"
                >
                  <Printer className="w-6 h-6" />
                </motion.div>

                <motion.div 
                  animate={{ y: [15, -15, 15] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-8 bottom-32 bg-indigo-600 text-white p-3 rounded-lg shadow-xl"
                >
                  <Zap className="w-6 h-6" />
                </motion.div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* --- FEATURES GRID --- */}
        <section className="py-20 px-6 bg-slate-900/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-teal-400 font-bold text-sm tracking-wider uppercase mb-2 block">Our Services</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Why Choose Us?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((item, idx) => (
                <ServiceCard key={item.id} item={item} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="bg-gradient-to-r from-teal-900/40 to-indigo-900/40 border border-teal-500/20 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-indigo-500/10" />
              
              <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Start Your Project</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                 Our brochure design services ensure your firm has integrity. Look for the most affordable prices and get high-quality results.
              </p>
              <button className="relative z-10 px-8 py-4 bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
                <PenTool className="w-5 h-5" />
                Design Now
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default BrochureDesigning;