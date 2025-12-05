import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Smartphone, 
  Slack, 
  Brain, 
  Workflow, 
  BarChart2, 
  Headphones, 
  Webhook, 
  Globe, 
  MessageCircle,
  Bot,
  Zap,
  Plus,
  Minus,
  ArrowRight
} from 'lucide-react';

// ==========================================
// CONFIGURATION DATA
// ==========================================
const CAPABILITIES = [
  {
    id: 1,
    title: "Web Chat Widgets",
    description: "React-ready widgets that embed seamlessly into your site, providing instant support and lead capture.",
    icon: <MessageSquare className="w-6 h-6" />,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    title: "WhatsApp Business Bots",
    description: "Automate communication on the world's most popular messaging app using the official Business API.",
    icon: <Smartphone className="w-6 h-6" />,
    gradient: "from-green-500 to-emerald-600"
  },
  {
    id: 3,
    title: "Messenger Automation",
    description: "Engage customers where they hang out. Facebook Messenger bots for marketing, support, and sales.",
    icon: <MessageCircle className="w-6 h-6" />,
    gradient: "from-blue-600 to-indigo-600"
  },
  {
    id: 4,
    title: "Slack Assistants",
    description: "Internal bots that streamline HR requests, IT ticketing, and team workflows directly within Slack.",
    icon: <Slack className="w-6 h-6" />,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 5,
    title: "NLP & NLU Engine",
    description: "Advanced understanding of Intents, Entities, and Context to have natural, non-robotic conversations.",
    icon: <Brain className="w-6 h-6" />,
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    id: 6,
    title: "Deep Integrations",
    description: "Connect with HubSpot, Zendesk, Intercom, and Salesforce to update records and trigger workflows in real-time.",
    icon: <Workflow className="w-6 h-6" />,
    gradient: "from-red-500 to-orange-600"
  },
  {
    id: 7,
    title: "Analytics & A/B Testing",
    description: "Measure sentiment, handle time, and conversion rates. Test different conversation flows to optimize results.",
    icon: <BarChart2 className="w-6 h-6" />,
    gradient: "from-indigo-500 to-violet-500"
  },
  {
    id: 8,
    title: "Live Agent Handoff",
    description: "Seamlessly transfer conversations to human agents with full transcript context when complex issues arise.",
    icon: <Headphones className="w-6 h-6" />,
    gradient: "from-pink-500 to-rose-500"
  },
  {
    id: 9,
    title: "Webhooks & Actions",
    description: "Secure API connections that allow your bot to perform actions like booking meetings or checking order status.",
    icon: <Webhook className="w-6 h-6" />,
    gradient: "from-cyan-500 to-teal-500"
  },
  {
    id: 10,
    title: "Multilingual Support",
    description: "Scale globally with bots that speak your customers' language, complete with tone and cultural nuance controls.",
    icon: <Globe className="w-6 h-6" />,
    gradient: "from-teal-500 to-green-500"
  }
];

const FAQS = [
  {
    question: "Which channels are available?",
    answer: "We support Slack, Web (React/HTML), WhatsApp, and Facebook Messenger by default. Bespoke channels and SMS integration are available upon request."
  },
  {
    question: "Is it able to transfer to a human?",
    answer: "Yes. We implement native handoff protocols. When a user requests a human or the bot detects frustration, the chat is transferred to an agent with the complete conversation history."
  }
];

