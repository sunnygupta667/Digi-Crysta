import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaTwitter, 
  FaFacebookF, 
  FaLinkedinIn, 
  FaYoutube, 
  FaPinterestP,
  FaArrowRight
} from 'react-icons/fa';

// Assets (Keep your existing paths)
import footerHero from "../assets/images/footerHero.jpg"; 
import cloud from "../assets/images/cloud.png"; 

// ==========================================
// CONFIGURATION
// ==========================================
const SITE_CONFIG = {
  background: footerHero, 
  companyLinks: [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Pricing", path: "/pricing" },
    { name: "Blogs", path: "/blog" },
  ],
  serviceLinks: [
    { name: "Website Design", path: "/website-designing-development" },
    { name: "App Development", path: "/mobile-app-development" },
    { name: "PPC Management", path: "/ppc-bing" },
    { name: "SEO Services", path: "/search-engine-optimization" },
    { name: "Social Media Ads", path: "/facebook-advertising" },
  ],
  socials: [
    { icon: <FaTwitter />, url: "https://twitter.com", color: "hover:bg-sky-500" },
    { icon: <FaFacebookF />, url: "https://facebook.com", color: "hover:bg-blue-600" },
    { icon: <FaLinkedinIn />, url: "https://linkedin.com", color: "hover:bg-blue-700" },
    { icon: <FaYoutube />, url: "https://youtube.com", color: "hover:bg-red-600" },
    { icon: <FaPinterestP />, url: "https://pinterest.com", color: "hover:bg-red-500" },
  ]
};

// ==========================================
// ANIMATION VARIANTS
// ==========================================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
  }
};

const itemUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

// ==========================================
// SUB-COMPONENT: DIGITAL DUST PARTICLES
// ==========================================
const DigitalDust = () => {
  // Create 15 random particles
  const particles = Array.from({ length: 15 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => {
        // Randomize initial positions and animation properties
        const randomLeft = Math.random() * 100;
        const randomTop = Math.random() * 100;
        const duration = Math.random() * 10 + 10; // Slow movement (10-20s)
        const delay = Math.random() * 5;

        return (
          <motion.div
            key={i}
            className="absolute bg-blue-400 rounded-full opacity-20"
            style={{
              left: `${randomLeft}%`,
              top: `${randomTop}%`,
              width: Math.random() * 4 + 2 + 'px', // Size 2px - 6px
              height: Math.random() * 4 + 2 + 'px',
            }}
            animate={{
              y: [0, -30, 0], // Float up and down
              x: [0, Math.random() * 20 - 10, 0], // Slight horizontal drift
              opacity: [0.1, 0.5, 0.1], // Pulse effect
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay,
            }}
          />
        );
      })}
    </div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================
const Footer = () => {
  return (
    <footer className="relative bg-[#021333] text-white overflow-hidden font-sans border-t border-white/5">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0">
        {/* Static Background Image with strong overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay"
          style={{ backgroundImage: `url('${SITE_CONFIG.background}')` }}
        />
        
        {/* Animated Digital Dust (High Performance) */}
        <DigitalDust />

        {/* Subtle Ambient Gradient Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        className="relative z-10 container mx-auto px-6 lg:px-12 pt-20 pb-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        
        {/* GRID LAYOUT ADJUSTMENT:
           Grid changed to 4 columns. 
           - Brand Info takes 2 columns (50% width)
           - Company Links takes 1 column (25% width)
           - Service Links takes 1 column (25% width)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* ==========================
              COLUMN 1 & 2: BRAND & INFO (Expanded)
             ========================== */}
          <motion.div variants={itemUp} className="lg:col-span-2 flex flex-col gap-6 pr-0 lg:pr-12">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                <img src={cloud} alt="Digi Crysta" className="w-10 h-10 object-contain" />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">Digi Crysta</h2>
                <p className="text-xs text-blue-300 tracking-widest uppercase">Digital Excellence</p>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed text-sm md:text-base max-w-lg">
              Empowering businesses with cutting-edge digital solutions. We combine creativity with technical expertise to deliver results that matter. From Noida to the global stage, we are your partners in growth.
            </p>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="flex items-start gap-3 text-gray-300 group">
                <FaMapMarkerAlt className="mt-1 text-blue-500 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm group-hover:text-white transition-colors">Noida, Uttar Pradesh, India</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 group">
                <FaPhoneAlt className="text-blue-500 shrink-0 group-hover:scale-110 transition-transform" />
                <a href="tel:+918810308567" className="text-sm group-hover:text-white transition-colors">+91 8810308567</a>
              </div>
              <div className="flex items-center gap-3 text-gray-300 group sm:col-span-2">
                <FaEnvelope className="text-blue-500 shrink-0 group-hover:scale-110 transition-transform" />
                <a href="mailto:digicrysta@gmail.com" className="text-sm group-hover:text-white transition-colors">digicrysta@gmail.com</a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 pt-4">
              {SITE_CONFIG.socials.map((social, idx) => (
                <motion.a 
                  key={idx}
                  href={social.url}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-400 transition-all duration-300 ${social.color} hover:text-white hover:-translate-y-1`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ==========================
              COLUMN 3: COMPANY LINKS
             ========================== */}
          <motion.div variants={itemUp} className="lg:col-span-1">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
              Company
            </h3>
            <ul className="space-y-3">
              {SITE_CONFIG.companyLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.path} className="group flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-all text-sm">
                    <FaArrowRight className="text-[10px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ==========================
              COLUMN 4: SERVICE LINKS
             ========================== */}
          <motion.div variants={itemUp} className="lg:col-span-1">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
              Services
            </h3>
            <ul className="space-y-3">
              {SITE_CONFIG.serviceLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.path} className="group flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-all text-sm">
                    <FaArrowRight className="text-[10px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

        {/* --- BOTTOM BAR --- */}
        <motion.div variants={itemUp} className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Digi Crysta. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </motion.div>

      </motion.div>
    </footer>
  );
};

export default Footer;