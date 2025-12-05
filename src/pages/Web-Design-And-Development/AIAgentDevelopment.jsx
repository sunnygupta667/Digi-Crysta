import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Brain, 
  Workflow, 
  Database, 
  ShieldAlert, 
  Activity, 
  Terminal, 
  Layers, 
  UserCheck, 
  Server, 
  Code,
  Zap,
  Plus,
  Minus,
  CheckCircle2
} from 'lucide-react';

// ==========================================
// CONFIGURATION DATA
// ==========================================
const CAPABILITIES = [
  {
    id: 1,
    title: "Self-Governing Agents",
    description: "Memory-based planners and executors that act autonomously to solve complex problems without constant human oversight.",
    icon: <Bot className="w-6 h-6" />,
    gradient: "from-cyan-500 to-teal-500"
  },
  {
    id: 2,
    title: "RAG Knowledge Base",
    description: "Retrieval-Augmented Generation using vector search, file search, and structured retrieval to ground agents in your specific data.",
    icon: <Database className="w-6 h-6" />,
    gradient: "from-teal-500 to-green-500"
  },
  {
    id: 3,
    title: "Tool Use & Function Calling",
    description: "Agents empowered to interact with external apps and APIs, performing actions rather than just generating text.",
    icon: <Terminal className="w-6 h-6" />,
    gradient: "from-green-500 to-emerald-600"
  },
  {
    id: 4,
    title: "Multi-Agent Orchestration",
    description: "Coordination of specialized agents to handle intricate, multi-step processes efficiently and accurately.",
    icon: <Layers className="w-6 h-6" />,
    gradient: "from-emerald-500 to-lime-500"
  },
  {
    id: 5,
    title: "System Integrations",
    description: "Deep connections between CRM, ERP, and help desks (HubSpot, Zendesk, Salesforce) to unify your operational stack.",
    icon: <Workflow className="w-6 h-6" />,
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    id: 6,
    title: "Monitoring & Analytics",
    description: "Comprehensive dashboards, warnings, and SLA tracking to ensure agent performance meets business standards.",
    icon: <Activity className="w-6 h-6" />,
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    id: 7,
    title: "Security & Guardrails",
    description: "Strict audit trails, PII redaction, and Role-Based Access Control (RBAC) to ensure safe and compliant operations.",
    icon: <ShieldAlert className="w-6 h-6" />,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 8,
    title: "Human-in-the-Loop",
    description: "Seamless handoff protocols for critical evaluation and authorization, keeping humans in control of sensitive actions.",
    icon: <UserCheck className="w-6 h-6" />,
    gradient: "from-pink-500 to-rose-500"
  },
  {
    id: 9,
    title: "Performance Tuning",
    description: "Continuous optimization of latency, cost, and dependability to maximize ROI and agent efficiency.",
    icon: <Zap className="w-6 h-6" />,
    gradient: "from-rose-500 to-red-500"
  },
  {
    id: 10,
    title: "Secure Deployment",
    description: "Enterprise-grade deployment on trusted platforms like Vercel, AWS, and Azure for scalability and reliability.",
    icon: <Server className="w-6 h-6" />,
    gradient: "from-orange-500 to-yellow-500"
  }
];

const FAQS = [
  {
    question: "Do these agents take the place of our instruments?",
    answer: "No. In order to minimize manual labor, agents connect and coordinate your current tools and data, acting as a force multiplier for your existing stack rather than a replacement."
  },
  {
    question: "How do you make sure everyone is safe?",
    answer: "Granular permissions, logging, restrictions, and review procedures are implemented at the core level. Explicit approval is needed for sensitive actions, ensuring a 'Human-in-the-Loop' for critical decisions."
  }
];

// ==========================================
// COMPONENT: COGNITIVE AGENT NETWORK ANIMATION
// ==========================================
const AgentNetwork = () => {
  // Simulating "Task Nodes" (Static)
  const taskNodes = [
    { x: 20, y: 30 }, { x: 80, y: 20 }, 
    { x: 50, y: 50 }, 
    { x: 20, y: 80 }, { x: 80, y: 70 }
  ];

  // Simulating "Agents" moving between nodes
  const agents = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    path: i % 2 === 0 ? [0, 2, 4, 2, 0] : [1, 2, 3, 2, 1], // Simple path logic
    delay: i * 1.5,
    duration: 15
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <svg className="w-full h-full">
        {/* Draw Connections between Task Nodes */}
        <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="rgba(20, 184, 166, 0.1)" strokeWidth="1" />
        <line x1="80%" y1="20%" x2="50%" y2="50%" stroke="rgba(20, 184, 166, 0.1)" strokeWidth="1" />
        <line x1="20%" y1="80%" x2="50%" y2="50%" stroke="rgba(20, 184, 166, 0.1)" strokeWidth="1" />
        <line x1="80%" y1="70%" x2="50%" y2="50%" stroke="rgba(20, 184, 166, 0.1)" strokeWidth="1" />

        {/* Static Task Nodes */}
        {taskNodes.map((node, i) => (
          <circle 
            key={i} 
            cx={`${node.x}%`} cy={`${node.y}%`} r="4" 
            fill="rgba(20, 184, 166, 0.2)" 
            stroke="rgba(20, 184, 166, 0.5)"
          />
        ))}

        {/* Autonomous Agents Moving */}
        {agents.map((agent) => (
          <motion.circle
            key={agent.id}
            r="3"
            fill="#2dd4bf" // Teal color
            initial={{ opacity: 0 }}
            animate={{ 
              cx: agent.path.map(idx => `${taskNodes[idx].x}%`),
              cy: agent.path.map(idx => `${taskNodes[idx].y}%`),
              opacity: [0, 1, 1, 1, 0]
            }}
            transition={{
              duration: agent.duration,
              repeat: Infinity,
              ease: "linear",
              delay: agent.delay,
              times: [0, 0.25, 0.5, 0.75, 1]
            }}
          >
             {/* Glowing aura for agent */}
             <title>AI Agent</title>
          </motion.circle>
        ))}
      </svg>
      
      {/* Scanning Radar Effect */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[600px] md:h-[600px] bg-gradient-to-tr from-transparent via-teal-500/5 to-transparent rounded-full"
      />
    </div>
  );
};

