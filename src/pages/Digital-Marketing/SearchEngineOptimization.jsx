import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Globe, 
  BarChart, 
  Share2, 
  Cpu, 
  Layers, 
  Link as LinkIcon,
  CheckCircle,
  TrendingUp,
  Smartphone,
  ShieldCheck,
  FileText,
  Users,
  MousePointer2,
  Target,
  Database,
  Image as ImageIcon,
  ShoppingBag,
  MessageSquare
} from 'lucide-react';

// ==========================================
// CONTENT DATA
// ==========================================
const TRENDS_DATA = [
  { 
    title: "Voice Search & Algorithms", 
    desc: "Rising trends evaluated as voice search or Algorithmic changes that redefine search queries.", 
    icon: <Smartphone className="w-6 h-6 text-blue-400" />
  },
  { 
    title: "Scientific Advancements", 
    desc: "Scientific advancements evaluated as mechanized learning (AI) to better understand user intent.", 
    icon: <Cpu className="w-6 h-6 text-purple-400" />
  },
  { 
    title: "Competitive Strategy", 
    desc: "Developing strategies to rule competition in Google or other search engines.", 
    icon: <Target className="w-6 h-6 text-cyan-400" />
  }
];

const BENEFITS_DATA = [
  { title: "Increase Traffic", desc: "One of the best things is SEO, which increases website traffic consistently." },
  { title: "Great Experience", desc: "Generates a great user experience through optimized content and speed." },
  { title: "Generate Leads", desc: "Generates numerous leads by targeting the right audience." },
  { title: "Maximize Revenue", desc: "Generates amazing revenue for the best potential results to a problem solution." }
];

const STRUCTURAL_ELEMENTS = [
  { title: "Honor Website", icon: <ShieldCheck className="w-5 h-5" /> },
  { title: "Site Structure", icon: <Layers className="w-5 h-5" /> },
  { title: "Website Links", icon: <LinkIcon className="w-5 h-5" /> }
];

const OFF_PAGE_SERVICES = [
  "Social Networking Websites", "Blogging", "Blog Marketing", "Forum Marketing", 
  "Search Engine Marketing Submission", "Directory Submission", "Social Bookmarking", 
  "Link Building", "Sharing of Photos", "Video Marketing", 
  "Business Reviews", "Article Submission", "Shopping with over network"
];

