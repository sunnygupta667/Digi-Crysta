import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';

import cloud from "../assets/images/cloud.png"; 

// ==========================================
// NAVIGATION DATA STRUCTURE
// ==========================================
const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { 
    name: 'Services', 
    href: '#', 
    type: 'nested', 
    dropdown: [
      {
        name: 'Paid Marketing',
        href: '#',
        dropdown: [
          { name: 'Bing Advertising', href: '/bing-advertising' },
          { name: 'Brand Marketing Services', href: '/brand-marketing-services' },
          { name: 'Email Marketing', href: '/email-marketing' },
          { name: 'Influencer Marketing', href: '/influencer-marketing' },
          { name: 'PPC Bing', href: '/ppc-bing' },
          { name: 'PPC Google', href: '/ppc-google' },
          { name: 'Quora Marketing', href: '/quora-marketing' },
          { name: 'Search Engine Marketing & Paid Marketing', href: '/search-engine-and-paid-marketing' },
          ]
      },
      {
        name: 'Digital Marketing',
        href: '#',
        dropdown: [
          { name: 'Search Engine Optimization', href: '/search-engine-optimization' },
          { name: 'Grey Hat SEO', href: '/grey-hat-seo' },
          { name: 'White Hat SEO', href: '/white-hat-seo' },
          { name: 'Black Hat SEO', href: '/black-hat-seo' },
          
        ]
      },
      {
        name: 'Social Media Marketing',
        href: '#',
        dropdown: [
          { name: 'Facebook Advertising', href: '/facebook-advertising' },
          { name: 'Instagram Marketing', href: '/instagram-marketing' },
          { name: 'LinkedIn Marketing', href: '/linkedin-marketing' },
          { name: 'Pinterest Marketing', href: '/pinterest-marketing' },
          { name: 'Social Media Optimization', href: '/social-media-optimization' },
          { name: 'Twitter Marketing', href: '/twitter-marketing' },
          { name: 'YouTube Paid Marketing', href: '/youtube-paid-marketing' }
        ]
      },
      {
        name: 'Web Design & Development',
        href: '#',
        dropdown: [
          { name: 'Website Designing Development', href: '/website-designing-development' },
          { name: 'Mobile App Development', href: '/mobile-app-development' },
          { name: 'Logo Designing', href: '/logo-designing' },
          { name: 'Ecommerce development', href: '/ecommerce-development' },
          { name: 'Flyer Design', href: '/flyer-design' },
          { name: 'Brochure Designing', href: '/brochure-designing' },
          { name: 'Chatbot Development', href: '/chatbot-development' },
          { name: 'AI Agent Development', href: '/ai-agent-development' },
          {name: 'AI Automation', href: '/ai-automation' }
        ]
      }
    ] 
  },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Blogs', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

// ==========================================
// ANIMATION VARIANTS
// ==========================================
const dropdownVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.95, pointerEvents: 'none' },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    pointerEvents: 'auto',
    transition: { duration: 0.2, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    y: 10, 
    scale: 0.95, 
    pointerEvents: 'none',
    transition: { duration: 0.15, ease: "easeIn" }
  }
};