// ==========================================
// COMPONENT: CONVERSATIONAL PULSE WAVE ANIMATION
// ==========================================
const PulseWave = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      {/* Central Waveform Lines */}
      <div className="absolute top-1/2 left-0 w-full flex items-center justify-center gap-1 h-32 -translate-y-1/2">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-1 bg-cyan-500/20 rounded-full"
            animate={{ 
              height: [20, Math.random() * 100 + 20, 20],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.05
            }}
          />
        ))}
      </div>

      {/* Floating Chat Bubbles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "110vh", opacity: 0, scale: 0 }}
          animate={{ 
            y: "-10vh", 
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5],
            x: Math.sin(i) * 50 // Gentle sway
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5
          }}
          className="absolute"
          style={{ left: `${Math.random() * 100}%` }}
        >
          <div className={`p-2 rounded-lg rounded-bl-none ${i % 2 === 0 ? 'bg-cyan-500/20 text-cyan-300' : 'bg-blue-500/20 text-blue-300'} backdrop-blur-sm border border-white/10`}>
            {i % 2 === 0 ? <MessageSquare className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
          </div>
        </motion.div>
      ))}
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#021333] via-transparent to-[#021333]" />
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
      rgba(6, 182, 212, 0.15), 
      transparent 80%
    )
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      className="group relative h-full bg-[#0a162e]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300"
    >
      {/* Spotlight Effect (Cyan Tint) */}
      <motion.div
        style={{ background: spotlight }}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />

      <div className="relative z-10 p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <span className="text-white drop-shadow-md">{item.icon}</span>
          </div>
          <div className="bg-white/5 p-1.5 rounded-lg border border-white/10 group-hover:border-cyan-500/30 transition-colors">
            <Bot className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
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
// COMPONENT: FAQ ACCORDION
// ==========================================
const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-6 text-left focus:outline-none"
      >
        <span className="text-lg font-medium text-white group-hover:text-cyan-400 transition-colors">
          {faq.question}
        </span>
        <div className={`p-2 rounded-full bg-white/5 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-cyan-500/20' : ''}`}>
          {isOpen ? <Minus className="w-4 h-4 text-cyan-400" /> : <Plus className="w-4 h-4 text-slate-400" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-slate-400 leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
const ChatbotDevelopment = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#021333] text-slate-100 font-sans selection:bg-cyan-500/30 overflow-hidden">
      
      {/* --- BACKGROUND DESIGN --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Radial Dot Texture */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        
        {/* Ambient Bot Lights */}
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full" />
        
        {/* ANIMATION: Pulse Wave */}
        <PulseWave />
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <Bot className="w-4 h-4" />
              <span>Multi-Channel AI Assistants</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              Chatbot <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Development
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto"
            >
              We create and implement AI-powered chatbots for the web, WhatsApp, Messenger, and Slack. Respond to inquiries, qualify leads, and initiate back-office processes around-the-clock.
            </motion.p>
          </motion.div>
        </section>

        {/* --- APPROACH SECTION --- */}
        <section className="py-12 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-white mb-6">
                  Implementation <span className="text-cyan-400">Approach</span>
                </h2>
                <div className="prose prose-invert text-slate-400 text-lg leading-relaxed space-y-6">
                  <p>
                    After defining intentions and success criteria and mapping high-value discussions, we swiftly prototype. We engage in a cycle of continuous improvement, enhancing containment and customer satisfaction by iterating on real chat data after launch.
                  </p>
                  <p>
                    Our bots link to your CRM, support desk, and marketing systems for end-to-end processes using NLP/NLU to comprehend intent accurately.
                  </p>
                </div>
              </motion.div>

              <div className="relative">
                {/* Abstract Chat Visual */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 blur-3xl rounded-full" />
                <div className="relative bg-[#0a162e] border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden">
                  
                  {/* Chat Interface Mockup */}
                  <div className="space-y-4">
                    {/* Bot Message */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-white shrink-0">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-slate-800 rounded-2xl rounded-tl-none p-3 max-w-[80%] border border-slate-700">
                        <div className="h-2 w-48 bg-slate-600 rounded mb-2" />
                        <div className="h-2 w-32 bg-slate-600 rounded" />
                      </div>
                    </div>

                    {/* User Message */}
                    <div className="flex gap-3 flex-row-reverse">
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-400 shrink-0">
                        <div className="w-4 h-4 bg-slate-500 rounded-full" />
                      </div>
                      <div className="bg-blue-600/20 rounded-2xl rounded-tr-none p-3 max-w-[80%] border border-blue-500/30">
                        <div className="h-2 w-40 bg-blue-400/50 rounded" />
                      </div>
                    </div>

                    {/* Processing Indicator */}
                    <div className="flex gap-2 ml-11">
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }} 
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="w-2 h-2 bg-cyan-500 rounded-full" 
                      />
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }} 
                        transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                        className="w-2 h-2 bg-cyan-500 rounded-full" 
                      />
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }} 
                        transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                        className="w-2 h-2 bg-cyan-500 rounded-full" 
                      />
                    </div>
                  </div>

                  {/* Integration Badges */}
                  <div className="mt-8 pt-6 border-t border-white/5 flex gap-4 overflow-hidden">
                    {["HubSpot", "Zendesk", "Salesforce", "Slack"].map((tool, i) => (
                      <div key={i} className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-slate-400 border border-white/5">
                        {tool}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- CAPABILITIES GRID --- */}
        <section className="py-20 px-6 bg-slate-900/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-cyan-400 font-bold text-sm tracking-wider uppercase mb-2 block">What We Build</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Bot Capabilities</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {CAPABILITIES.map((item, idx) => (
                <FeatureCard key={item.id} item={item} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* --- FAQ SECTION --- */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Frequently Asked Questions</h2>
            <div className="bg-[#0a162e] rounded-2xl border border-white/10 p-8">
              {FAQS.map((faq, idx) => (
                <FAQItem key={idx} faq={faq} />
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500/20 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10" />
              
              <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Automate Your Growth</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                 Concentrate on quantifiable results like improved satisfaction and decreased handle time. Start building your 24/7 assistant today.
              </p>
              <button className="relative z-10 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
                <MessageSquare className="w-5 h-5" />
                Start Chatbot Project
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ChatbotDevelopment;