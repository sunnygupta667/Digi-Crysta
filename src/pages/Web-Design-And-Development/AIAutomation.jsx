import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Cpu, 
  FileText, 
  TrendingUp, 
  MessageSquare, 
  BarChart2, 
  Database, 
  Cloud, 
  ShieldCheck, 
  BrainCircuit,
  AlertTriangle,
  Zap,
  Code,
  ArrowRight,
  Plus,
  Minus
} from 'lucide-react';

// ==========================================
// CONFIGURATION DATA
// ==========================================
const SERVICES = [
  {
    id: 1,
    title: "AI Virtual Agents",
    description: "Intelligent chatbots and virtual assistants that handle customer inquiries 24/7 with human-like understanding.",
    icon: <Bot className="w-6 h-6" />,
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    id: 2,
    title: "Software RPA",
    description: "Robotic Process Automation for desktop and browser jobs, eliminating repetitive manual tasks with precision.",
    icon: <Cpu className="w-6 h-6" />,
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    id: 3,
    title: "Document AI",
    description: "Advanced data extraction using OCR and LLMs to turn unstructured documents into structured, actionable data.",
    icon: <FileText className="w-6 h-6" />,
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    id: 4,
    title: "Sales & Marketing",
    description: "Automated routing, sequencing, and lead scoring to supercharge your revenue operations.",
    icon: <TrendingUp className="w-6 h-6" />,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 5,
    title: "Customer Support",
    description: "Smart triage, intent recognition, and real-time agent assist tools to reduce handle times.",
    icon: <MessageSquare className="w-6 h-6" />,
    gradient: "from-pink-500 to-rose-500"
  },
  {
    id: 6,
    title: "Real-time Analytics",
    description: "Data pipelines that provide instant visibility into your operations for faster decision making.",
    icon: <BarChart2 className="w-6 h-6" />,
    gradient: "from-rose-500 to-red-500"
  },
  {
    id: 7,
    title: "System Integration",
    description: "Seamless integration of CRM, ERP, HR, and CX workflows to break down data silos.",
    icon: <Database className="w-6 h-6" />,
    gradient: "from-red-500 to-orange-500"
  },
  {
    id: 8,
    title: "Cloud Automation",
    description: "Automated cloud management and cost systems with strict policy controls and governance.",
    icon: <Cloud className="w-6 h-6" />,
    gradient: "from-orange-500 to-amber-500"
  },
  {
    id: 9,
    title: "Compliance & Security",
    description: "Full audit trails, PII redaction, and automated compliance checks to keep your data safe.",
    icon: <ShieldCheck className="w-6 h-6" />,
    gradient: "from-amber-500 to-yellow-500"
  },
  {
    id: 10,
    title: "Agentic AI Pipelines",
    description: "Autonomous agents capable of calling and supervising tools and APIs to execute complex workflows.",
    icon: <BrainCircuit className="w-6 h-6" />,
    gradient: "from-yellow-500 to-lime-500"
  }
];

const FAQS = [
  {
    question: "Do you construct hardware or actual robots?",
    answer: "No. We exclusively provide software automations. We do not offer robotics or industrial physical automation. We solely use code, best-in-class tools, and APIs to develop intelligent software solutions."
  },
  {
    question: "How do we begin?",
    answer: "We start by mapping your existing procedures to identify bottlenecks. Then, we ship a pilot to demonstrate value. Once the ROI is proven, we scale the solution across your organization."
  }
];