const subMenuVariants = {
  hidden: { opacity: 0, x: -10, pointerEvents: 'none' },
  visible: { 
    opacity: 1, 
    x: 0, 
    pointerEvents: 'auto',
    transition: { duration: 0.2, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    x: -10, 
    pointerEvents: 'none',
    transition: { duration: 0.15, ease: "easeIn" }
  }
};

// ==========================================
// DESKTOP DROPDOWN ITEM COMPONENT
// ==========================================
const DesktopDropdownItem = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasSubmenu = item.dropdown && item.dropdown.length > 0;

  return (
    <div 
      className="relative group/item w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a 
        href={item.href}
        className="flex items-center justify-between px-4 py-3 text-[13px] text-gray-300 hover:text-white hover:bg-white/10 transition-colors w-full rounded-md"
      >
        <span className="truncate">{item.name}</span>
        {hasSubmenu && <ChevronRight className="w-3.5 h-3.5 text-gray-500 group-hover/item:text-white ml-2 flex-shrink-0" />}
      </a>

      {/* NESTED SUBMENU (Flyout to Right) */}
      <AnimatePresence>
        {hasSubmenu && isHovered && (
          <motion.div
            variants={subMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute left-full top-0 w-72 pl-1 z-50"
          >
            <div className="bg-[#0f172a] border border-white/10 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl overflow-hidden py-2">
              {item.dropdown.map((subItem, idx) => (
                <a 
                  key={idx}
                  href={subItem.href}
                  className="block px-4 py-2.5 text-[13px] text-gray-400 hover:text-white hover:bg-white/10 transition-colors border-l-2 border-transparent hover:border-blue-500"
                >
                  {subItem.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ==========================================
// MOBILE MENU ITEM COMPONENT
// ==========================================
const MobileMenuItem = ({ item, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubmenu = item.dropdown && item.dropdown.length > 0;

  return (
    <div className="border-b border-white/5 last:border-0 w-full">
      <div 
        className="flex items-center justify-between py-3 pr-2 w-full"
        style={{ paddingLeft: `${depth * 16}px` }}
        onClick={(e) => {
          if (hasSubmenu) {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <a 
          href={item.href} 
          className={`text-base ${depth === 0 ? 'font-medium text-white' : 'text-sm text-gray-300'} flex-1 hover:text-blue-400 transition-colors`}
        >
          {item.name}
        </a>
        {hasSubmenu && (
          <button 
            className="p-2 active:bg-white/10 rounded-full transition-colors focus:outline-none"
          >
            <ChevronDown 
              className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-400' : ''}`} 
            />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && hasSubmenu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden bg-[#0a162e]"
          >
            {item.dropdown.map((subItem, idx) => (
              <MobileMenuItem key={idx} item={subItem} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ==========================================
// MAIN NAVBAR COMPONENT
// ==========================================
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDesktopMenu, setActiveDesktopMenu] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-sans
        ${scrolled ? 'bg-[#021333]/95 backdrop-blur-md py-3 shadow-2xl border-b border-white/10' : 'bg-transparent py-5'}
      `}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-[1440px] flex items-center justify-between">
        
        {/* LOGO (LEFT SIDE) */}
        <div className="flex items-center gap-3 group cursor-pointer z-50">
          <img src={cloud} alt="cloud-logo" className="w-12 h-12" />
          <div className="leading-tight">
            <h1 className="text-xl font-extrabold text-white tracking-wide font-sans">DIGI</h1>
            <span className="text-[10px] text-blue-400 uppercase tracking-[0.2em] font-bold block -mt-1">CRYSTA</span>
          </div>
        </div>

        {/* DESKTOP MENU (RIGHT SIDE) */}
        {/* justify-between on parent pushes this to the far right since CTA was removed */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-6">
          {NAV_LINKS.map((link) => (
            <div 
              key={link.name} 
              className="relative group h-full flex items-center"
              onMouseEnter={() => setActiveDesktopMenu(link.name)}
              onMouseLeave={() => setActiveDesktopMenu(null)}
            >
              <a 
                href={link.href} 
                className={`flex items-center gap-1 text-[13px] xl:text-sm font-semibold tracking-wide transition-all px-3 py-2 rounded-lg
                  ${activeDesktopMenu === link.name ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/5'}
                `}
              >
                {link.name.toUpperCase()}
                {link.dropdown && <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDesktopMenu === link.name ? 'rotate-180' : ''}`} />}
              </a>

              {/* LEVEL 1 DROPDOWN */}
              <AnimatePresence>
                {link.dropdown && activeDesktopMenu === link.name && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    // Changed positioning to right-0 to prevent dropdown from going off-screen on smaller desktop screens
                    // but kept left-0 for standard flow if space permits.
                    // Given the request to move links to the right, 'right-0' is often safer, 
                    // but 'left-0' aligns with the specific link text. Keeping left-0 as per original style.
                    className={`absolute top-full right-0 lg:left-auto lg:right-0 xl:left-0 xl:right-auto pt-4 w-72
                      ${link.type === 'nested' ? 'overflow-visible' : 'overflow-hidden'}
                    `}
                  >
                    {/* Invisible bridge */}
                    <div className="absolute -top-4 left-0 w-full h-4 bg-transparent" />
                    
                    <div 
                      className={`
                        bg-[#0f172a]/95 border border-white/10 rounded-xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl py-2
                        ${link.type === 'scrollable' ? 'max-h-[70vh] overflow-y-auto custom-scrollbar' : 'overflow-visible'}
                      `}
                    >
                      {link.dropdown.map((item, idx) => (
                        <DesktopDropdownItem key={idx} item={item} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* MOBILE MENU TOGGLE (Visible only on small screens) */}
        <button 
          className="lg:hidden text-white p-2 z-50 relative rounded-full hover:bg-white/10 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-[#021333] z-40 flex flex-col pt-28 px-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-2 pb-20">
              {NAV_LINKS.map((link, idx) => (
                <MobileMenuItem key={idx} item={link} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;