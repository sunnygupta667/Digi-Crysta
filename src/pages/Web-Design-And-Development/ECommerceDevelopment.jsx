import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { 
  ShoppingBag, 
  CreditCard, 
  Globe, 
  Truck, 
  Store, 
  MousePointerClick, 
  ShoppingCart, 
  TrendingUp, 
  Package, 
  DollarSign
} from 'lucide-react';

// ==========================================
// CONFIGURATION DATA
// ==========================================
const FEATURES = [
  {
    id: 1,
    title: "Direct-to-Consumer",
    description: "The 'center man' is eliminated. Our solutions allow you to sell directly to customers, maximizing margins and building stronger relationships without intermediaries.",
    icon: <Store className="w-6 h-6" />,
    gradient: "from-green-500 to-emerald-600"
  },
  {
    id: 2,
    title: "Global Market Access",
    description: "With a single mouse click, companies can easily enter the homes of prospective buyers worldwide. Expand your reach beyond physical boundaries.",
    icon: <Globe className="w-6 h-6" />,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    title: "Full-Scale Commerce",
    description: "Unlike traditional informational sites, our platforms enable the purchase of whole products and projects online, handling complex transactions securely.",
    icon: <ShoppingCart className="w-6 h-6" />,
    gradient: "from-purple-500 to-indigo-500"
  },
  {
    id: 4,
    title: "Home Comfort Shopping",
    description: "Enable customers to shop for full categories from the comfort of their house and computer screen. We prioritize user experience for seamless browsing.",
    icon: <MousePointerClick className="w-6 h-6" />,
    gradient: "from-orange-500 to-red-500"
  }
];

