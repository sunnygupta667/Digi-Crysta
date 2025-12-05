import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { 
  HelpCircle, 
  MessageCircle, 
  Users, 
  TrendingUp, 
  Search, 
  Award, 
  Globe, 
  Lightbulb,
  MessageSquare
} from 'lucide-react';

// ==========================================
// CONFIGURATION DATA
// ==========================================
const FEATURES = [
  {
    id: 1,
    title: "Expert Answers",
    description: "Gain credibility through excellent answers. Knowledgeable individuals, from industry experts to world leaders (like Justin Trudeau), contribute to the platform.",
    icon: <Award className="w-6 h-6" />,
    gradient: "from-red-500 to-orange-500"
  },
  {
    id: 2,
    title: "Direct Conversations",
    description: "You can ask questions and have direct, meaningful conversations with a specifically selected interest group or niche audience.",
    icon: <MessageCircle className="w-6 h-6" />,
    gradient: "from-orange-500 to-amber-500"
  },
  {
    id: 3,
    title: "SEO Dominance",
    description: "Questions from Quora frequently appear at the top of Google search results, providing long-term, high-esteem organic traffic to your answers.",
    icon: <Search className="w-6 h-6" />,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 4,
    title: "Content Ideas",
    description: "It's a veritable treasure mine of fresh ideas for articles. Use the enormous quantity of points raised to fuel your content strategy.",
    icon: <Lightbulb className="w-6 h-6" />,
    gradient: "from-yellow-400 to-orange-400"
  },
  {
    id: 5,
    title: "Build Supporters",
    description: "High-esteem content and organization make it quite simple to build a loyal foundation of supporters and brand advocates.",
    icon: <Users className="w-6 h-6" />,
    gradient: "from-red-600 to-rose-600"
  }
];

// ==========================================
// COMPONENT: RISING Q&A BUBBLES ANIMATION
// ==========================================
const QuestionBubbles = () => {
  // Generate random bubbles
  const bubbles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100, // percentage
    scale: Math.random() * 0.5 + 0.5,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
    isQuestion: Math.random() > 0.5
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          initial={{ y: "110vh", opacity: 0, x: 0 }}
          animate={{ 
            y: "-10vh", 
            opacity: [0, 0.6, 0],
            x: [0, Math.random() * 50 - 25, 0] // Gentle sway
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            ease: "linear",
            delay: bubble.delay
          }}
          className="absolute"
          style={{ left: `${bubble.x}%`, scale: bubble.scale }}
        >
          <div className={`p-4 rounded-2xl rounded-bl-none border border-red-500/30 bg-red-900/10 backdrop-blur-sm text-red-400`}>
            {bubble.isQuestion ? <HelpCircle className="w-8 h-8" /> : <MessageSquare className="w-8 h-8" />}
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
      rgba(185, 28, 28, 0.15), 
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
      {/* Spotlight Effect (Quora Red Tint) */}
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
            <HelpCircle className="w-4 h-4 text-slate-400 group-hover:text-red-400" />
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
const QuoraMarketing = () => {
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
        
        {/* Ambient Lights */}
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-red-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-orange-900/10 blur-[120px] rounded-full" />
        
        {/* ANIMATION: Rising Q&A Bubbles */}
        <QuestionBubbles />
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
              <Globe className="w-4 h-4" />
              <span>500 Million Monthly Users</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              Quora <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                Marketing
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"
            >
              In case you've been living under a rock, Quora is a huge deal. It's a platform where customers post questions and the community votes for the most helpful answers. It's here to stay.
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
                    Why <span className="text-red-500">Quora</span> Differs?
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mb-6" />
                </div>

                <div className="prose prose-invert text-slate-400 text-lg leading-relaxed space-y-6">
                  <p>
                    Quora differs from other Q&A-style sites in several key ways. It provides a platform for high-quality, long-form answers from knowledgeable individuals.
                  </p>
                  <p>
                    It allows you to ask questions and have direct conversations with a selected interest group. Plus, an enormous quantity of points are earned and shared, making it a veritable treasure mine of fresh ideas for your own content marketing.
                  </p>
                  
                  <div className="flex gap-4 mt-4">
                    <div className="flex-1 p-4 rounded-xl bg-red-900/10 border border-red-500/20">
                      <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-5 h-5 text-red-400" />
                        <h4 className="font-bold text-white text-sm">Traffic Driver</h4>
                      </div>
                      <p className="text-xs text-slate-400">High-intent traffic to your site.</p>
                    </div>
                    <div className="flex-1 p-4 rounded-xl bg-orange-900/10 border border-orange-500/20">
                      <div className="flex items-center gap-3 mb-2">
                        <Award className="w-5 h-5 text-orange-400" />
                        <h4 className="font-bold text-white text-sm">Authority</h4>
                      </div>
                      <p className="text-xs text-slate-400">Build reputation through answers.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Visual Representation (Q&A Card) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative h-full min-h-[400px] flex items-center justify-center"
              >
                <div className="relative w-full max-w-sm bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200">
                  {/* Header */}
                  <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-600 rounded-sm text-white flex items-center justify-center font-serif font-bold text-lg">Q</div>
                    <div className="h-3 w-32 bg-slate-300 rounded" />
                  </div>

                  {/* Question */}
                  <div className="p-6">
                    <h3 className="font-bold text-xl text-slate-900 mb-4 leading-tight">
                      How can I effectively market my brand to a niche audience?
                    </h3>
                    
                    {/* Answer Preview */}
                    <div className="flex gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200" />
                      <div className="flex-1 pt-1">
                        <div className="h-3 w-24 bg-slate-300 rounded mb-1" />
                        <div className="h-2 w-16 bg-slate-200 rounded" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-slate-200 rounded" />
                      <div className="h-2 w-full bg-slate-200 rounded" />
                      <div className="h-2 w-full bg-slate-200 rounded" />
                      <div className="h-2 w-3/4 bg-slate-200 rounded" />
                    </div>

                    <div className="mt-6 flex gap-4 text-slate-400">
                      <div className="h-6 w-16 bg-slate-100 rounded-full" />
                      <div className="h-6 w-16 bg-slate-100 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [-15, 15, -15] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-6 top-10 bg-red-500 text-white p-4 rounded-xl shadow-xl shadow-red-500/20"
                >
                  <MessageCircle className="w-6 h-6" />
                </motion.div>

                <motion.div 
                  animate={{ y: [15, -15, 15] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-6 bottom-20 bg-white text-red-500 p-4 rounded-xl shadow-xl border border-red-100"
                >
                  <TrendingUp className="w-6 h-6" />
                </motion.div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* --- FEATURES GRID --- */}
        <section className="py-20 px-6 bg-slate-900/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-red-400 font-bold text-sm tracking-wider uppercase mb-2 block">Platform Benefits</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Why Quora Works</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
              {FEATURES.map((item, idx) => (
                <FeatureCard key={item.id} item={item} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="bg-gradient-to-r from-red-900/40 to-orange-900/40 border border-red-500/20 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10" />
              
              <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Establish Your Authority</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                 Join the conversation with millions of users. Answer questions, solve problems, and become the go-to expert in your field.
              </p>
              <button className="relative z-10 px-8 py-4 bg-[#B92B27] hover:bg-[#a3221f] text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
                <MessageSquare className="w-5 h-5 fill-current" />
                Start Answering
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default QuoraMarketing;