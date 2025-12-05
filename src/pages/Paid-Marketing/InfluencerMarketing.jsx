import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { 
  Star, 
  Users, 
  Megaphone, 
  TrendingUp, 
  MessageCircle, 
  Award, 
  Camera,
  Heart,
  Share2,
  CheckCircle
} from 'lucide-react';

// ==========================================
// HELPER COMPONENTS
// ==========================================
// Moved up to ensure it is defined before usage in BENEFITS
const TargetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
);

// ==========================================
// CONFIGURATION DATA
// ==========================================
const BENEFITS = [
  {
    id: 1,
    title: "Paid Ad Alternative",
    description: "One of the most effective sources of paid advertising programs today. It serves as a fantastic, authentic substitute for traditional sponsored ads.",
    icon: <Megaphone className="w-6 h-6" />,
    gradient: "from-pink-500 to-rose-500"
  },
  {
    id: 2,
    title: "Brand Advocates",
    description: "Evolving marketing by employing brand advocates to spread messages to a wider audience in an organic, trustworthy manner.",
    icon: <Users className="w-6 h-6" />,
    gradient: "from-purple-500 to-indigo-500"
  },
  {
    id: 3,
    title: "Target Motivation",
    description: "Work directly with well-known industry figures to choose firm brands and motivate target consumers through social proof.",
    icon: <TargetIcon />, 
    gradient: "from-orange-400 to-red-500"
  },
  {
    id: 4,
    title: "Consumer Perception",
    description: "A buyer's perception is often shaped by testimonials from influencers, journalists, academics, and YouTube celebrities.",
    icon: <Star className="w-6 h-6" />,
    gradient: "from-yellow-400 to-amber-500"
  }
];

// ==========================================
// COMPONENT: PAPARAZZI FLASH ANIMATION
// ==========================================
const PaparazziFlash = () => {
  // Generate random flash points
  const flashes = Array.from({ length: 8 });
  const stars = Array.from({ length: 12 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Random Flashes */}
      {flashes.map((_, i) => (
        <motion.div
          key={`flash-${i}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.5]
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatDelay: Math.random() * 5 + 2,
            delay: Math.random() * 5
          }}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`
          }}
          className="absolute w-32 h-32 bg-white/20 blur-[40px] rounded-full"
        />
      ))}

      {/* Floating Stars */}
      {stars.map((_, i) => (
        <motion.div
          key={`star-${i}`}
          initial={{ y: "110vh", opacity: 0, rotate: 0 }}
          animate={{ 
            y: "-10vh", 
            opacity: [0, 0.6, 0],
            rotate: 360
          }}
          transition={{
            duration: Math.random() * 15 + 20,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
          style={{ left: `${Math.random() * 100}%` }}
          className="absolute text-yellow-400/30"
        >
          <Star className="w-4 h-4 fill-current" />
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
      rgba(236, 72, 153, 0.1), 
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
      className="group relative h-full bg-[#0a162e]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-pink-500/30 transition-all duration-300"
    >
      {/* Spotlight Effect */}
      <motion.div
        style={{ background: spotlight }}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />

      <div className="relative z-10 p-8 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <span className="text-white drop-shadow-md">{item.icon}</span>
          </div>
          <div className="bg-white/5 p-1.5 rounded-lg border border-white/10 group-hover:border-pink-500/30 transition-colors">
            <Star className="w-4 h-4 text-slate-400 group-hover:text-yellow-400 group-hover:fill-yellow-400 transition-all" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-pink-300 transition-colors">
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
const InfluencerMarketing = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#021333] text-slate-100 font-sans selection:bg-pink-500/30 overflow-hidden">
      
      {/* --- BACKGROUND DESIGN --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Radial Dot Texture */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        
        {/* Ambient Spotlight Lights */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-pink-900/10 blur-[120px] rounded-full" />
        
        {/* ANIMATION: Paparazzi Flash */}
        <PaparazziFlash />
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <Award className="w-4 h-4" />
              <span>Industry Leader Partnership</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              Influencer <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
                Marketing
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"
            >
              Work directly with well-known industry figures to motivate target consumers. Leverage the power of authentic voices to amplify your brand.
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
                    The Power of <span className="text-pink-500">Influence</span>
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-6" />
                </div>

                <div className="prose prose-invert text-slate-400 text-lg leading-relaxed space-y-6">
                  <p>
                    One of the most effective sources of paid advertising programs nowadays is influencer marketing. It serves as a fantastic substitute for sponsored advertising campaigns, delivering messages in an organic manner.
                  </p>
                  <p>
                    Influencer marketing is evolving by employing brand advocates to spread messages to a wider audience. People pay influencers to "get out of the world" rather than marketing directly to consumers in a traditional way.
                  </p>
                  <p>
                    A buyer's perception is often influenced by testimonials from:
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {["Journalists", "Academics", "YouTubers", "Celebrities"].map((role, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-purple-400" />
                        {role}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Visual Representation (Social Post Mockup) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative h-full min-h-[400px] flex items-center justify-center"
              >
                <div className="relative w-[300px] bg-white rounded-2xl shadow-2xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  {/* Post Image */}
                  <div className="h-64 bg-slate-200 relative">
                     <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 opacity-80" />
                     <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-300 overflow-hidden">
                           {/* Avatar Placeholder */}
                           <div className="w-full h-full bg-slate-400" />
                        </div>
                        <div className="text-white text-sm font-bold shadow-black drop-shadow-md">@TopInfluencer</div>
                     </div>
                  </div>
                  
                  {/* Post Content */}
                  <div className="p-5">
                    <div className="flex gap-4 mb-4">
                       <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                       <MessageCircle className="w-6 h-6 text-slate-400" />
                       <Share2 className="w-6 h-6 text-slate-400" />
                    </div>
                    <div className="h-2 w-3/4 bg-slate-800 rounded mb-2" />
                    <div className="h-2 w-full bg-slate-400 rounded mb-2" />
                    <div className="h-2 w-1/2 bg-slate-400 rounded" />
                    <div className="mt-4 text-xs text-blue-500 font-bold">#BrandPartner #Ad</div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [-15, 15, -15] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-6 top-10 bg-white text-pink-600 p-3 rounded-full shadow-xl"
                >
                  <TrendingUp className="w-6 h-6" />
                </motion.div>

                <motion.div 
                  animate={{ y: [15, -15, 15] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-6 bottom-32 bg-white text-purple-600 p-3 rounded-full shadow-xl"
                >
                  <Star className="w-6 h-6 fill-current" />
                </motion.div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* --- BENEFITS GRID --- */}
        <section className="py-20 px-6 bg-slate-900/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-pink-400 font-bold text-sm tracking-wider uppercase mb-2 block">Key Advantages</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Why Influencer Marketing?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {BENEFITS.map((item, idx) => (
                <BenefitCard key={item.id} item={item} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="bg-gradient-to-r from-pink-900/40 to-purple-900/40 border border-pink-500/20 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10" />
              
              <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Launch Your Campaign</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                 Connect with the voices that matter. Let us help you find the perfect brand advocates to tell your story.
              </p>
              <button className="relative z-10 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
                <Camera className="w-5 h-5" />
                Find Influencers
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default InfluencerMarketing;