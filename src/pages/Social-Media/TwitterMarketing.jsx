import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { 
  Twitter, 
  Repeat, 
  Heart, 
  Hash, 
  TrendingUp, 
  Users, 
  BarChart2,
  MessageCircle,
  Search,
  Zap
} from 'lucide-react';

// ==========================================
// CONFIGURATION DATA
// ==========================================
const SERVICES = [
  {
    id: 1,
    title: "Twitter Followers",
    description: "Expand your extensive Twitter user base efficiently. We help both individuals and businesses just getting started to build a credible following.",
    icon: <Users className="w-6 h-6" />,
    gradient: "from-sky-400 to-blue-500"
  },
  {
    id: 2,
    title: "Twitter Retweets",
    description: "Amplify your message. Our network ensures your content reaches further by generating authentic retweets, increasing your viral potential.",
    icon: <Repeat className="w-6 h-6" />,
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    id: 3,
    title: "Twitter Favorites",
    description: "Boost social proof. Increasing favorites on your tweets signals relevance to the algorithm and encourages organic engagement.",
    icon: <Heart className="w-6 h-6" />,
    gradient: "from-indigo-500 to-purple-500"
  }
];

const FEATURES = [
  {
    title: "Trend Capitalization",
    desc: "Our Twitter trending services combine meticulous research with effective planning to capitalize on the hottest trends instantly.",
    icon: <TrendingUp className="w-5 h-5 text-sky-400" />
  },
  {
    title: "Hashtag Achievement",
    desc: "There is a strong Twitter network to support hashtag achievement, thanks to a team of Twitter professionals dedicated to your campaign.",
    icon: <Hash className="w-5 h-5 text-blue-400" />
  },
  {
    title: "ROI Tracking",
    desc: "We create expert marketing programs and track their development meticulously to determine accurate return on investment.",
    icon: <BarChart2 className="w-5 h-5 text-purple-400" />
  }
];

// ==========================================
// COMPONENT: REAL-TIME STREAM ANIMATION
// ==========================================
const StreamFlow = () => {
  // Generate floating particles (icons)
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100, // percentage
    delay: Math.random() * 10,
    duration: Math.random() * 10 + 10,
    iconType: i % 4 // 0: Hash, 1: Repeat, 2: Heart, 3: Twitter
  }));

  const getIcon = (type) => {
    switch(type) {
      case 0: return <Hash className="w-6 h-6 opacity-20" />;
      case 1: return <Repeat className="w-5 h-5 opacity-20" />;
      case 2: return <Heart className="w-4 h-4 opacity-20" />;
      default: return <Twitter className="w-5 h-5 opacity-20" />;
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Vertical Guide Lines */}
      <div className="absolute inset-0 flex justify-evenly opacity-5">
        <div className="w-px h-full bg-sky-500" />
        <div className="w-px h-full bg-sky-500" />
        <div className="w-px h-full bg-sky-500" />
        <div className="w-px h-full bg-sky-500" />
      </div>

      {/* Floating Icons */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{ 
            y: "-10vh", 
            opacity: [0, 0.5, 0] 
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay
          }}
          className="absolute text-sky-400"
          style={{ left: `${p.x}%` }}
        >
          {getIcon(p.iconType)}
        </motion.div>
      ))}
    </div>
  );
};