// ==========================================
// COMPONENT: NEURAL DATA MATRIX ANIMATION
// ==========================================
const NeuralMatrix = () => {
  // Generate a grid of nodes
  const nodes = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 2,
  }));

  // Generate connections between nodes
  const connections = nodes.flatMap((node, i) => {
    // Connect to 2 nearest neighbors to form a web, not a mesh
    return nodes.slice(i + 1, i + 3).map((target) => ({
      x1: node.x,
      y1: node.y,
      x2: target.x,
      y2: target.y,
      id: `${node.id}-${target.id}`
    }));
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <svg className="w-full h-full">
        {/* Draw Connections */}
        {connections.map((conn) => (
          <React.Fragment key={conn.id}>
            {/* Static Line */}
            <line 
              x1={`${conn.x1}%`} y1={`${conn.y1}%`} 
              x2={`${conn.x2}%`} y2={`${conn.y2}%`} 
              stroke="rgba(56, 189, 248, 0.2)" 
              strokeWidth="1" 
            />
            {/* Moving Data Packet */}
            <motion.circle
              r="2"
              fill="#38bdf8"
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              transition={{
                duration: Math.random() * 2 + 2,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2
              }}
              style={{
                offsetPath: `path("M ${conn.x1 * window.innerWidth / 100} ${conn.y1 * window.innerHeight / 100} L ${conn.x2 * window.innerWidth / 100} ${conn.y2 * window.innerHeight / 100}")`
              }}
            />
          </React.Fragment>
        ))}

        {/* Draw Nodes */}
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size}
            fill="#0ea5e9"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </svg>
      
      {/* Overlay Gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#021333] via-transparent to-[#021333]" />
    </div>
  );
};

// ==========================================
// COMPONENT: INTERACTIVE SERVICE CARD
// ==========================================
const ServiceCard = ({ item, index }) => {
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
      rgba(56, 189, 248, 0.15), 
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
      className="group relative h-full bg-[#0a162e]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-sky-500/30 transition-all duration-300"
    >
      {/* Spotlight Effect (Cyan/Sky Tint) */}
      <motion.div
        style={{ background: spotlight }}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />

      <div className="relative z-10 p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <span className="text-white drop-shadow-md">{item.icon}</span>
          </div>
          <div className="bg-white/5 p-1.5 rounded-lg border border-white/10 group-hover:border-sky-500/30 transition-colors">
            <Zap className="w-4 h-4 text-slate-400 group-hover:text-sky-400" />
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
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
        <span className="text-lg font-medium text-white group-hover:text-sky-400 transition-colors">
          {faq.question}
        </span>
        <div className={`p-2 rounded-full bg-white/5 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-sky-500/20' : ''}`}>
          {isOpen ? <Minus className="w-4 h-4 text-sky-400" /> : <Plus className="w-4 h-4 text-slate-400" />}
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
const AIAutomation = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#021333] text-slate-100 font-sans selection:bg-sky-500/30 overflow-hidden">
      
      {/* --- BACKGROUND DESIGN --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Radial Dot Texture */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        
        {/* Ambient Tech Lights */}
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-sky-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-indigo-900/10 blur-[120px] rounded-full" />
        
        {/* ANIMATION: Neural Matrix */}
        <NeuralMatrix />
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <BrainCircuit className="w-4 h-4" />
              <span>For American Companies</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              AI Automation <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">
                & Integration
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto"
            >
              Triad Flair creates and incorporates software-based AI automation to eliminate tedious tasks in operations, marketing, sales, and finance. We link your technologies to enable error-free workflows.
            </motion.p>
          </motion.div>
        </section>

        {/* --- IMPORTANT NOTICE BANNER --- */}
        <div className="container mx-auto px-6 max-w-6xl mb-16">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 flex items-start gap-4 backdrop-blur-md">
            <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
            <div>
              <h3 className="text-amber-400 font-bold mb-1">Important Clarification</h3>
              <p className="text-amber-200/80 text-sm leading-relaxed">
                We don't offer robotics or any kind of industrial/physical automation. We exclusively provide <strong>software automations</strong>—solutions implemented using best-in-class tools, APIs, and code.
              </p>
            </div>
          </div>
        </div>

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
                  Linking Your <span className="text-sky-400">Brand & Customers</span>
                </h2>
                <div className="prose prose-invert text-slate-400 text-lg leading-relaxed space-y-6">
                  <p>
                    With intelligent assistants, quick responses, and automated back-office tasks, you can meet clients where they are. Our solutions reduce handle time and increase conversion by deeply integrating with your existing stack.
                  </p>
                  <p>
                    We prioritize measurable results: shorter cycle times, clearer data, fewer manual chores, and transparent dashboards to demonstrate ROI.
                  </p>
                </div>
              </motion.div>

              <div className="relative">
                {/* Abstract Connection Visual */}
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-purple-500/20 blur-3xl rounded-full" />
                <div className="relative bg-[#0a162e] border border-white/10 rounded-2xl p-8 shadow-2xl">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
                        <Database className="w-5 h-5 text-slate-400" />
                      </div>
                      <div className="h-px w-12 bg-slate-700" />
                      <div className="w-12 h-12 bg-sky-600 rounded-full flex items-center justify-center shadow-lg shadow-sky-500/30 animate-pulse">
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                      <div className="h-px w-12 bg-slate-700" />
                      <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
                        <TrendingUp className="w-5 h-5 text-green-400" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-2 w-full bg-slate-800 rounded" />
                    <div className="h-2 w-3/4 bg-slate-800 rounded" />
                    <div className="h-2 w-5/6 bg-slate-800 rounded" />
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/5 flex justify-between text-xs text-slate-500">
                    <span>Status: Optimized</span>
                    <span className="text-green-400">+45% Efficiency</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SERVICES GRID --- */}
        <section className="py-20 px-6 bg-slate-900/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-sky-400 font-bold text-sm tracking-wider uppercase mb-2 block">Project Prerequisites</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Our Capabilities</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {SERVICES.map((item, idx) => (
                <ServiceCard key={item.id} item={item} index={idx} />
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
            <div className="bg-gradient-to-r from-sky-900/40 to-indigo-900/40 border border-sky-500/20 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-indigo-500/10" />
              
              <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Ready to Scale?</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                 After mapping your procedures and shipping a pilot, we scale what shows a return on investment. Start your automation journey today.
              </p>
              <button className="relative z-10 px-8 py-4 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
                <Code className="w-5 h-5" />
                Map Your Process
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AIAutomation;