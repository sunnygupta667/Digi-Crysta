import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { 
  Layout, 
  Code, 
  Smartphone, 
  Image as ImageIcon, 
  Upload, 
  Search, 
  Link, 
  ShieldCheck, 
  PenTool, 
  Monitor,
  Settings,
  Layers,
  CheckCircle,
  Laptop
} from 'lucide-react';

// ==========================================
// CONFIGURATION DATA
// ==========================================
const FEATURES = [
  {
    id: 1,
    title: "Customized Design Layout",
    description: "Tailored layouts that reflect your unique brand identity, ensuring a distinct look and feel from competitors.",
    icon: <Layout className="w-6 h-6" />,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    title: "Responsive Mobile Version",
    description: "Receptive designs that adapt seamlessly to all screen sizes, from desktop monitors to smartphones (100% Mobile Responsive).",
    icon: <Smartphone className="w-6 h-6" />,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    title: "Search Engine Friendly",
    description: "Built with clean code and SEO best practices to ensure your site is easily indexed and ranked by search engines like Google.",
    icon: <Search className="w-6 h-6" />,
    gradient: "from-green-500 to-emerald-500"
  },
  {
    id: 4,
    title: "Logo Design & Integration",
    description: "We provide professional logo designing services or integrate your existing logo provided by customers seamlessly into the design.",
    icon: <PenTool className="w-6 h-6" />,
    gradient: "from-orange-500 to-red-500"
  },
  {
    id: 5,
    title: "Deployment & Support",
    description: "We handle the upload of websites to the URL and provide additional pages with free technical support to ensure smooth operation.",
    icon: <Upload className="w-6 h-6" />,
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    id: 6,
    title: "Plugin & Security Setup",
    description: "Comprehensive setup of essential plugins, including robust security plugins to protect your site and data.",
    icon: <ShieldCheck className="w-6 h-6" />,
    gradient: "from-red-500 to-rose-600"
  }
];

const ADDITIONAL_SERVICES = [
  "Html Inner pages",
  "Stock images covered",
  "Paper length equal to A4 Size",
  "Banner Animation",
  "100% guaranteed satisfaction",
  "Interlinking to social networking",
  "Modify or add photos",
  "Plug-in Setup"
];

