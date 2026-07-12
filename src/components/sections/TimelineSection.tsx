"use client";
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const phases = [
  { year: "Phase 1", title: "Discovery & Mapping", desc: "AI engine connects to your tech stack, instantly discovering assets and mapping your attack surface." },
  { year: "Phase 2", title: "Gap Analysis", desc: "Automated mapping against ISO 27001, SOC 2, and NIST to identify critical control gaps." },
  { year: "Phase 3", title: "Remediation", desc: "Step-by-step actionable workflows for engineering and IT to close security vulnerabilities." },
  { year: "Phase 4", title: "Continuous Monitoring", desc: "Real-time alerts on policy drift and new risks. Audit-ready 24/7." }
];

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section ref={sectionRef} id="timeline" className="relative py-32 bg-background overflow-hidden">
      <motion.div style={{ y: yOffset }} className="max-w-4xl mx-auto px-6 relative">
        
        {/* Timeline Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2">
          <motion.div 
            className="w-full bg-gradient-to-b from-primary via-accent to-transparent"
            style={{ height: useTransform(pathLength, [0, 1], ["0%", "100%"]) }}
          />
        </div>

        {phases.map((phase, i) => {
          const isEven = i % 2 === 0;
          return (
            <motion.div 
              key={i}
              className={`relative flex items-center justify-between mb-32 ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} flex-col md:gap-16`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8 }}
            >
              <div className="hidden md:block w-1/2" />
              
              {/* Center Dot */}
              <div className="absolute left-8 md:left-1/2 w-6 h-6 rounded-full bg-background border-4 border-primary -translate-x-1/2 z-10 shadow-[0_0_20px_rgba(0,229,255,0.8)]" />
              
              {/* Content */}
              <div className="w-full md:w-1/2 pl-20 md:pl-0 pt-2 md:pt-0">
                <div className={`glass-panel p-8 rounded-2xl ${isEven ? 'md:mr-12' : 'md:ml-12'}`}>
                  <div className="text-primary font-mono text-sm mb-2">{phase.year}</div>
                  <h3 className="text-2xl font-bold mb-4">{phase.title}</h3>
                  <p className="opacity-70">{phase.desc}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
