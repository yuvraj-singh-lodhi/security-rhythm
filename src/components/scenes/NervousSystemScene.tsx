"use client";
import React, { useRef } from 'react';
import { gsap } from '@/lib/animations/gsap';
import { useIsomorphicLayoutEffect } from '@/lib/hooks/useIsomorphicLayoutEffect';
import SecurithumCore from '../core/SecurithumCore';

export default function NervousSystemScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!sceneRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          pin: true,
          start: "top top",
          end: "+=600%",
          scrub: 1,
        }
      });

      // Core setup
      tl.set(".scene-core-wrapper", { scale: 0.8, opacity: 0.5 });
      tl.set(".node-label", { opacity: 0, scale: 0 });
      tl.set(".consequence-stat", { opacity: 0, x: -20 });

      // STAGE 01 - SENSE
      tl.to(".vendor-node", { opacity: 1, scale: 1, duration: 0.5 }, 0.5)
        .to(".vendor-node .dot", { backgroundColor: "#FF4D4D", duration: 0.2 }, 0.8)
        .to(".text-senses", { opacity: 1, y: 0, duration: 0.5 }, 1)
        .to(".scene-core-wrapper", { opacity: 0.8, scale: 0.85, duration: 1 }, 1);

      // STAGE 02 - CONNECT
      tl.to(".text-senses", { opacity: 0, y: -20, duration: 0.5 }, 2)
        .to(".text-connects", { opacity: 1, y: 0, duration: 0.5 }, 2.5);
      
      const connections = [
        "VENDOR RISK",
        "RISK REGISTER",
        "AFFECTED ASSET",
        "CONTROL",
        "FRAMEWORK REQUIREMENT"
      ];
      
      connections.forEach((conn, index) => {
        tl.to(`.conn-${index}`, { opacity: 1, scale: 1, duration: 0.3 }, 2.5 + (index * 0.2));
        tl.to(`.line-${index}`, { width: "100%", duration: 0.2 }, 2.5 + (index * 0.2));
      });

      tl.to(".scene-core-wrapper", { scale: 0.9, duration: 1.5 }, 2.5);

      // STAGE 03 - UNDERSTAND
      tl.to(".text-connects", { opacity: 0, y: -20, duration: 0.5 }, 4.5)
        .to(".node-label", { opacity: 0, duration: 0.5 }, 4.5) // hide old nodes
        .to(".text-understands", { opacity: 1, y: 0, duration: 0.5 }, 5)
        .to(".scene-core-wrapper", { rotationX: 20, rotationY: -15, scale: 1, duration: 1.5 }, 5)
        .to(".consequence-stat", { opacity: 1, x: 0, stagger: 0.2, duration: 1 }, 5.5);

      // STAGE 04 - SIGNAL
      tl.to(".text-understands", { opacity: 0, y: -20, duration: 0.5 }, 7)
        .to(".consequence-stat", { opacity: 0, x: 20, duration: 0.5 }, 7)
        .to(".text-signals", { opacity: 1, y: 0, duration: 0.5 }, 7.5)
        .to(".signal-out", { scale: 2, opacity: 0, duration: 1, stagger: 0.2, repeat: 2 }, 7.5);

      // STAGE 05 - RHYTHM
      tl.to(".text-signals", { opacity: 0, y: -20, duration: 0.5 }, 9.5)
        .to(".scene-core-wrapper", { rotationX: 0, rotationY: 0, duration: 1 }, 10)
        .to(".text-rhythm", { opacity: 1, y: 0, duration: 1 }, 10.5)
        .to(".rhythm-copy", { opacity: 1, y: 0, duration: 1 }, 10.8);

    }, sceneRef);

    return () => ctx.revert();
  }, []);

  return (
    
      <div className="gsap-pin-wrapper">
      <section ref={sceneRef} className="w-full h-screen relative bg-[#05080D] text-[#F2F5F7] overflow-hidden flex items-center justify-center">
        
        {/* Core Layer */}
        <div className="scene-core-wrapper absolute w-[70vh] h-[70vh]">
          <SecurithumCore state="SENSING" />
        </div>

        {/* Floating Typography */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <h2 className="text-senses absolute text-5xl md:text-8xl font-bold opacity-0 translate-y-8 text-center text-[#22D3EE]">
            IT SENSES.
          </h2>
          <h2 className="text-connects absolute text-5xl md:text-8xl font-bold opacity-0 translate-y-8 text-center text-[#34D399]">
            IT CONNECTS.
          </h2>
          <h2 className="text-understands absolute text-5xl md:text-7xl font-bold opacity-0 translate-y-8 text-center max-w-4xl text-[#F5A623]">
            IT UNDERSTANDS<br/>CONSEQUENCES.
          </h2>
          <h2 className="text-signals absolute text-5xl md:text-8xl font-bold opacity-0 translate-y-8 text-center text-[#FF4D4D]">
            IT SIGNALS.
          </h2>
          
          <div className="text-rhythm absolute flex flex-col items-center opacity-0 translate-y-8">
            <h2 className="text-5xl md:text-8xl font-bold text-center mb-8">
              SECURITY<br/><span className="text-[#00B8D4]">IN RHYTHM.</span>
            </h2>
            <div className="rhythm-copy opacity-0 translate-y-4 max-w-md text-center text-[#8997A8] space-y-4">
              <p>Securithum is your organisation&apos;s compliance nervous system.</p>
              <p>It senses change. Connects consequences. And keeps your security programme moving.</p>
            </div>
          </div>
        </div>

        {/* Stage 01 & 02: Nodes & Connections */}
        <div className="absolute top-1/4 left-1/4 z-30">
          <div className="vendor-node flex flex-col items-center gap-2 opacity-0">
            <div className="dot w-4 h-4 rounded-full bg-[#8997A8]" />
            <span className="font-mono text-xs">VENDOR-021</span>
            <span className="font-mono text-[10px] text-[#FF4D4D] absolute top-8 whitespace-nowrap">SECURITY POSTURE CHANGED</span>
          </div>
        </div>

        {/* Connection Path Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
          <div className="w-[80%] h-full relative">
             {["VENDOR RISK", "RISK REGISTER", "AFFECTED ASSET", "CONTROL", "FRAMEWORK REQUIREMENT"].map((lbl, i) => (
                <React.Fragment key={i}>
                  <div className={`node-label conn-${i} absolute font-mono text-xs text-[#22D3EE] p-2 border border-[#22D3EE]/30 bg-[#0E1825] rounded-md z-10`}
                       style={{ top: `${30 + i * 12}%`, left: `${20 + i * 15}%` }}>
                    {lbl}
                  </div>
                  <div className={`line-${i} absolute h-[1px] bg-[#22D3EE] w-0 z-0`}
                       style={{ top: `${33 + i * 12}%`, left: `${20 + i * 15}%` }} />
                </React.Fragment>
             ))}
          </div>
        </div>

        {/* Stage 03: Consequences Stats */}
        <div className="absolute right-12 top-1/3 flex flex-col gap-6 font-mono text-sm z-30">
          <div className="consequence-stat text-[#FF4D4D]">3 RISKS AFFECTED</div>
          <div className="consequence-stat text-[#F5A623]">7 CONTROLS REVIEW REQUIRED</div>
          <div className="consequence-stat text-[#34D399]">4 FRAMEWORK REQUIREMENTS IMPACTED</div>
          <div className="consequence-stat text-[#8997A8]">1 POLICY REVIEW DUE</div>
        </div>

        {/* Stage 04: Signals Outward */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
           <div className="signal-out absolute w-32 h-32 border-2 border-[#FF4D4D] rounded-full opacity-0" />
           <div className="signal-out absolute w-32 h-32 border-2 border-[#F5A623] rounded-full opacity-0 delay-100" />
           <div className="signal-out absolute w-32 h-32 border-2 border-[#22D3EE] rounded-full opacity-0 delay-200" />
        </div>

      </section>
    </div>
  );
}
