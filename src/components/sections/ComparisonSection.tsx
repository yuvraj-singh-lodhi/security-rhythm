"use client";
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const competitors = [
  { name: "Vanta", desc: "Compliance only" },
  { name: "OneTrust", desc: "Too complex" },
  { name: "Drata", desc: "Limited security" },
  { name: "Sprinto", desc: "SMB focus" },
  { name: "Eramba", desc: "Manual processes" },
];

export default function ComparisonSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const counterRotate = useTransform(rotate, r => -r);

  return (
    <section 
      ref={sectionRef} 
      id="comparison"
      className="relative min-h-screen py-32 overflow-hidden flex flex-col items-center justify-center z-10 bg-background"
    >
      <div className="text-center mb-16 relative z-20">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
          Beyond <span className="text-primary">Legacy</span> GRC
        </h2>
        <p className="text-xl opacity-70 max-w-2xl mx-auto">
          Securithum unifies Security, Risk, and Compliance into a single AI-powered ecosystem.
        </p>
      </div>

      <div className="relative w-[min(90vw,800px)] h-[min(90vw,800px)] flex items-center justify-center">
        {/* Center Node: Securithum */}
        <motion.div 
          className="absolute z-20 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full bg-surface border border-primary flex items-center justify-center flex-col text-center"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", bounce: 0.5, duration: 1 }}
          style={{ boxShadow: '0 0 40px rgba(0, 229, 255, 0.3)' }}
        >
          <div className="text-xl font-bold mb-2">SECURITHUM</div>
          <div className="text-xs text-primary uppercase font-mono">Unified Platform</div>
        </motion.div>

        {/* Orbit Path */}
        <div className="absolute w-[min(75vw,600px)] h-[min(75vw,600px)] border border-border rounded-full border-dashed" />
        
        {/* Rotating Wheel */}
        <motion.div 
          style={{ rotate }}
          className="absolute w-[min(75vw,600px)] h-[min(75vw,600px)] rounded-full"
        >
          {competitors.map((comp, i) => {
            const angle = (i / competitors.length) * 360;
            return (
              <div
                key={comp.name}
                className="absolute w-32 h-32 -ml-16 -mt-16"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${angle}deg) translate(min(37.5vw,300px)) rotate(-${angle}deg)`,
                }}
              >
                {/* Counter-rotate the individual nodes so text stays upright */}
                <motion.div 
                  className="w-full h-full rounded-full bg-surface/80 border border-border backdrop-blur-md flex items-center justify-center flex-col text-center"
                  style={{ rotate: counterRotate }} // Counter rotation
                >
                  <div className="font-bold opacity-90">{comp.name}</div>
                  <div className="text-[10px] text-danger mt-1 uppercase tracking-wider">{comp.desc}</div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        {/* Connection Beams */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.15)_0%,transparent_50%)] pointer-events-none" />
      </div>
    </section>
  );
}
