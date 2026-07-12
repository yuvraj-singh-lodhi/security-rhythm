"use client";
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const nodes = [
  { id: 1, label: "Controls", x: 50, y: 30, color: "#00E5FF" },
  { id: 2, label: "Policies", x: 30, y: 40, color: "#00FFA3" },
  { id: 3, label: "Assets", x: 70, y: 40, color: "#FF3B6B" },
  { id: 4, label: "Risks", x: 20, y: 60, color: "#F8FAFC" },
  { id: 5, label: "Frameworks", x: 80, y: 60, color: "#00E5FF" },
  { id: 6, label: "Vendors", x: 40, y: 70, color: "#00FFA3" },
  { id: 7, label: "Incidents", x: 60, y: 70, color: "#FF3B6B" },
  { id: 8, label: "Users", x: 50, y: 50, color: "#F8FAFC" },
  { id: 9, label: "Evidence", x: 50, y: 85, color: "#00E5FF" },
];

const links = [
  [1, 8], [2, 1], [3, 1], [4, 2], [5, 1], [6, 3], [7, 3], [8, 2], [8, 3], [9, 1], [4, 8], [7, 8], [6, 4]
];

export default function GraphSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  // Background fades darker
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.2]);

  return (
    <section ref={sectionRef} id="graph" className="relative h-[150vh] w-full bg-background">
      <motion.div 
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
        style={{ opacity: bgOpacity }}
      >
        <div className="absolute top-20 text-center z-30">
          <h2 className="text-5xl font-bold tracking-tighter mb-4">The Security <span className="text-primary">Graph</span></h2>
          <p className="opacity-70 max-w-xl mx-auto">See how everything is connected. One change ripples through the entire ecosystem.</p>
        </div>

        <motion.div style={{ scale }} className="relative w-[800px] h-[800px] mt-20">
          {/* Links */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {links.map(([sourceId, targetId], i) => {
              const source = nodes.find(n => n.id === sourceId)!;
              const target = nodes.find(n => n.id === targetId)!;
              const isActive = hoveredNode === null || hoveredNode === sourceId || hoveredNode === targetId;
              
              return (
                <motion.line
                  key={i}
                  x1={`${source.x}%`}
                  y1={`${source.y}%`}
                  x2={`${target.x}%`}
                  y2={`${target.y}%`}
                  stroke="var(--color-foreground)"
                  strokeWidth={isActive ? 2 : 1}
                  style={{ opacity: isActive ? 0.2 : 0.05 }}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((node) => {
            const isActive = hoveredNode === null || hoveredNode === node.id;
            const isConnected = hoveredNode !== null && links.some(l => (l[0] === hoveredNode && l[1] === node.id) || (l[1] === hoveredNode && l[0] === node.id));
            const highlight = hoveredNode === node.id || isConnected;

            return (
              <motion.div
                key={node.id}
                className="absolute flex flex-col items-center justify-center cursor-pointer"
                style={{ 
                  left: `${node.x}%`, 
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: highlight ? 50 : 10
                }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                onHoverStart={() => setHoveredNode(node.id)}
                onHoverEnd={() => setHoveredNode(null)}
              >
                <motion.div 
                  className="w-4 h-4 rounded-full relative"
                  style={{ backgroundColor: node.color, opacity: isActive ? 1 : 0.2 }}
                  animate={highlight ? { scale: [1, 1.5, 1] } : { scale: 1 }}
                  transition={{ duration: 1.5, repeat: highlight ? Infinity : 0 }}
                >
                  {highlight && (
                    <div className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: node.color, opacity: 0.4 }} />
                  )}
                </motion.div>
                <div 
                  className={`mt-3 font-mono text-sm tracking-wider uppercase transition-opacity ${highlight ? 'opacity-100 text-foreground font-bold' : isActive ? 'opacity-70' : 'opacity-10'}`}
                  style={{ textShadow: highlight ? `0 0 10px ${node.color}` : 'none' }}
                >
                  {node.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
