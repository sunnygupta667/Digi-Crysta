import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { 
  Mail, 
  Send, 
  Users, 
  PieChart, 
  BarChart, 
  Zap, 
  MousePointer2, 
  CheckCircle,
  Inbox
} from 'lucide-react';

// ==========================================
// CONFIGURATION DATA
// ==========================================
const GUIDE_SECTIONS = [
  {
    id: 1,
    title: "Getting Started",
    description: "Lay the foundation for success. We help you set up the technical infrastructure, choose the right platform, and define your core messaging strategy.",
    icon: <Zap className="w-6 h-6" />,
    gradient: "from-yellow-400 to-orange-500"
  },
  {
    id: 2,
    title: "Expand Email List",
    description: "Implement high-converting lead magnets and opt-in forms. Grow a robust list of targeted customers who are genuinely interested in your brand.",
    icon: <Users className="w-6 h-6" />,
    gradient: "from-green-400 to-emerald-600"
  },
  {
    id: 3,
    title: "List Segmentation",
    description: "Don't blast the same message to everyone. Divide your audience based on behavior and demographics to deliver hyper-relevant content.",
    icon: <PieChart className="w-6 h-6" />,
    gradient: "from-blue-400 to-indigo-600"
  },
  {
    id: 4,
    title: "Maximize Open Rates",
    description: "Craft compelling subject lines and optimize send times. Ensure your emails land in the inbox and get opened, not ignored.",
    icon: <MousePointer2 className="w-6 h-6" />,
    gradient: "from-purple-400 to-pink-600"
  },
  {
    id: 5,
    title: "Email Automation",
    description: "Set up drip campaigns and automated workflows that nurture leads while you sleep, driving consistent engagement and sales.",
    icon: <Send className="w-6 h-6" />,
    gradient: "from-red-400 to-rose-600"
  }
];

// ==========================================
// COMPONENT: FLOATING MESSAGE STREAM ANIMATION
// ==========================================
const MessageStream = () => {
  // Generate floating envelopes
  const items = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100, // percentage
    scale: Math.random() * 0.5 + 0.5,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 10,
    type: Math.random() > 0.6 ? 'mail' : 'dot'
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{ 
            y: "-10vh", 
            opacity: [0, 0.8, 0] 
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "linear",
            delay: item.delay
          }}
          className="absolute text-blue-400"
          style={{ left: `${item.x}%`, scale: item.scale }}
        >
          {item.type === 'mail' ? (
            <Mail className="w-12 h-12 stroke-1" />
          ) : (
            <div className="w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

// ==========================================
// COMPONENT: INTERACTIVE GUIDE CARD
// ==========================================
const GuideCard = ({ item, index }) => {
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
      rgba(250, 204, 21, 0.1), 
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
      className="group relative h-full bg-[#0a162e]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-yellow-500/30 transition-all duration-300"
    >
      {/* Spotlight Effect (Yellow/Warm Tint) */}
      <motion.div
        style={{ background: spotlight }}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />

      <div className="relative z-10 p-8 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <span className="text-white drop-shadow-md">{item.icon}</span>
          </div>
          <div className="bg-white/5 p-1.5 rounded-lg border border-white/10 group-hover:border-yellow-500/30 transition-colors">
            <span className="text-xs font-bold text-slate-400 group-hover:text-yellow-400">Step 0{index + 1}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-200 transition-colors">
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
const EmailMarketing = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#021333] text-slate-100 font-sans selection:bg-yellow-500/30 overflow-hidden">
      
      {/* --- BACKGROUND DESIGN --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Radial Dot Texture */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        
        {/* Ambient Lights (Warm/Yellow for Action/Conversion) */}
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-yellow-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-orange-900/10 blur-[120px] rounded-full" />
        
        {/* ANIMATION: Floating Message Stream */}
        <MessageStream />
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <Inbox className="w-4 h-4" />
              <span>Direct to Consumer Strategy</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              Email <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Marketing
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"
            >
              Sending emails with the intention of turning prospects into customers is one of the most effective digital marketing techniques. Increase purchases and convert leads into loyal fans.
            </motion.p>
          </motion.div>
        </section>

        {/* --- STRATEGY OVERVIEW --- */}
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
                    Turning Prospects into <span className="text-yellow-400">Customers</span>
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full mb-6" />
                </div>

                <div className="prose prose-invert text-slate-400 text-lg leading-relaxed space-y-6">
                  <p>
                    Email marketing increases one-time purchases and converts leads into a strategic phenomenon. This process allows you to set up email marketing specifically to generate sales and foster long-term relationships.
                  </p>
                  <p>
                    Additionally, it remains among the most effective targeted marketing techniques for business development. You are prepared to commit to an email marketing strategy that actually delivers results.
                  </p>
                  
                  <div className="flex gap-4 mt-4">
                    <div className="flex-1 p-4 rounded-xl bg-yellow-900/10 border border-yellow-500/20">
                      <div className="flex items-center gap-3 mb-2">
                        <BarChart className="w-5 h-5 text-yellow-400" />
                        <h4 className="font-bold text-white text-sm">High ROI</h4>
                      </div>
                      <p className="text-xs text-slate-400">Consistently outperforms other marketing channels.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Visual Representation (Email Card Stack) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative h-full min-h-[400px] flex items-center justify-center"
              >
                {/* Background Cards */}
                <div className="absolute top-10 w-[260px] h-[300px] bg-slate-800 rounded-2xl opacity-40 transform rotate-[-6deg]" />
                <div className="absolute top-5 w-[280px] h-[300px] bg-slate-700 rounded-2xl opacity-60 transform rotate-[4deg]" />
                
                {/* Main Card (Email Interface) */}
                <div className="relative w-[320px] bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-500">
                  <div className="bg-yellow-500 p-4 flex justify-between items-center">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-300" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="text-white/80 text-xs font-mono">New Campaign</div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="h-3 w-32 bg-slate-800 rounded mb-1" />
                        <div className="h-2 w-20 bg-slate-400 rounded" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-slate-200 rounded" />
                      <div className="h-2 w-full bg-slate-200 rounded" />
                      <div className="h-2 w-3/4 bg-slate-200 rounded" />
                    </div>

                    <div className="mt-6 pt-4">
                      <div className="w-full h-10 bg-yellow-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-yellow-500/30">
                        Shop Now
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [-15, 15, -15] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-4 top-20 bg-white text-yellow-600 p-3 rounded-xl shadow-xl border border-yellow-100"
                >
                  <Send className="w-6 h-6" />
                </motion.div>

                <motion.div 
                  animate={{ y: [15, -15, 15] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-4 bottom-20 bg-yellow-500 text-white p-3 rounded-xl shadow-xl"
                >
                  <CheckCircle className="w-6 h-6" />
                </motion.div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* --- GUIDE / MENU GRID --- */}
        <section className="py-20 px-6 bg-slate-900/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-yellow-400 font-bold text-sm tracking-wider uppercase mb-2 block">Comprehensive Guide</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Navigate Your Strategy</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {GUIDE_SECTIONS.map((item, idx) => (
                <GuideCard key={item.id} item={item} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 border border-yellow-500/20 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10" />
              
              <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Build Your Targeted List</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                 You have goals for a definite guide in order to build up an email list of targeted customers. Let's make it happen.
              </p>
              <button className="relative z-10 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
                <Mail className="w-5 h-5" />
                Launch Campaign
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default EmailMarketing;