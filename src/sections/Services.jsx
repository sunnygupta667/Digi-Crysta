import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { FaSearch, FaShareAlt, FaMousePointer, FaArrowRight } from 'react-icons/fa';

// ==========================================
// CONFIGURATION DATA
// ==========================================
const SERVICES_DATA = [
  {
    id: 1,
    title: "Search Engine Optimization",
    description: "In case you are looking for SEO solutions we have one of the enhancing options relevant to SEO services that meet up requirements covering budgets.",
    icon: <FaSearch />,
    color: "from-blue-400 to-cyan-300"
  },
  {
    id: 2,
    title: "Social Media Optimization",
    description: "Influence your social media for more devotion, more acknowledgment and more clients! We're a top organization for social media marketing.",
    icon: <FaShareAlt />,
    color: "from-purple-400 to-pink-400"
  },
  {
    id: 3,
    title: "Pay Per Click",
    description: "Are you ready for a boom in business with more traffic? We utilize entire advertisement channels to deliver better return on Ads spending ever seen before.",
    icon: <FaMousePointer />,
    color: "from-orange-400 to-red-400"
  }
];

// ==========================================
// SUB-COMPONENT: SERVICE CARD
// ==========================================
const ServiceCard = ({ service, mouseX, mouseY }) => {
  return (
    <div className="group relative w-full h-full">
      {/* Spotlight Effect (Revealed on Hover) */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              rgba(56, 189, 248, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Card Content */}
      <div className="relative h-full flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0f172a]/60 backdrop-blur-md p-8 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
        
        <div>
          {/* Floating Icon Container */}
          <div className="relative mb-8 inline-flex">
            {/* Glowing blur behind icon */}
            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20 blur-xl rounded-full transition-opacity duration-500 group-hover:opacity-40`} />
            
            {/* The Icon itself */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} text-3xl text-white shadow-inner`}
            >
              {service.icon}
            </motion.div>
          </div>

          <h3 className="mb-4 text-2xl font-bold text-white transition-colors group-hover:text-blue-200">
            {service.title}
          </h3>
          
          <p className="text-sm leading-relaxed text-gray-400">
            {service.description}
          </p>
        </div>

        
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================
const Services = () => {
  // Shared Mouse Position for the Grid Spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section className="relative overflow-hidden bg-[#021333] py-24 px-6">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
      
      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-blue-600/20 blur-[128px]" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-purple-600/10 blur-[128px]" />

      <div className="relative z-10 container mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-sm font-bold uppercase tracking-widest text-blue-400"
          >
            Digi Crysta
          </motion.h2>
          
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-6 text-3xl font-black leading-tight text-white md:text-5xl"
          >
            Enhance Your Business <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Productivity & Growth
            </span>
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 leading-relaxed md:text-lg"
          >
            Our approach is to brand the same when needed for the same. We listen to your shape designing procedure and guide you through every step smoothly.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div 
          onMouseMove={handleMouseMove}
          className="group grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES_DATA.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <ServiceCard 
                service={service} 
                mouseX={mouseX} 
                mouseY={mouseY} 
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;