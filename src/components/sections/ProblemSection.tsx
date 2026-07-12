"use client";
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldAlert, FileWarning, EyeOff, ServerCrash, Users, Network } from 'lucide-react';

const problems = [
  { icon: ShieldAlert, title: "Fragmented Security", stat: "74%", desc: "Organizations struggle with siloed security tools." },
  { icon: FileWarning, title: "Compliance Chaos", stat: "82%", desc: "Manual audits lead to compliance failures." },
  { icon: EyeOff, title: "Blind Spots", stat: "65%", desc: "Undiscovered assets remain unprotected." },
  { icon: ServerCrash, title: "Incident Delay", stat: "277", desc: "Average days to identify a data breach." },
  { icon: Users, title: "Vendor Risk", stat: "61%", desc: "Breaches originate from third-party vendors." },
  { icon: Network, title: "Policy Drift", stat: "89%", desc: "Policies become outdated without automation." },
];

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={sectionRef} 
      id="problem"
      className="relative min-h-screen py-32 px-6 md:px-16 overflow-hidden z-10"
    >
      <motion.div style={{ scale, opacity }} className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            The Industry is <span className="text-danger">Broken.</span>
          </h2>
          <p className="text-xl opacity-70 max-w-2xl mx-auto">
            Traditional GRC and Security tools are disconnected, slow, and reactive. You need a unified brain.
          </p>
        </div>

        <div className="relative">
          {/* Connection Lines (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 hidden md:block" style={{ zIndex: -1 }}>
            <motion.path 
              d="M 150 150 L 500 150 L 850 150 M 150 450 L 500 450 L 850 450 M 150 150 L 150 450 M 500 150 L 500 450 M 850 150 L 850 450" 
              stroke="#00E5FF" 
              strokeWidth="2" 
              fill="none" 
              strokeDasharray="10 10"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {problems.map((prob, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, rotateX: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-panel p-8 rounded-3xl relative group overflow-hidden"
              >
                {/* Holographic scanning effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000" />
                
                <prob.icon className="w-12 h-12 text-primary mb-6" />
                
                <div className="text-4xl font-mono font-bold text-foreground mb-2 group-hover:text-glow transition-all">
                  {prob.stat}
                </div>
                <h3 className="text-2xl font-bold mb-3">{prob.title}</h3>
                <p className="opacity-70 text-sm">{prob.desc}</p>
                
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary opacity-0 group-hover:opacity-100 transition-opacity m-4" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary opacity-0 group-hover:opacity-100 transition-opacity m-4" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary opacity-0 group-hover:opacity-100 transition-opacity m-4" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary opacity-0 group-hover:opacity-100 transition-opacity m-4" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
