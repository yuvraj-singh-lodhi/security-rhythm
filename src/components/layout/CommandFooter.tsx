"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Server, Activity, ShieldAlert, Terminal as TerminalIcon } from 'lucide-react';

export default function CommandFooter() {
  const [time, setTime] = useState("");
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const updateTime = () => setTime(new Date().toISOString());
    const interval = setInterval(updateTime, 1000);
    updateTime();
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newLogs = [
      "SYSTEM: All nodes active.",
      "NETWORK: Incoming traffic nominal.",
      "AI: Threat model updated.",
      "GRC: Compliance scan completed 0 errors."
    ];
    let i = 0;
    const interval = setInterval(() => {
      setLogs(prev => {
        const next = [...prev, newLogs[i % newLogs.length]];
        if (next.length > 5) next.shift();
        return next;
      });
      i++;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative bg-background border-t border-border pt-20 pb-10 overflow-hidden">
      {/* Background Map Simulation */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
        <Globe className="w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw] text-primary" strokeWidth={0.5} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Status */}
          <div className="col-span-1 md:col-span-1">
            <div className="text-2xl font-bold tracking-tighter text-foreground mb-6">SECURITHUM.</div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm opacity-70 font-mono">System Operational</span>
              </div>
              <div className="flex items-center gap-3">
                <Server className="w-4 h-4 opacity-50" />
                <span className="text-sm opacity-70 font-mono">99.999% Uptime</span>
              </div>
              <div className="flex items-center gap-3">
                <Activity className="w-4 h-4 opacity-50" />
                <span className="text-sm opacity-70 font-mono">{time}</span>
              </div>
            </div>
          </div>

          {/* Terminal */}
          <div className="col-span-1 md:col-span-2">
            <div className="glass-panel rounded-xl p-4 h-48 flex flex-col">
              <div className="flex items-center gap-2 mb-4 border-b border-border pb-2">
                <TerminalIcon className="w-4 h-4 text-primary" />
                <span className="text-xs font-mono opacity-50 uppercase">Live Operations</span>
              </div>
              <div className="font-mono text-xs space-y-2 flex-1 overflow-hidden flex flex-col justify-end">
                {logs.map((log, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }}
                    className={log.includes("Threat") ? "text-danger" : "text-primary"}
                  >
                    &gt; {log}
                  </motion.div>
                ))}
                <div className="flex items-center gap-2 mt-2 opacity-50">
                  &gt; <span className="w-2 h-4 bg-primary animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="col-span-1 flex flex-col gap-2">
            <span className="text-sm font-bold text-foreground mb-4 uppercase tracking-widest">Navigation</span>
            {['Platform', 'Solutions', 'Company', 'Careers', 'Trust Center'].map((link) => (
              <a key={link} href="#" className="text-sm opacity-70 hover:text-primary transition-colors font-mono">
                {link}
              </a>
            ))}
          </div>

        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs opacity-40 font-mono">
            &copy; {new Date().getFullYear()} Securithum Inc. All rights reserved.
          </p>
          <div className="flex gap-4">
            <ShieldAlert className="w-4 h-4 opacity-40 hover:text-primary cursor-pointer transition-colors" />
            <Globe className="w-4 h-4 opacity-40 hover:text-primary cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
}
