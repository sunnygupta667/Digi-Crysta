import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaCloud, 
  FaMapMarkerAlt, 
  FaPhoneVolume, 
  FaTwitter, 
  FaFacebookF, 
  FaLinkedinIn, 
  FaYoutube, 
  FaPinterestP 
} from 'react-icons/fa';

import footerHero from "../assets/images/footerHero2.jpg"; // ✅ MOVE HERE
import cloud from "../assets/images/cloud.png"; // ✅ MOVE HERE



// ==========================================
// CONFIGURATION: EDIT LINKS & PATHS HERE
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
    { name: "Website Designing Development", path: "/website-designing-development" },
    { name: "Mobile App Development", path: "/mobile-app-development" },
    { name: "PPC Bing", path: "/ppc-bing" },
    { name: "Search Engine Optimization", path: "/search-engine-optimization" },
    { name: "Facebook Advertising", path: "/facebook-advertising" },
  ],
  socials: [
    { icon: <FaTwitter />, url: "https://twitter.com", label: "Twitter" },
    { icon: <FaFacebookF />, url: "https://facebook.com", label: "Facebook" },
    { icon: <FaLinkedinIn />, url: "https://linkedin.com", label: "LinkedIn" },
    { icon: <FaYoutube />, url: "https://youtube.com", label: "YouTube" },
    { icon: <FaPinterestP />, url: "https://pinterest.com", label: "Pinterest" },
  ]
};

// ==========================================
// ANIMATION VARIANTS
// ==========================================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1, duration: 0.8 } 
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

const linkHover = {
  x: 5,
  color: "#ffffff",
  transition: { type: "spring", stiffness: 300 }
};

const socialHover = {
  y: -3,
  rotate: 360,
  backgroundColor: "#0047ab",
  borderColor: "#0047ab",
  color: "#fff",
  transition: { duration: 0.4 }
};

const Footer = () => {
  return (
    <footer className="relative bg-[#021333] text-white pt-20 pb-10 overflow-hidden font-sans">
      
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-top bg-no-repeat opacity-100"
          style={{ backgroundImage: `url('${SITE_CONFIG.background}')` }}
        />
        {/* Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#062863]/95 to-[#021333]/95" />
      </div>

      <motion.div 
        className="relative z-10 container mx-auto px-6 lg:px-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        
        {/* --- Header Section (Logo & Contact) --- */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={cloud} alt="Cloud Logo" className="w-10 h-10" />
            <div>
              <h2 className="text-2xl font-bold tracking-wide">Digi Crysta</h2>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row gap-8 text-[#b3c0d9]">
            <div className="flex items-start gap-4 group">
              <div className="mt-1 p-3 rounded-full border border-white/10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                <FaMapMarkerAlt />
              </div>
              <div>
                <span className="block text-white font-medium">Noida</span>
                <span>Uttar Pradesh</span>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="mt-1 p-3 rounded-full border border-white/10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                <FaPhoneVolume />
              </div>
              <div className="flex flex-col">
                <a href="tel:+918810308567" className="hover:text-white transition-colors">+91 8810308567 ( Toll free )</a>
                <a href="mailto:digicrysta@gmail.com" className="hover:text-white transition-colors">digicrysta@gmail.com</a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.hr variants={itemVariants} className="border-white/10 mb-12" />

        {/* --- Main Grid Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          
          {/* Column 1: Company */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-6 relative inline-block">
              Company
              <span className="absolute left-0 -bottom-2 w-8 h-1 bg-blue-600 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {SITE_CONFIG.companyLinks.map((link, idx) => (
                <li key={idx}>
                  <motion.a 
                    href={link.path} 
                    className="text-[#b3c0d9] inline-block"
                    whileHover={linkHover}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 2: Services */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-6 relative inline-block">
              Services
              <span className="absolute left-0 -bottom-2 w-8 h-1 bg-blue-600 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {SITE_CONFIG.serviceLinks.map((link, idx) => (
                <li key={idx}>
                  <motion.a 
                    href={link.path} 
                    className="text-[#b3c0d9] inline-block"
                    whileHover={linkHover}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Quick Enquiry */}
          <motion.div variants={itemVariants} className="lg:justify-self-end w-full max-w-sm">
            <h3 className="text-xl font-semibold mb-6 relative inline-block">
              Quick Enquiry
              <span className="absolute left-0 -bottom-2 w-8 h-1 bg-blue-600 rounded-full"></span>
            </h3>
            <form className="space-y-4">
              <motion.div whileFocus={{ scale: 1.02 }}>
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="w-full bg-[#052c65]/80 border border-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-[#021333] transition-colors placeholder-gray-400"
                  required
                />
              </motion.div>
              <motion.div whileFocus={{ scale: 1.02 }}>
                <input 
                  type="tel" 
                  placeholder="Phone" 
                  className="w-full bg-[#052c65]/80 border border-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-[#021333] transition-colors placeholder-gray-400"
                  required
                />
              </motion.div>
              <motion.div whileFocus={{ scale: 1.02 }}>
                <textarea 
                  placeholder="Message" 
                  rows="3" 
                  className="w-full bg-[#052c65]/80 border border-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-[#021333] transition-colors resize-none placeholder-gray-400"
                  required
                ></textarea>
              </motion.div>
              <motion.button 
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: "0px 5px 15px rgba(0, 71, 171, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-[#0047ab] text-white text-sm font-medium uppercase tracking-wider rounded hover:bg-blue-700 transition-colors w-auto"
              >
                Submit now
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* --- Bottom Section --- */}
        <motion.div 
          variants={itemVariants}
          className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-sm text-[#b3c0d9]">Copyright © 2019, All Right Reserved</p>
          
          <div className="flex gap-3">
            {SITE_CONFIG.socials.map((social, idx) => (
              <motion.a 
                key={idx}
                href={social.url}
                aria-label={social.label}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 text-[#b3c0d9]"
                whileHover={socialHover}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </footer>
  );
};

export default Footer;