// ==========================================
// COMPONENT: INFINITE PRODUCT STREAM ANIMATION
// ==========================================
const ProductStream = () => {
  // Create rows of abstract product cards
  const rows = [
    { direction: 1, speed: 20, top: '10%' },
    { direction: -1, speed: 25, top: '40%' },
    { direction: 1, speed: 30, top: '70%' }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      {rows.map((row, i) => (
        <motion.div
          key={i}
          className="absolute w-full flex gap-8"
          style={{ top: row.top }}
          animate={{ x: row.direction * -100 + "%" }}
          transition={{ 
            ease: "linear", 
            duration: row.speed, 
            repeat: Infinity 
          }}
        >
          {/* Repeat items to create infinite loop illusion */}
          {Array.from({ length: 20 }).map((_, j) => (
            <div 
              key={j} 
              className="w-48 h-32 bg-white/10 rounded-xl border border-white/10 flex flex-col p-3 shrink-0 backdrop-blur-sm"
            >
              <div className="flex-1 bg-white/20 rounded-lg mb-2" />
              <div className="h-2 w-2/3 bg-white/20 rounded mb-1" />
              <div className="h-2 w-1/3 bg-white/20 rounded" />
            </div>
          ))}
        </motion.div>
      ))}
      
      {/* Vertical Gradients to fade edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#021333] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#021333] to-transparent z-10" />
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
      rgba(16, 185, 129, 0.15), 
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
      className="group relative h-full bg-[#0a162e]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300"
    >
      {/* Spotlight Effect (Emerald Tint for Money/Sales) */}
      <motion.div
        style={{ background: spotlight }}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />

      <div className="relative z-10 p-8 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <span className="text-white drop-shadow-md">{item.icon}</span>
          </div>
          <div className="bg-white/5 p-1.5 rounded-lg border border-white/10 group-hover:border-emerald-500/30 transition-colors">
            <ShoppingBag className="w-4 h-4 text-slate-400 group-hover:text-emerald-400" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
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
const ECommerceDevelopment = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#021333] text-slate-100 font-sans selection:bg-emerald-500/30 overflow-hidden">
      
      {/* --- BACKGROUND DESIGN --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Radial Dot Texture */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        
        {/* Ambient Commercial Lights */}
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-emerald-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full" />
        
        {/* ANIMATION: Infinite Product Stream */}
        <ProductStream />
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <Truck className="w-4 h-4" />
              <span>Digital Storefront Solutions</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              E-Commerce <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
                Development
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"
            >
              Independent businesses and enterprises are realizing the benefits of online sales. With the Internet's rapid development, every fantastic service can be located, bought, and communicated online.
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
                    The Evolution of <span className="text-emerald-400">Retail</span>
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mb-6" />
                </div>

                <div className="prose prose-invert text-slate-400 text-lg leading-relaxed space-y-6">
                  <p>
                    Online businesses allow people to buy whole products and projects. They are not quite the same as a traditional website because they allow customers to purchase a good or service online rather than merely providing information.
                  </p>
                  <p>
                    Instead of physically going to the store and requesting an item or system, it allows the customer to make incremental purchases on an organization's website. Individuals and businesses are embracing this opportunity to buy and sell online like never before.
                  </p>
                  
                  <div className="flex gap-4 mt-4">
                    <div className="flex-1 p-4 rounded-xl bg-emerald-900/10 border border-emerald-500/20">
                      <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                        <h4 className="font-bold text-white text-sm">Growth</h4>
                      </div>
                      <p className="text-xs text-slate-400">Scalable sales infrastructure.</p>
                    </div>
                    <div className="flex-1 p-4 rounded-xl bg-blue-900/10 border border-blue-500/20">
                      <div className="flex items-center gap-3 mb-2">
                        <Package className="w-5 h-5 text-blue-400" />
                        <h4 className="font-bold text-white text-sm">Logistics</h4>
                      </div>
                      <p className="text-xs text-slate-400">Integrated inventory management.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Visual Representation (E-Commerce Dashboard) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative h-full min-h-[400px] flex items-center justify-center"
              >
                <div className="relative w-full max-w-md bg-[#0f172a] rounded-2xl border border-slate-700 shadow-2xl overflow-hidden group">
                  {/* Dashboard Header */}
                  <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="text-xs text-slate-400 font-mono">admin.dashboard</div>
                  </div>

                  {/* Dashboard Body */}
                  <div className="p-6 space-y-6">
                    {/* Stat Cards */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700">
                        <div className="text-xs text-slate-400 mb-1">Total Revenue</div>
                        <div className="text-xl font-bold text-emerald-400">$24,500</div>
                      </div>
                      <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700">
                        <div className="text-xs text-slate-400 mb-1">Orders</div>
                        <div className="text-xl font-bold text-blue-400">1,240</div>
                      </div>
                    </div>

                    {/* Sales Graph */}
                    <div className="h-32 w-full bg-slate-800/30 rounded-xl border border-slate-700 relative overflow-hidden flex items-end px-2 pb-2 gap-1">
                       {[30, 50, 45, 60, 80, 75, 90, 100].map((h, i) => (
                         <motion.div 
                           key={i}
                           initial={{ height: 0 }}
                           whileInView={{ height: `${h}%` }}
                           transition={{ delay: i * 0.1, duration: 0.5 }}
                           className="flex-1 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-sm opacity-80"
                         />
                       ))}
                    </div>

                    {/* Recent Order Item */}
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-white/10 rounded-md flex items-center justify-center">
                           <Package className="w-5 h-5 text-slate-300" />
                         </div>
                         <div>
                           <div className="text-sm text-white font-medium">New Order #402</div>
                           <div className="text-xs text-slate-500">2 mins ago</div>
                         </div>
                       </div>
                       <div className="text-emerald-400 font-bold text-sm">+$120.00</div>
                    </div>
                  </div>
                </div>

                {/* Floating Payment Element */}
                <motion.div 
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-6 top-10 bg-emerald-500 text-white p-3 rounded-xl shadow-xl shadow-emerald-500/20"
                >
                  <CreditCard className="w-6 h-6" />
                </motion.div>

                <motion.div 
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-6 bottom-20 bg-blue-600 text-white p-3 rounded-xl shadow-xl shadow-blue-500/20"
                >
                  <DollarSign className="w-6 h-6" />
                </motion.div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* --- FEATURES GRID --- */}
        <section className="py-20 px-6 bg-slate-900/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-emerald-400 font-bold text-sm tracking-wider uppercase mb-2 block">Our Expertise</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Commerce Solutions</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((item, idx) => (
                <FeatureCard key={item.id} item={item} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="bg-gradient-to-r from-emerald-900/40 to-cyan-900/40 border border-emerald-500/20 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10" />
              
              <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Start Selling Online</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                 Independent businesses and entrepreneurs are realizing the benefits of online sales. Don't ignore the opportunity to enter the homes of your prospective buyers.
              </p>
              <button className="relative z-10 px-8 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
                <Store className="w-5 h-5" />
                Launch Store
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ECommerceDevelopment;