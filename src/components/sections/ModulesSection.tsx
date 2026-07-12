"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileCheck, ShieldAlert, Users, Lock, CheckSquare, FileText, Cpu, Shield, AlertTriangle, Database, X } from 'lucide-react';

const modules = [
  { id: "compliance", icon: FileCheck, name: "Compliance", x: 10, y: 10 },
  { id: "risk", icon: ShieldAlert, name: "Risk", x: 40, y: 15 },
  { id: "vendor", icon: Users, name: "Vendor", x: 70, y: 10 },
  { id: "privacy", icon: Lock, name: "Privacy", x: 20, y: 40 },
  { id: "audit", icon: CheckSquare, name: "Audit", x: 50, y: 45 },
  { id: "policies", icon: FileText, name: "Policies", x: 80, y: 40 },
  { id: "ai", icon: Cpu, name: "AI Governance", x: 15, y: 70 },
  { id: "trust", icon: Shield, name: "Trust Center", x: 45, y: 75 },
  { id: "incident", icon: AlertTriangle, name: "Incident", x: 75, y: 70 },
  { id: "assets", icon: Database, name: "Assets", x: 90, y: 85 },
];

export default function ModulesSection() {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  return (
    <section className="relative min-h-[120vh] py-32 bg-background overflow-hidden" id="modules">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center relative z-20">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
          Command <span className="text-primary">Center</span>
        </h2>
        <p className="text-xl opacity-70 max-w-2xl mx-auto">
          Every module you need, fully connected and powered by AI.
        </p>
      </div>

      <div className="relative w-full max-w-5xl h-[700px] mx-auto border border-border rounded-[40px] bg-surface/30 backdrop-blur-3xl overflow-hidden shadow-[0_0_100px_rgba(0,229,255,0.05)]">
        
        {/* Background Grid & Scanline */}
        <div className="absolute inset-0 bg-[linear-gradient(var(--theme-border)_1px,transparent_1px),linear-gradient(90deg,var(--theme-border)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <motion.div 
          className="absolute inset-0 h-[2px] bg-primary/50 shadow-[0_0_20px_rgba(0,229,255,0.5)]"
          animate={{ y: [0, 700, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* Nodes */}
        {modules.map((mod) => (
          <motion.div
            key={mod.id}
            className={`absolute z-10 cursor-pointer ${activeModule && activeModule !== mod.id ? 'opacity-30' : 'opacity-100'}`}
            style={{ left: `${mod.x}%`, top: `${mod.y}%` }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setActiveModule(mod.id)}
          >
            {/* Holographic Tile */}
            <div className="relative w-24 h-24 flex flex-col items-center justify-center">
              <motion.div 
                className="absolute inset-0 border border-primary/40 rounded-xl bg-primary/5"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <mod.icon className="w-8 h-8 text-primary mb-2 drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
              <span className="text-[10px] font-mono text-foreground uppercase tracking-wider bg-surface/80 px-2 py-1 rounded">{mod.name}</span>
            </div>
            
            {/* Pulse */}
            <motion.div
              className="absolute inset-0 rounded-xl border border-primary/20"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        ))}

        {/* Expanded View */}
        <AnimatePresence>
          {activeModule && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 z-30 flex items-center justify-center bg-background/60 backdrop-blur-md"
            >
              <div className="glass-panel w-full max-w-2xl p-12 rounded-3xl relative border-primary/30">
                <button 
                  onClick={() => setActiveModule(null)}
                  className="absolute top-6 right-6 opacity-70 hover:text-foreground transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/50">
                    <ActivityIcon id={activeModule} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold capitalize">{activeModule.replace('-', ' ')}</h3>
                    <p className="text-primary font-mono text-sm uppercase tracking-widest mt-1">Module Active</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-foreground/10 rounded-full w-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "80%" }} className="h-full bg-primary" transition={{ duration: 1 }} />
                  </div>
                  <div className="h-4 bg-foreground/10 rounded-full w-3/4 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "65%" }} className="h-full bg-accent" transition={{ duration: 1, delay: 0.2 }} />
                  </div>
                  <p className="opacity-70 pt-4 leading-relaxed">
                    This module is deeply integrated into the security graph. It continuously monitors your infrastructure and automates remediation workflows.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

// Helper to render correct icon
function ActivityIcon({ id }: { id: string }) {
  const mod = modules.find(m => m.id === id);
  if (!mod) return null;
  const Icon = mod.icon;
  return <Icon className="w-8 h-8 text-primary" />;
}