// ==========================================
// COMPONENT: INTERACTIVE CARD
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
      rgba(56, 189, 248, 0.1), 
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
      className="group relative h-full bg-[#0a162e]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-sky-500/30 transition-all duration-300"
    >
      {/* Spotlight Effect (Sky Blue Tint) */}
      <motion.div
        style={{ background: spotlight }}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />

      <div className="relative z-10 p-8 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${service.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <span className="text-white drop-shadow-md">{service.icon}</span>
          </div>
          <div className="bg-white/5 p-1.5 rounded-lg border border-white/10 group-hover:border-sky-500/30 transition-colors">
            <Zap className="w-4 h-4 text-slate-400 group-hover:text-sky-400" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors">
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
const TwitterMarketing = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#021333] text-slate-100 font-sans selection:bg-sky-500/30 overflow-hidden">
      
      {/* --- BACKGROUND DESIGN --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Radial Dot Texture */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        
        {/* Ambient Twitter Lights */}
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-sky-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full" />
        
        {/* ANIMATION: Stream Flow */}
        <StreamFlow />
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <Twitter className="w-4 h-4 fill-current" />
              <span>Real-Time Engagement</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              Twitter <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
                Marketing
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"
            >
              Use the newest social media trends to advertise businesses on Twitter. Our services guarantee a brand's increase in traffic and popularity through effective planning.
            </motion.p>
          </motion.div>
        </section>

        {/* --- STRATEGY GRID --- */}
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
                    Capitalize on the <span className="text-sky-400">Hottest Trends</span>
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full mb-6" />
                </div>

                <div className="prose prose-invert text-slate-400 text-lg leading-relaxed space-y-6">
                  <p>
                    The promotional services use the newest social media trends to advertise businesses on Twitter, which has produced impressive outcomes for businesses in terms of higher website traffic.
                  </p>
                  <p>
                    Additionally, the company provides Twitter services to guarantee a brand's increase in traffic and popularity. We create expert marketing programs for everything from businesses to Twitter personalities.
                  </p>
                  
                  <div className="space-y-4">
                    {FEATURES.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-sky-500/30 transition-colors">
                        <div className="bg-sky-500/10 p-2 rounded-lg mt-1">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-sm mb-1">{feature.title}</h4>
                          <p className="text-xs text-slate-400">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Visual Representation (Live Feed Mockup) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative h-full min-h-[500px] flex items-center justify-center"
              >
                <div className="relative w-[320px] bg-[#15202b] rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
                  {/* Header */}
                  <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-[#15202b]/90 backdrop-blur-sm sticky top-0 z-10">
                    <div className="w-8 h-8 bg-sky-500 rounded-full" />
                    <Twitter className="w-6 h-6 text-white fill-current" />
                    <Search className="w-5 h-5 text-slate-400" />
                  </div>

                  {/* Feed Content */}
                  <div className="p-4 space-y-6">
                    {[1, 2, 3].map((item, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.3 }}
                        className="flex gap-3"
                      >
                        <div className="w-10 h-10 rounded-full bg-slate-700 shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="flex gap-2 items-center">
                            <div className="h-3 w-20 bg-slate-600 rounded" />
                            <div className="h-3 w-12 bg-slate-800 rounded" />
                          </div>
                          <div className="h-16 w-full bg-slate-800 rounded-xl" />
                          <div className="flex justify-between text-slate-500 pt-1">
                            <MessageCircle className="w-4 h-4" />
                            <Repeat className="w-4 h-4 hover:text-green-400 transition-colors" />
                            <Heart className="w-4 h-4 hover:text-red-500 transition-colors" />
                            <TrendingUp className="w-4 h-4" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Overlay Gradient */}
                  <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#15202b] to-transparent pointer-events-none" />
                </div>

                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-8 top-32 bg-sky-500 text-white p-3 rounded-full shadow-xl shadow-sky-500/20"
                >
                  <Hash className="w-6 h-6" />
                </motion.div>

                <motion.div 
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-8 bottom-32 bg-[#1d9bf0] text-white p-3 rounded-full shadow-xl shadow-blue-500/20"
                >
                  <Repeat className="w-6 h-6" />
                </motion.div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* --- SERVICES GRID --- */}
        <section className="py-20 px-6 bg-slate-900/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-sky-400 font-bold text-sm tracking-wider uppercase mb-2 block">Our Services</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Growth Solutions</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SERVICES.map((service, idx) => (
                <ServiceCard key={service.id} service={service} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="bg-gradient-to-r from-sky-900/40 to-blue-900/40 border border-sky-500/20 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-blue-500/10" />
              
              <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Join the Conversation</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                 Our extensive Twitter user base includes both individuals and businesses that are just getting started. Let's make your brand trend.
              </p>
              <button className="relative z-10 px-8 py-4 bg-[#1DA1F2] hover:bg-[#1a91da] text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
                <Twitter className="w-5 h-5 fill-current" />
                Start Tweeting
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default TwitterMarketing;