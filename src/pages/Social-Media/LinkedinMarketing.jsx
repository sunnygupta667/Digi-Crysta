import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { 
  Linkedin, 
  Briefcase, 
  Users, 
  UserPlus, 
  MessageSquare, 
  Share2, 
  ShieldCheck,
  TrendingUp,
  Globe,
  Award
} from 'lucide-react';

// ==========================================
// CONFIGURATION DATA
// ==========================================
const SERVICES = [
  {
    id: 1,
    title: "Account Setup",
    description: "Professional setup of your company page or personal profile to ensure all details align with your brand identity and SEO best practices.",
    icon: <ShieldCheck className="w-6 h-6" />,
    gradient: "from-blue-600 to-cyan-500"
  },
  {
    id: 2,
    title: "Profile Creation",
    description: "Crafting a compelling bio, headline, and summary that highlights your expertise and attracts the right professional connections.",
    icon: <Briefcase className="w-6 h-6" />,
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    id: 3,
    title: "Regular Updates",
    description: "Consistent posting of industry-relevant content to keep your audience engaged and maintain top-of-mind awareness.",
    icon: <Share2 className="w-6 h-6" />,
    gradient: "from-cyan-500 to-teal-500"
  },
  {
    id: 4,
    title: "500+ Connections",
    description: "Strategic networking to rapidly grow your professional circle to the 500+ mark, enhancing your profile's credibility and reach.",
    icon: <UserPlus className="w-6 h-6" />,
    gradient: "from-indigo-500 to-purple-600"
  },
  {
    id: 5,
    title: "Group Participation",
    description: "Active engagement in relevant industry groups to showcase expertise, share insights, and connect with peers.",
    icon: <Users className="w-6 h-6" />,
    gradient: "from-blue-400 to-blue-600"
  },
  {
    id: 6,
    title: "Thought Leadership",
    description: "Answering questions and engaging in discussions within your network to establish authority and build trust.",
    icon: <MessageSquare className="w-6 h-6" />,
    gradient: "from-teal-400 to-emerald-500"
  }
];

// ==========================================
// COMPONENT: NETWORK WEB ANIMATION
// ==========================================
const NetworkWeb = () => {
  // We'll use a canvas-like approach with SVGs for performance
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // Generate random nodes
  const nodes = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100, // percentage
    y: Math.random() * 100, // percentage
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg className="w-full h-full">
        {/* Draw connecting lines (simulated for visual effect without complex JS physics) */}
        {nodes.map((node, i) => (
          <motion.line
            key={`line-${i}`}
            x1={`${node.x}%`}
            y1={`${node.y}%`}
            x2={`${nodes[(i + 1) % nodes.length].x}%`}
            y2={`${nodes[(i + 1) % nodes.length].y}%`}
            stroke="url(#lineGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: node.duration,
              repeat: Infinity,
              ease: "linear",
              delay: node.delay
            }}
          />
        ))}

        {/* Draw Nodes */}
        {nodes.map((node, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size}
            fill="#3b82f6"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: node.delay
            }}
          />
        ))}

        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.5)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// ==========================================
