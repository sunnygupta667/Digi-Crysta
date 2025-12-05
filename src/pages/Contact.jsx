import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  Loader2, 
  CheckCircle2, 
  MessageSquare, 
  User, 
  AtSign, 
  Smartphone,
  FileText
} from 'lucide-react';

// ==========================================
// CONFIGURATION DATA
// ==========================================
const CONTACT_INFO = [
  {
    id: 1,
    title: "Visit Us",
    content: "Noida, Uttar Pradesh",
    subContent: "Open 24*7*365",
    icon: <MapPin />,
    color: "bg-blue-500",
    gradient: "from-blue-400 to-blue-600"
  },
  {
    id: 2,
    title: "Call Us",
    content: "+91 8810308567",
    subContent: "Mon-Fri 9am-6pm",
    icon: <Phone />,
    color: "bg-green-500",
    gradient: "from-green-400 to-emerald-600"
  },
  {
    id: 3,
    title: "Email Us",
    content: "digicrysta@gmail.com",
    subContent: "We reply within 24hrs",
    icon: <Mail />,
    color: "bg-purple-500",
    gradient: "from-purple-400 to-indigo-600"
  }
];

// ==========================================
// COMPONENT: 3D TILT CONTACT CARD
// ==========================================
const ContactCard = ({ info, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set((clientX - left) / width - 0.5);
    y.set((clientY - top) / height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="relative w-full max-w-[350px] perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center shadow-xl group overflow-hidden hover:border-white/20 transition-colors"
      >
        {/* Hover Highlight */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${info.gradient} flex items-center justify-center text-white shadow-lg mb-6 transform group-hover:scale-110 transition-transform duration-300`} style={{ transform: "translateZ(20px)" }}>
          {React.cloneElement(info.icon, { className: "w-8 h-8" })}
        </div>
        
        <div style={{ transform: "translateZ(10px)" }}>
          <h3 className="text-xl font-bold text-white mb-2">{info.title}</h3>
          <p className="text-blue-300 font-medium mb-1">{info.content}</p>
          <p className="text-gray-500 text-sm">{info.subContent}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ==========================================
// COMPONENT: FORM INPUT FIELD
// ==========================================
const InputField = ({ icon, placeholder, type = "text", name, value, onChange, required }) => (
  <div className="relative group">
    <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center text-gray-400 group-focus-within:text-cyan-400 transition-colors z-20 pointer-events-none">
      {icon}
    </div>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full bg-[#0a162e]/80 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-gray-200 placeholder-gray-500 focus:outline-none focus:bg-[#0f172a] transition-all duration-300 relative z-10"
    />
    
    {/* Animated Bottom Border Beam */}
    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 group-focus-within:w-full z-20" />
  </div>
);

// ==========================================
// MAIN COMPONENT
// ==========================================
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');

  // --- OPTIMIZED MOUSE SPOTLIGHT LOGIC ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Use clientX/Y relative to container for smoother spotlight
  function handleMouseMove({ clientX, clientY, currentTarget }) {
    const bounds = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - bounds.left);
    mouseY.set(clientY - bounds.top);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    // Simulate Backend API Call
    setTimeout(() => {
      setStatus('success');
      // Reset form after success
      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }, 3000);
    }, 2000);
  };

  return (
    <section 
      className="relative w-full min-h-screen bg-[#021333] overflow-hidden font-sans pt-24 pb-12 group"
      onMouseMove={handleMouseMove}
    >
      
      {/* --- MOUSE FOLLOWING SPOTLIGHT --- */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.1),
              transparent 80%
            )
          `,
        }}
      />

      {/* --- BACKGROUND AMBIENCE --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.05]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        {/* Rotating Ambient Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto rounded-full mb-6"
          />
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-cyan-400 font-bold tracking-widest uppercase text-sm mb-3"
          >
            Get In Touch
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-6"
          >
            Let's Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Conversation</span>
          </motion.h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Ready to start your next project? We are here to help. Reach out to us for any queries or to schedule a consultation.
          </p>
        </div>

        {/* --- CARDS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 place-items-center">
          {CONTACT_INFO.map((info, idx) => (
            <ContactCard key={info.id} info={info} index={idx} />
          ))}
        </div>

        {/* --- FORM SECTION --- */}
        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20">
          
          {/* LEFT: LOCATION VISUAL (Replaced Google Map) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 min-h-[400px] lg:min-h-[500px] relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col justify-center items-center bg-[#0f172a]/60 backdrop-blur-xl group"
          >
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-[#0a162e] to-purple-900/40 opacity-80" />
            
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

            {/* Floating 3D Pin Animation */}
            <motion.div 
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.5)] mb-8"
            >
              <MapPin className="w-16 h-16 text-white" />
              {/* Pulse Rings */}
              <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-[ping_3s_linear_infinite]" />
            </motion.div>

            <div className="relative z-10 text-center px-6">
              <span className="inline-block py-1 px-3 rounded-full bg-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider mb-4 border border-green-500/30">
                Headquarters
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Noida, India
              </h3>
              <p className="text-gray-400 max-w-xs mx-auto">
                Digi Crysta, Uttar Pradesh
              </p>
            </div>
          </motion.div>

          {/* RIGHT: ANIMATED FORM */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 relative"
          >
            {/* Moving Border Gradient */}
            <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 blur-sm animate-border-spin pointer-events-none" />
            
            <div className="bg-[#0a162e]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden h-full">
              
              <h3 className="text-3xl font-bold text-white mb-8 relative z-10">
                Drop Us a Line
                <span className="block h-1 w-12 bg-cyan-500 mt-2 rounded-full" />
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField 
                    icon={<User className="w-5 h-5" />} 
                    placeholder="Your Name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange}
                    required
                  />
                  <InputField 
                    icon={<AtSign className="w-5 h-5" />} 
                    placeholder="Your Email" 
                    name="email" 
                    type="email"
                    value={formData.email} 
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField 
                    icon={<Smartphone className="w-5 h-5" />} 
                    placeholder="Phone Number" 
                    name="phone" 
                    type="tel"
                    value={formData.phone} 
                    onChange={handleChange}
                  />
                  <InputField 
                    icon={<FileText className="w-5 h-5" />} 
                    placeholder="Subject" 
                    name="subject" 
                    value={formData.subject} 
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="relative group">
                  <div className="absolute left-0 top-4 w-12 flex justify-center text-gray-400 group-focus-within:text-cyan-400 transition-colors z-20 pointer-events-none">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell us about your project..."
                    required
                    className="w-full bg-[#0a162e]/80 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-gray-200 placeholder-gray-500 focus:outline-none focus:bg-[#0f172a] transition-all duration-300 resize-none shadow-inner relative z-10"
                  ></textarea>
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 group-focus-within:w-full z-20" />
                </div>

                <motion.button 
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(6,182,212,0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden
                    ${status === 'success' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-gradient-to-r from-cyan-600 to-blue-600'
                    }
                  `}
                >
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                  {status === 'loading' ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle2 className="w-6 h-6" /> Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

      </div>

      {/* --- CUSTOM CSS ANIMATIONS --- */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse-slow {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes border-spin {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-reverse-slow {
          animation: spin-reverse-slow 25s linear infinite;
        }
        .animate-border-spin {
          background-size: 200% 200%;
          animation: border-spin 4s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Contact;