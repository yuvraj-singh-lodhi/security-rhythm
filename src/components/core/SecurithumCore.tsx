"use client";
import React, { useMemo } from 'react';

type SecurithumCoreProps = {
  className?: string;
  state?: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SecurithumCore({ className = "", state: _state = "STABLE" }: SecurithumCoreProps) {
  // SVG generation helpers
  const cx = 500;
  const cy = 500;

  // Generate 12 module arcs
  const modules = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => {
      const startAngle = (i * 30 - 90) * (Math.PI / 180);
      const endAngle = ((i + 1) * 30 - 92) * (Math.PI / 180); // 2 degree gap
      const r = 220;
      const x1 = (cx + r * Math.cos(startAngle)).toFixed(2);
      const y1 = (cy + r * Math.sin(startAngle)).toFixed(2);
      const x2 = (cx + r * Math.cos(endAngle)).toFixed(2);
      const y2 = (cy + r * Math.sin(endAngle)).toFixed(2);
      // Determine if large arc (always 0 for 30 deg)
      const largeArcFlag = 0;
      const d = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
      
      return (
        <path 
          key={`module-${i}`}
          d={d} 
          fill="none" 
          stroke="#0E1825" 
          strokeWidth="40" 
          className="core-module transition-all duration-500 hover:stroke-primary" 
        />
      );
    });
  }, []);

  // Generate 68 framework markers
  const frameworks = useMemo(() => {
    return Array.from({ length: 68 }).map((_, i) => {
      const angle = (i * (360 / 68)) * (Math.PI / 180);
      const r1 = 300;
      const r2 = 315;
      const x1 = (cx + r1 * Math.cos(angle)).toFixed(2);
      const y1 = (cy + r1 * Math.sin(angle)).toFixed(2);
      const x2 = (cx + r2 * Math.cos(angle)).toFixed(2);
      const y2 = (cy + r2 * Math.sin(angle)).toFixed(2);
      
      return (
        <line 
          key={`fw-${i}`}
          x1={x1} y1={y1} x2={x2} y2={y2} 
          stroke="#8997A8" 
          strokeWidth="2" 
          opacity="0.4"
          className="core-framework"
        />
      );
    });
  }, []);

  // Generate 4 service anchors
  const services = [0, 90, 180, 270].map((angleDeg, i) => {
    const angle = (angleDeg - 45) * (Math.PI / 180);
    const r = 360;
    const x = (cx + r * Math.cos(angle)).toFixed(2);
    const y = (cy + r * Math.sin(angle)).toFixed(2);
    return (
      <g key={`service-${i}`} transform={`translate(${x}, ${y}) rotate(${angleDeg - 45 + 90})`} className="core-service">
        <path d="M -20 -10 L -20 10 L 20 10 L 20 -10" fill="none" stroke="#22D3EE" strokeWidth="2" opacity="0.6" />
        <circle cx="0" cy="15" r="3" fill="#22D3EE" />
      </g>
    );
  });

  return (
    <div className={`relative w-full h-full max-w-[800px] max-h-[800px] mx-auto ${className}`}>
      <svg 
        viewBox="0 0 1000 1000" 
        className="w-full h-full drop-shadow-2xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background dark sphere */}
        <circle cx="500" cy="500" r="380" fill="#05080D" stroke="#09111C" strokeWidth="2" />

        {/* Framework Markers (68) */}
        <g className="core-frameworks">
          {frameworks}
        </g>

        {/* Outer Tech Ring */}
        <circle cx="500" cy="500" r="280" fill="none" stroke="#0E1825" strokeWidth="2" strokeDasharray="4 12" />

        {/* Service Anchors (4) */}
        <g className="core-services">
          {services}
        </g>

        {/* Modules (12) */}
        <g className="core-modules">
          {modules}
        </g>

        {/* Engine 2 (Consulting Practice) */}
        <g className="core-engine-2">
          <circle cx="500" cy="500" r="150" fill="none" stroke="#34D399" strokeWidth="1" strokeDasharray="8 4" opacity="0.6" />
          <circle cx="500" cy="500" r="140" fill="none" stroke="#0E1825" strokeWidth="10" />
        </g>

        {/* Engine 1 (Platform) */}
        <g className="core-engine-1">
          <circle cx="500" cy="500" r="100" fill="none" stroke="#00B8D4" strokeWidth="2" strokeDasharray="2 6" />
          <circle cx="500" cy="500" r="80" fill="#09111C" stroke="#00B8D4" strokeWidth="1" opacity="0.8" />
        </g>

        {/* Central Rhythm Pulse */}
        <g className="core-pulse">
          <circle cx="500" cy="500" r="30" fill="#00B8D4" filter="url(#cyanGlow)" className="animate-pulse" />
          <circle cx="500" cy="500" r="10" fill="#F2F5F7" />
        </g>
        
        {/* Dynamic Signals Layer (used by GSAP for data traveling) */}
        <g className="core-signals"></g>
      </svg>
    </div>
  );
}