// ==========================================
// SUB-COMPONENT: ANIMATED SEO HERO GRAPHIC
// ==========================================
const SeoHeroGraphic = () => {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center perspective-1000">
      {/* Central Search Hub */}
      <motion.div 
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-20 w-48 h-48 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.4)] border border-white/20"
      >
        <Search className="w-24 h-24 text-white opacity-90 drop-shadow-lg" />
        {/* Scanning Beam */}
        <motion.div 
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-1 bg-cyan-400/50 blur-sm"
        />
      </motion.div>

      {/* Orbiting Elements */}
      {[Globe, BarChart, Share2].map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute"
          animate={{ rotate: 360 }}
          transition={{ duration: 15 + index * 5, repeat: Infinity, ease: "linear" }}
          style={{ width: 300 + index * 100, height: 300 + index * 100 }}
        >
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#0f172a] border border-blue-500/30 rounded-full flex items-center justify-center shadow-lg"
            style={{ transform: `rotate(-${360}deg)` }} 
          >
            <Icon className="w-8 h-8 text-blue-400" />
          </div>
        </motion.div>
      ))}

      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <circle cx="50%" cy="50%" r="150" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 10" className="text-blue-500 animate-[spin_30s_linear_infinite]" />
        <circle cx="50%" cy="50%" r="200" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="20 20" className="text-cyan-500 animate-[spin_40s_linear_infinite_reverse]" />
      </svg>
    </div>
  );
};

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
const SearchEngineOptimization = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="relative w-full min-h-screen bg-[#021333] overflow-hidden font-sans text-gray-300">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-900/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4" />
      </div>

      <div className="container mx-auto px-4 md:px-6 pt-32 pb-32 relative z-10 max-w-7xl">

        {/* --- HERO SECTION --- */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Advanced SEO Strategies
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Search Engine <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Optimization
              </span>
            </h1>
            <p className="text-lg leading-relaxed mb-8 text-gray-400">
              In line with the current state of technology, search engine optimization provides a comprehensive overview of all requirements needed to succeed. SEO is a dynamic field that demands perseverance and updated strategies to dominate search ranks.
            </p>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden text-gray-400 mb-8 border-l-2 border-blue-500/30 pl-4"
                >
                  <p className="mb-4">
                    One of the best things is SEO, which increases website traffic, generates a great experience, generates numerous leads, and generates amazing revenue for the best potential results to a problem solution on a regular basis.
                  </p>
                  <p className="mb-4">
                    Because SEO can be more difficult when creating links, developing any old material, or combining a few keywords to keep their organic keyword search ranks, it can be quite important to stay updated and learn new things on a regular basis.
                  </p>
                  <p>
                    Additionally, it raises a company's visibility and brand awareness, both of which must be monitored. A comprehensive instructional guide covering all SEO components is available with the excellent assistance of experts.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all flex items-center gap-2"
            >
              {isExpanded ? "Show Less" : "Learn More"}
              <motion.span animate={{ rotate: isExpanded ? 180 : 0 }}>↓</motion.span>
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <SeoHeroGraphic />
          </motion.div>
        </div>

        {/* --- TRACKING TRENDS --- */}
        <div className="mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Tracking The Status</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TRENDS_DATA.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="p-8 rounded-2xl bg-[#0f172a]/60 border border-white/5 backdrop-blur-sm hover:border-blue-500/30 hover:bg-[#0f172a]/80 transition-all group shadow-xl"
              >
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- BENEFITS OF SEO (New Section) --- */}
        <div className="mb-32">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-white">Why SEO Matters?</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS_DATA.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gradient-to-br from-blue-900/20 to-transparent p-6 rounded-xl border border-white/5 text-center hover:border-blue-500/40 transition-colors"
              >
                <h4 className="text-lg font-bold text-blue-300 mb-2">{benefit.title}</h4>
                <p className="text-xs text-gray-400">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- CORE DEFINITION (Glass Panel) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/10 p-8 md:p-16 mb-32 text-center"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">What is SEO?</h2>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
            "According to the consolidated statement, search engine optimization (SEO) is a set of tactics used to increase a website's visibility and ranking in search engines. Webmasters tell search engines about the website's quality, which is highly dependent on traffic and an improved ranking in search engine results pages."
          </p>
          
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            {STRUCTURAL_ELEMENTS.map((elem, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="p-4 rounded-full bg-white/5 border border-white/10 text-cyan-400">
                  {elem.icon}
                </div>
                <span className="text-sm font-medium text-gray-300">{elem.title}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* --- ON PAGE SEO DEEP DIVE --- */}
        <div className="mb-32">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 p-10 rounded-3xl bg-[#0a162e] border border-white/5 relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[50px]" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Layers className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">On-Page SEO</h3>
              </div>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                It is always shown on web pages. The full On-Page SEO program optimizes the website page, posts, and other content for search engines. The most important aspect is content. Google's primary goal is to provide customers with the finest relevant content available online.
              </p>

              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Database className="w-4 h-4 text-purple-400" /> Content & Media
              </h4>
              <p className="text-sm text-gray-400 mb-6">
                Your website's content is more than just written articles. It includes images, videos, animated slides, and information designs. Try to make it easier for the customer to comprehend and sophisticated for web spiders.
              </p>

              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 text-cyan-400" /> Keyword Strategy
              </h4>
              <p className="text-sm text-gray-400 mb-6">
                Since a search engine is a game of keywords and precise wording, divisions of SEO are crucial. The value of a keyword is solely determined by search volume in addition to other variables.
              </p>
            </motion.div>

            {/* --- OFF PAGE SEO DEEP DIVE --- */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 p-10 rounded-3xl bg-[#0a162e] border border-white/5 relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[50px]" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <LinkIcon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Off-Page SEO</h3>
              </div>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                Refers to everything that may be done directly on the website to improve one's ranking for marketing, social networking, blog submission, forums, etc. Nowadays, consumers may be searching for specific off-page SEO strategies to increase page ranks.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {OFF_PAGE_SERVICES.map((service, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    <span className="text-xs text-gray-300">{service}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- TRAFFIC & BROWSERS INFO --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-24"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Targeted Traffic & Platforms</h2>
          <p className="text-gray-400 mb-12 leading-relaxed">
            Google, Bing, and Yahoo are some of the web browsers that arise from search engine optimization, which is an excellent platform for a website's top sources. According to the primary source, Twitter, Facebook, and Google Plus are among the major social media networks that receive the most visitors.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-600/20 to-transparent border border-blue-500/20 hover:border-blue-500/40 transition-colors">
              <Users className="w-10 h-10 text-blue-400 mx-auto mb-4" />
              <h4 className="font-bold text-white mb-2">Highly Targeted</h4>
              <p className="text-sm text-gray-400">Traffic directed to your niche</p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-green-600/20 to-transparent border border-green-500/20 hover:border-green-500/40 transition-colors">
              <TrendingUp className="w-10 h-10 text-green-400 mx-auto mb-4" />
              <h4 className="font-bold text-white mb-2">Elevated Revenue</h4>
              <p className="text-sm text-gray-400">Maximize ROI through SEO</p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-orange-600/20 to-transparent border border-orange-500/20 hover:border-orange-500/40 transition-colors">
              <MousePointer2 className="w-10 h-10 text-orange-400 mx-auto mb-4" />
              <h4 className="font-bold text-white mb-2">User Intent</h4>
              <p className="text-sm text-gray-400">Answering user queries precisely</p>
            </div>
          </div>
        </motion.div>

        {/* --- CONCLUSION --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center border-t border-white/10 pt-16"
        >
          <p className="text-gray-400 text-lg">
            On websites, one can find comprehensive answers to entire questions. Additionally, you can create your registration with a professional in the field of your choice. A complete solution for the location of a website can also be placed in the source sections.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default SearchEngineOptimization;