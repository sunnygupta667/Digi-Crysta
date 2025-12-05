import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { 
  CheckCircle2, 
  Globe, 
  TrendingUp, 
  Users, 
  Award, 
  Zap, 
  Layout, 
  Megaphone,
  MonitorPlay,
  MousePointer2,
  Search,
  Mail,
  Smartphone,
  Star
} from 'lucide-react';

// ==========================================
// DATA: SERVICES LIST
// ==========================================
const SERVICES = [
  "Online Paid Marketing",
  "Social Media Marketing",
  "Search Engine Optimization (SEO)",
  "Search Engine Marketing (SEM)",
  "Content Marketing",
  "Pay-Per-Click Advertising (PPC)",
  "Affiliate Marketing",
  "Email Marketing",
  "Radio Advertising",
  "TV Advertising",
  "Local Online Marketing",
  "Reputation Management",
  "Website Design & Developments",
  "App Developments",
  "Reviews Acquisition",
  "Lead Generation",
  "Calls Generation",
  "Gray Hat SEO Expert"
];

// ==========================================
// COMPONENT: SPOTLIGHT CARD
// ==========================================
// A card that reveals a gradient border/background based on mouse position
const SpotlightCard = ({ children, className = "" }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative border border-white/10 bg-slate-900/50 overflow-hidden rounded-xl ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight Gradient Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT: ABOUT PAGE
// ==========================================
const About = () => {
  return (
    <div className="min-h-screen bg-[#021333] text-slate-100 font-sans selection:bg-blue-500/30">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Ambient Background Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold tracking-wider mb-6">
              ABOUT US
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Digi Crysta <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Noida's Top Digital Firm
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              We are the biggest supplier of digital marketing augmentation in India. 
              Subsidiary of Energy and Internet of Things, based in Delhi NCR.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- MAIN CONTENT & STATS --- */}
      <section className="py-16 px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Excellence in <span className="text-blue-400">SEO, SEM, SMO & PPC</span>
              </h2>
              <p className="text-slate-400 leading-relaxed">
                Since 2020, our team of more than 16 highly qualified individuals with expertise in more than 50 digital marketing domains has continuously produced outstanding outcomes.
              </p>
              <p className="text-slate-400 leading-relaxed">
                We serve top brands in diverse industries including Healthcare, Travel, Airlines, Education, IT Services, FMCG, and Retail. Having served over 50 clients, we have established ourselves as the pinnacle of digital marketing excellence.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <a href="/" rel="noopener noreferrer" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2">
                  Visit Website <Globe className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Right: Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Years Experience", value: "5+", icon: <TrendingUp className="text-green-400" /> },
                { label: "Clients Served", value: "50+", icon: <Users className="text-blue-400" /> },
                { label: "Team Experts", value: "16+", icon: <Award className="text-purple-400" /> },
                { label: "Domains", value: "50+", icon: <Globe className="text-cyan-400" /> },
              ].map((stat, idx) => (
                <SpotlightCard key={idx} className="p-6 flex flex-col items-center justify-center text-center bg-slate-800/50">
                  <div className="mb-3 p-3 bg-white/5 rounded-full">{stat.icon}</div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (Spotlight Cards) --- */}
      <section className="py-20 px-6 bg-slate-950/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose Digi Crysta?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Using efficient marketing techniques to build powerful online presence tailored to your demands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <SpotlightCard className="p-8 h-full">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
                <Layout className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">All-inclusive Solutions</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We address every facet of internet marketing, from SEO and PPC to Social Media Optimization (SMO), creating a cohesive strategy for your brand.
              </p>
            </SpotlightCard>

            {/* Card 2 */}
            <SpotlightCard className="p-8 h-full">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Proven Track Record</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Creating leads, promoting brands, and increasing clients' internet visibility using data-driven strategies that guarantee optimal ROI.
              </p>
            </SpotlightCard>

            {/* Card 3 */}
            <SpotlightCard className="p-8 h-full">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Best Agency in Noida</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Our staff uses cutting-edge strategies in line with Google's most recent algorithms to make sure your brand reaches the appropriate audience.
              </p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* --- SERVICES MARQUEE/GRID --- */}
      <section className="py-20 px-6 relative overflow-hidden">
        {/* Moving Background Light for this section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Specializations</h2>
            <p className="text-slate-400">We offer a wealth of knowledge and strategies for online advertising.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.03, backgroundColor: "rgba(30, 41, 59, 0.8)" }}
                className="group flex items-center gap-3 p-4 bg-slate-900/40 border border-white/5 rounded-lg hover:border-blue-500/30 transition-all cursor-default backdrop-blur-sm"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-shadow" />
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                  {service}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="py-16 px-6 bg-gradient-to-t from-blue-900/20 to-transparent">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Take your company to the next level
          </h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Since we have been a top digital marketing business for more than five years, all of our concepts and tactics will provide positive results.
          </p>
          <button className="px-8 py-4 bg-white text-[#021333] font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Partner with Digi Crysta Today
          </button>
        </div>
      </section>
      
    </div>
  );
};

export default About;