// ==========================================
// COMPONENT: DIGITAL BLUEPRINT ANIMATION
// ==========================================
const BlueprintAnimation = () => {
  // Generate random "wireframe" blocks
  const blocks = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    width: Math.random() * 200 + 50,
    height: Math.random() * 100 + 20,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {/* Background Grid Lines */}
      <div 
        className="absolute inset-0" 
        style={{ 
          backgroundImage: 'linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} 
      />

      {blocks.map((block) => (
        <motion.div
          key={block.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0, 0.5, 0],
            scale: [0.8, 1, 0.8],
            x: [0, 20, 0]
          }}
          transition={{
            duration: block.duration,
            repeat: Infinity,
            ease: "linear",
            delay: block.delay
          }}
          className="absolute border border-blue-400/30 bg-blue-500/5 backdrop-blur-sm rounded-md"
          style={{ 
            left: `${block.x}%`, 
            top: `${block.y}%`,
            width: block.width,
            height: block.height
          }}
        >
          {/* Simulated content lines inside the block */}
          <div className="w-full h-full p-2 flex flex-col gap-2">
            <div className="w-3/4 h-1 bg-blue-400/20 rounded" />
            <div className="w-1/2 h-1 bg-blue-400/20 rounded" />
            {block.height > 60 && <div className="w-full h-1 bg-blue-400/10 rounded mt-auto" />}
          </div>
          
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-400" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-400" />
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
      {/* Spotlight Effect (Blue Tint) */}
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
            <Code className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
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
const WebDesigningDevelopment = () => {
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
        
        {/* Ambient Tech Lights */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full" />
        
        {/* ANIMATION: Digital Blueprint */}
        <BlueprintAnimation />
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
              <Monitor className="w-4 h-4" />
              <span>Innovative Development Firm</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              Website Design <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                & Development
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"
            >
              We are an innovative web design and development firm that supports top firms. Our packages are tailored to each individual's needs, ensuring a unique digital presence.
            </motion.p>
          </motion.div>
        </section>

        {/* --- INTRO & VISUAL SECTION --- */}
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
                    Essential <span className="text-blue-400">Components</span>
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6" />
                </div>

                <div className="prose prose-invert text-slate-400 text-lg leading-relaxed space-y-6">
                  <p>
                    A successful website is more than just good looks; it's about functionality, user experience, and robust architecture. We ensure every essential component of a website design package is meticulously crafted.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {ADDITIONAL_SERVICES.slice(0, 4).map((service, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        {service}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Visual Representation (Browser Window) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative h-full min-h-[400px] flex items-center justify-center"
              >
                <div className="relative w-full max-w-md bg-[#0f172a] rounded-xl shadow-2xl border border-slate-700 overflow-hidden group">
                  {/* Browser Header */}
                  <div className="bg-slate-800 p-3 flex items-center gap-2 border-b border-slate-700">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="flex-1 bg-slate-900 h-6 rounded mx-4" />
                  </div>

                  {/* Browser Body (Wireframe) */}
                  <div className="p-6 space-y-4 bg-slate-900 relative">
                    {/* Header Block */}
                    <div className="h-12 w-full bg-blue-900/20 rounded border border-blue-500/20 flex items-center justify-between px-4">
                       <div className="w-8 h-8 rounded-full bg-blue-500/40" />
                       <div className="flex gap-2">
                         <div className="w-12 h-2 bg-slate-700 rounded" />
                         <div className="w-12 h-2 bg-slate-700 rounded" />
                       </div>
                    </div>

                    {/* Hero Block */}
                    <div className="h-32 w-full bg-cyan-900/10 rounded border border-cyan-500/20 flex items-center justify-center">
                       <div className="text-center space-y-2">
                          <div className="h-4 w-32 bg-slate-700 rounded mx-auto" />
                          <div className="h-2 w-48 bg-slate-800 rounded mx-auto" />
                          <div className="h-8 w-24 bg-blue-600 rounded mt-4 mx-auto shadow-lg shadow-blue-500/20" />
                       </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-3 gap-3">
                       <div className="h-20 bg-slate-800 rounded border border-slate-700" />
                       <div className="h-20 bg-slate-800 rounded border border-slate-700" />
                       <div className="h-20 bg-slate-800 rounded border border-slate-700" />
                    </div>
                    
                    {/* Scanning Animation Line */}
                    <motion.div 
                      initial={{ top: 0 }}
                      animate={{ top: "100%" }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 w-full h-[2px] bg-blue-400 shadow-[0_0_10px_#3b82f6] opacity-50 z-10"
                    />
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-6 top-10 bg-blue-600 text-white p-3 rounded-lg shadow-xl"
                >
                  <Settings className="w-6 h-6" />
                </motion.div>

                <motion.div 
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-6 bottom-20 bg-cyan-600 text-white p-3 rounded-lg shadow-xl"
                >
                  <Layers className="w-6 h-6" />
                </motion.div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* --- FEATURES GRID --- */}
        <section className="py-20 px-6 bg-slate-900/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-blue-400 font-bold text-sm tracking-wider uppercase mb-2 block">Our Expertise</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Design & Development</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((item, idx) => (
                <FeatureCard key={item.id} item={item} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* --- ADDITIONAL SERVICES --- */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-5xl">
            <div className="bg-gradient-to-br from-[#0a162e] to-[#021333] border border-white/5 rounded-3xl p-10 md:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/5" />
              
              <h3 className="text-2xl font-bold text-white mb-8 text-center relative z-10">Complete Package Inclusions</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {ADDITIONAL_SERVICES.map((service, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-blue-500/30 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_5px_rgba(59,130,246,0.8)]" />
                    <span className="text-sm text-slate-300 font-medium">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-500/20 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10" />
              
              <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Build Your Digital Presence</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                 100% guaranteed satisfaction with customized design layouts, responsive mobile versions, and search engine friendly architecture.
              </p>
              <button className="relative z-10 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
                <Laptop className="w-5 h-5" />
                Start Your Project
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default WebDesigningDevelopment;