"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex flex-col justify-center px-6 md:px-16 lg:px-32 max-w-[100vw] overflow-hidden">
      <motion.div 
        className="relative z-10 flex flex-col items-start"
        style={{ opacity, y }}
      >
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-primary font-mono tracking-widest uppercase mb-4 md:mb-8 text-sm md:text-base flex items-center gap-4"
        >
          <span className="w-8 h-[1px] bg-primary"></span>
          SERVICE CATALOG • 2026 • UK & INDIA
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-[4rem] sm:text-[5rem] md:text-[7rem] lg:text-[8rem] font-bold tracking-tighter leading-[0.85] text-foreground uppercase mix-blend-difference"
        >
          SECURITHUM
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-2xl md:text-4xl text-primary font-light mt-4 mb-8"
        >
          Security in rhythm
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-lg md:text-xl font-light text-foreground/80 max-w-2xl font-sans"
        >
          Comprehensive cybersecurity, GRC and compliance solutions - a cloud-native platform and a practitioner-led consulting practice, designed to work together.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 flex flex-wrap gap-8 font-mono text-sm uppercase tracking-widest text-foreground/60"
        >
          <div className="flex flex-col gap-1">
            <span className="text-3xl font-bold text-primary">68</span>
            <span>Frameworks</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-3xl font-bold text-primary">30m</span>
            <span>To Compliance</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-3xl font-bold text-primary">2</span>
            <span>Markets (UK & India)</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-6 md:left-16 lg:left-32 flex flex-col gap-2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs font-mono uppercase opacity-50">Discover the model</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}