// COMPONENT: INTERACTIVE SERVICE CARD
// ==========================================
const ServiceCard = ({ service, index }) => {
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
      {/* Spotlight Effect */}
      <motion.div
        style={{ background: spotlight }}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />

      <div className="relative z-10 p-8 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${service.gradient} bg-opacity-10 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <span className="text-white drop-shadow-md">{service.icon}</span>
          </div>
          <div className="bg-white/5 p-1.5 rounded-lg border border-white/10 group-hover:border-blue-500/30 transition-colors">
            <Linkedin className="w-4 h-4 text-blue-400 opacity-50 group-hover:opacity-100" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
          {service.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed flex-grow">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
};

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
const LinkedinMarketing = () => {
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
        
        {/* Ambient Professional Lights */}
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-blue-800/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-indigo-900/10 blur-[120px] rounded-full" />
        
        {/* ANIMATION: Network Web */}
        <NetworkWeb />
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
              <Linkedin className="w-4 h-4 fill-current" />
              <span>Professional Network Growth</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              LinkedIn <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Marketing
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"
            >
              Connect with millions of professionals worldwide. Manage your brand reputation, increase visibility, and generate high-quality B2B leads.
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
                    The Professional <span className="text-blue-400">Advantage</span>
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mb-6" />
                </div>

                <div className="prose prose-invert text-slate-400 text-lg leading-relaxed space-y-6">
                  <p>
                    LinkedIn is one of the tried-and-true social media platforms that offers marketers the most professional approach. It cultivates industry connections to impact decision-makers directly.
                  </p>
                  <p>
                    Millions of professionals worldwide have LinkedIn profiles that could be among the top options for purchasers or associates. This makes it one of the greatest solutions if you wish to generate substantial revenue among professionals.
                  </p>
                  
                  <div className="flex gap-4 mt-4">
                    <div className="flex-1 p-4 rounded-xl bg-blue-900/20 border border-blue-500/20">
                      <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-5 h-5 text-blue-400" />
                        <h4 className="font-bold text-white text-sm">Revenue Gen</h4>
                      </div>
                      <p className="text-xs text-slate-400">High-ticket B2B sales opportunities.</p>
                    </div>
                    <div className="flex-1 p-4 rounded-xl bg-indigo-900/20 border border-indigo-500/20">
                      <div className="flex items-center gap-3 mb-2">
                        <Award className="w-5 h-5 text-indigo-400" />
                        <h4 className="font-bold text-white text-sm">Reputation</h4>
                      </div>
                      <p className="text-xs text-slate-400">Establish industry thought leadership.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Visual Representation (Profile Card) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative h-full min-h-[400px] flex items-center justify-center"
              >
                <div className="relative w-[340px] bg-white rounded-xl shadow-2xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  {/* Banner */}
                  <div className="h-24 bg-[#0077b5] relative overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-80" />
                     <div className="absolute top-0 right-0 p-2">
                       <Linkedin className="text-white/30 w-12 h-12 -rotate-12" />
                     </div>
                  </div>
                  
                  {/* Profile Info */}
                  <div className="px-6 pb-6 relative">
                    <div className="w-24 h-24 rounded-full border-4 border-white bg-slate-200 -mt-12 mb-3 shadow-lg relative overflow-hidden">
                       <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                         <Briefcase className="w-10 h-10 text-slate-400" />
                       </div>
                    </div>
                    
                    <div className="space-y-1 mb-4">
                      <div className="h-6 w-3/4 bg-slate-800 rounded mb-1" />
                      <div className="h-4 w-1/2 bg-slate-400 rounded" />
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-2">
                        <Globe className="w-3 h-3" />
                        <span>500+ Connections</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-6">
                      <div className="flex-1 h-8 bg-[#0077b5] rounded-full" />
                      <div className="w-8 h-8 border border-slate-300 rounded-full" />
                    </div>
                  </div>
                  
                  {/* Overlay Shine */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
                </div>

                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [-15, 15, -15] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-8 top-10 bg-[#0077b5] text-white p-3 rounded-lg shadow-xl"
                >
                  <UserPlus className="w-6 h-6" />
                </motion.div>

                <motion.div 
                  animate={{ y: [15, -15, 15] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-8 bottom-20 bg-white text-[#0077b5] p-3 rounded-lg shadow-xl"
                >
                  <MessageSquare className="w-6 h-6" />
                </motion.div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* --- SERVICES GRID --- */}
        <section className="py-20 px-6 bg-slate-900/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-blue-400 font-bold text-sm tracking-wider uppercase mb-2 block">Our Solutions</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">LinkedIn Services</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((service, idx) => (
                <ServiceCard key={service.id} service={service} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-500/20 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10" />
              
              <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Connect with Industry Leaders</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                 Leverage our expertise to build a robust professional network and generate high-quality leads that convert.
              </p>
              <button className="relative z-10 px-8 py-4 bg-[#0077b5] hover:bg-[#006097] text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
                <Linkedin className="w-5 h-5 fill-current" />
                Start Networking
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default LinkedinMarketing;