import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { 
  Pin, 
  Image as ImageIcon, 
  Search, 
  UserCircle, 
  Settings, 
  Hash, 
  TrendingUp,
  LayoutGrid,
  Heart
} from 'lucide-react';

// ==========================================
// CONFIGURATION DATA
// ==========================================
const PROCESS_STEPS = [
  {
    id: 1,
    title: "Profile Creation",
    description: "Expert setup of your business account to ensure a professional foundation for your visual marketing strategy.",
    icon: <UserCircle className="w-6 h-6" />,
    gradient: "from-red-500 to-rose-600"
  },
  {
    id: 2,
    title: "Visual Optimization",
    description: "Utilize and add relevant, high-quality images in your profile and pins to capture attention immediately.",
    icon: <ImageIcon className="w-6 h-6" />,
    gradient: "from-rose-500 to-pink-600"
  },
  {
    id: 3,
    title: "SEO-Friendly Username",
    description: "Obtain a simple, searchable profile name that aligns with your brand and makes you easy to find.",
    icon: <Search className="w-6 h-6" />,
    gradient: "from-pink-500 to-purple-600"
  },
  {
    id: 4,
    title: "Keyword Integration",
    description: "Combine strategic keywords into profile descriptions and boards to maximize discoverability in search results.",
    icon: <Hash className="w-6 h-6" />,
    gradient: "from-purple-500 to-indigo-600"
  },
  {
    id: 5,
    title: "Profile Customization",
    description: "Most excellent business profile customization, including rich pins, board covers, and featured collections.",
    icon: <Settings className="w-6 h-6" />,
    gradient: "from-red-600 to-orange-600"
  }
];

// ==========================================
// COMPONENT: FLOATING MASONRY ANIMATION
// ==========================================
const FloatingMasonry = () => {
  // Generate random cards with different heights to mimic masonry
  const cards = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    height: Math.random() > 0.5 ? 120 : 180, // Mix of tall and short
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 15 + 15
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      {cards.map((card) => (
        <motion.div
          key={card.id}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{ 
            y: "-20vh", 
            opacity: [0, 0.8, 0] 
          }}
          transition={{
            duration: card.duration,
            repeat: Infinity,
            ease: "linear",
            delay: card.delay
          }}
          style={{ 
            left: `${card.x}%`,
            height: `${card.height}px` 
          }}
          className="absolute w-24 md:w-32 bg-gradient-to-b from-red-500 to-transparent rounded-xl border border-red-500/30 backdrop-blur-sm"
        />
      ))}
    </div>
  );
};

// ==========================================
// COMPONENT: INTERACTIVE CARD
// ==========================================
const ServiceCard = ({ step, index }) => {
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
      rgba(225, 29, 72, 0.1), 
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
          <div className={`p-3 rounded-xl bg-gradient-to-br ${step.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <span className="text-white drop-shadow-md">{step.icon}</span>
          </div>
          <div className="bg-white/5 p-1.5 rounded-lg border border-white/10 group-hover:border-red-500/30 transition-colors">
            <span className="text-xs font-bold text-slate-400 group-hover:text-red-400">Step 0{index + 1}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-300 transition-colors">
          {step.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed flex-grow">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
};

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
const PinterestMarketing = () => {
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
        
        {/* Ambient Chic Lights (Red/Rose for Pinterest Brand) */}
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-red-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-rose-900/10 blur-[120px] rounded-full" />
        
        {/* ANIMATION: Floating Masonry */}
        <FloatingMasonry />
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
              <LayoutGrid className="w-4 h-4" />
              <span>Chic Photo-Sharing Platform</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              Pinterest <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">
                Marketing
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"
            >
              Millions of people conduct business by creating accounts instantaneously. Leverage one of the greatest locations on social media for visual discovery.
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
                    The Strategic <span className="text-red-500">Visual Engine</span>
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-red-600 to-rose-500 rounded-full mb-6" />
                </div>

                <div className="prose prose-invert text-slate-400 text-lg leading-relaxed space-y-6">
                  <p>
                    Because it is one of those chic photo-sharing websites where millions of people conduct business by creating accounts instantaneously, it has now emerged as one of the greatest locations on social media.
                  </p>
                  <p>
                    If necessary, you can use this marketing to fully utilize Pinterest's strategic, experience-backed potential. The team to assist the campaign has a great deal of experience with Pinterest marketing.
                  </p>
                  
                  <div className="flex gap-4 mt-4">
                    <div className="flex-1 p-4 rounded-xl bg-red-900/10 border border-red-500/20">
                      <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-5 h-5 text-red-400" />
                        <h4 className="font-bold text-white text-sm">High Intent</h4>
                      </div>
                      <p className="text-xs text-slate-400">Users are actively looking for purchase inspiration.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Visual Representation (Pinterest Card) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative h-full min-h-[400px] flex items-center justify-center"
              >
                {/* The "Pin" Card */}
                <div className="relative w-[280px] bg-white rounded-3xl shadow-2xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  {/* Image Area */}
                  <div className="h-64 bg-slate-200 relative overflow-hidden group">
                     {/* Placeholder Image Gradient */}
                     <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-orange-300" />
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                        <div className="px-4 py-2 bg-red-600 text-white font-bold rounded-full text-sm">Save</div>
                     </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-5">
                    <div className="h-4 w-3/4 bg-slate-800 rounded mb-2" />
                    <div className="h-3 w-1/2 bg-slate-400 rounded mb-4" />
                    
                    <div className="flex items-center justify-between mt-4">
                       <div className="flex items-center gap-2">
                         <div className="w-8 h-8 rounded-full bg-slate-200" />
                         <div className="h-3 w-16 bg-slate-300 rounded" />
                       </div>
                       <Heart className="w-5 h-5 text-slate-400" />
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [-15, 15, -15] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-4 top-20 bg-red-600 text-white p-3 rounded-full shadow-xl"
                >
                  <Pin className="w-6 h-6 fill-current" />
                </motion.div>

                <motion.div 
                  animate={{ y: [15, -15, 15] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-4 bottom-20 bg-white text-red-600 p-3 rounded-full shadow-xl"
                >
                  <Search className="w-6 h-6" />
                </motion.div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* --- PROCESS GRID --- */}
        <section className="py-20 px-6 bg-slate-900/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-red-400 font-bold text-sm tracking-wider uppercase mb-2 block">Our Process</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Service Workflow</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROCESS_STEPS.map((step, idx) => (
                <ServiceCard key={step.id} step={step} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="bg-gradient-to-r from-red-900/40 to-rose-900/40 border border-red-500/20 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10" />
              
              <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Ignite Your Visual Strategy</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                 Tap into the power of visual search. Let our experienced team customize the perfect business profile for you.
              </p>
              <button className="relative z-10 px-8 py-4 bg-[#E60023] hover:bg-[#ad081b] text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
                <LayoutGrid className="w-5 h-5" />
                Start Pinning Today
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default PinterestMarketing;