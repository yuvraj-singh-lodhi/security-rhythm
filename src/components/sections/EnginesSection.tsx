"use client";
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Activity, ShieldCheck } from 'lucide-react';

export default function EnginesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"]
  });

  // Calculate translation for merging the two halves
  const xLeft = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const glowMerge = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  return (
    <section 
      ref={sectionRef}
      id="engines"
      className="relative h-[150vh] w-full bg-background overflow-hidden"
    >
      <div className="sticky top-0 h-screen w-full flex overflow-hidden">
        
        {/* Left Side: Platform (Blue) */}
        <motion.div 
          className="w-1/2 h-full flex flex-col items-center justify-center border-r border-border relative"
          style={{ x: xLeft }}
        >
          <div className="absolute inset-0 bg-primary/5 opacity-50" />
          <motion.div 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[800px] bg-primary/20 blur-[120px] rounded-full"
            style={{ opacity: glowMerge }}
          />
          
          <div className="relative z-10 text-center px-12">
            <Activity className="w-16 h-16 text-primary mx-auto mb-8" />
            <h2 className="text-5xl font-bold tracking-tighter mb-4">Platform</h2>
            <p className="opacity-70 text-lg max-w-md mx-auto">
              AI-driven automation, continuous monitoring, and real-time risk intelligence.
            </p>
          </div>
        </motion.div>

        {/* Right Side: Consulting (Emerald) */}
        <motion.div 
          className="w-1/2 h-full flex flex-col items-center justify-center border-l border-border relative"
          style={{ x: xRight }}
        >
          <div className="absolute inset-0 bg-accent/5 opacity-50" />
          <motion.div 
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[800px] bg-accent/20 blur-[120px] rounded-full"
            style={{ opacity: glowMerge }}
          />
          
          <div className="relative z-10 text-center px-12">
            <ShieldCheck className="w-16 h-16 text-accent mx-auto mb-8" />
            <h2 className="text-5xl font-bold tracking-tighter mb-4">Consulting</h2>
            <p className="opacity-70 text-lg max-w-md mx-auto">
              Expert guidance, strategic planning, and hands-on implementation by industry veterans.
            </p>
          </div>
        </motion.div>

        {/* Center Merged Content */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-center"
          style={{ opacity }}
        >
          <div className="glass-panel px-12 py-8 rounded-full flex items-center justify-center gap-4">
            <span className="text-3xl font-bold">One Unified</span>
            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Ecosystem
            </span>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