// ==========================================
// COMPONENT: INTERACTIVE CAPABILITY CARD
// ==========================================
const CapabilityCard = ({ item, index }) => {
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
      rgba(45, 212, 191, 0.15), 
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
      className="group relative h-full bg-[#0a162e]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-teal-500/30 transition-all duration-300"
    >
      {/* Spotlight Effect (Teal Tint) */}
      <motion.div
        style={{ background: spotlight }}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />

      <div className="relative z-10 p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <span className="text-white drop-shadow-md">{item.icon}</span>
          </div>
          <div className="bg-white/5 p-1.5 rounded-lg border border-white/10 group-hover:border-teal-500/30 transition-colors">
            <Brain className="w-4 h-4 text-slate-400 group-hover:text-teal-400" />
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">
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
        <span className="text-lg font-medium text-white group-hover:text-teal-400 transition-colors">
          {faq.question}
        </span>
        <div className={`p-2 rounded-full bg-white/5 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-teal-500/20' : ''}`}>
          {isOpen ? <Minus className="w-4 h-4 text-teal-400" /> : <Plus className="w-4 h-4 text-slate-400" />}
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
const AIAgentDevelopment = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#021333] text-slate-100 font-sans selection:bg-teal-500/30 overflow-hidden">
      
      {/* --- BACKGROUND DESIGN --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Radial Dot Texture */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        
        {/* Ambient Cognitive Lights */}
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-teal-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full" />
        
        {/* ANIMATION: Cognitive Agent Network */}
        <AgentNetwork />
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <Bot className="w-4 h-4" />
              <span>Autonomous & Agentic Workflows</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              AI Agent <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
                Development
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto"
            >
              Custom AI agents that plan, call tools, and complete multi-step operations throughout your stack. Production-ready automations that increase speed, accuracy, and enforce guardrails.
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
                  Bridge Your Systems with <span className="text-teal-400">Agentic Workflows</span>
                </h2>
                <div className="prose prose-invert text-slate-400 text-lg leading-relaxed space-y-6">
                  <p>
                    Agents coordinate tasks, learn from context, and delegate to humans as necessary for anything from lead qualifying and ticket triage to data sync and report production.
                  </p>
                  <p>
                    Our method combines strong engineering (observability, audit logs, RBAC) with agentic AI patterns like tool use, memory, and planning. We enable safe scaling and ROI measurement, providing well-known frameworks to meet your stack and compliance requirements.
                  </p>
                </div>
              </motion.div>

              <div className="relative">
                {/* Abstract Logic Visual */}
                <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 to-blue-500/20 blur-3xl rounded-full" />
                <div className="relative bg-[#0a162e] border border-white/10 rounded-2xl p-8 shadow-2xl">
                  {/* Mock Workflow UI */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm text-slate-400 mb-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      Agent Status: <strong>Active & Planning</strong>
                    </div>
                    
                    {/* Step 1 */}
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center border border-teal-500/50">
                          <span className="text-xs text-teal-400">1</span>
                        </div>
                        <div className="w-0.5 h-full bg-slate-700 my-1" />
                      </div>
                      <div className="pb-6">
                        <h4 className="text-white font-medium text-sm">Analyze Request</h4>
                        <p className="text-xs text-slate-500 mt-1">Parsing intent via LLM & retrieving context from RAG.</p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/50">
                          <span className="text-xs text-blue-400">2</span>
                        </div>
                        <div className="w-0.5 h-full bg-slate-700 my-1" />
                      </div>
                      <div className="pb-6">
                        <h4 className="text-white font-medium text-sm">Execute Tools</h4>
                        <div className="flex gap-2 mt-2">
                          <span className="px-2 py-1 bg-slate-800 rounded text-[10px] text-slate-300 border border-slate-700">CRM API</span>
                          <span className="px-2 py-1 bg-slate-800 rounded text-[10px] text-slate-300 border border-slate-700">Email Service</span>
                        </div>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/50">
                          <span className="text-xs text-purple-400">3</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">Verify & Report</h4>
                        <p className="text-xs text-slate-500 mt-1">Human-in-the-loop validation if confidence &lt; 90%.</p>
                      </div>
                    </div>

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
              <span className="text-teal-400 font-bold text-sm tracking-wider uppercase mb-2 block">Project Requirements</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Technical Capabilities</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {CAPABILITIES.map((item, idx) => (
                <CapabilityCard key={item.id} item={item} index={idx} />
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
            <div className="bg-gradient-to-r from-teal-900/40 to-blue-900/40 border border-teal-500/20 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10" />
              
              <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Deploy Intelligent Agents</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                 Anticipate clear analytics, seamless integrations, and quick iteration cycles. Let us build the workforce of your future.
              </p>
              <button className="relative z-10 px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
                <Bot className="w-5 h-5" />
                Build Your Agent
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AIAgentDevelopment;