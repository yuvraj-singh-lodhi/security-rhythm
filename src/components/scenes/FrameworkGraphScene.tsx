"use client";
import React, { useRef } from 'react';
import { gsap } from '@/lib/animations/gsap';
import { useIsomorphicLayoutEffect } from '@/lib/hooks/useIsomorphicLayoutEffect';
import SecurithumCore from '../core/SecurithumCore';

const frameworkNames = ["ISO 27001", "SOC 2", "PCI DSS", "NIST CSF", "UK GDPR", "GDPR", "DPDP ACT", "DORA", "NIS2", "EU AI ACT", "ISO 42001", "HIPAA"];

export default function FrameworkGraphScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!sceneRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          pin: true,
          start: "top top",
          end: "+=400%",
          scrub: 1,
        }
      });

      // 1. One control appears
      tl.fromTo(".central-control", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 });

      // 2. Framework requirements appear around it
      tl.to(".fw-node", { 
        opacity: 1, 
        scale: 1, 
        duration: 1, 
        stagger: { amount: 1, from: "random" } 
      });

      // 3. Connect lines
      tl.to(".fw-line", { strokeDashoffset: 0, duration: 1, stagger: { amount: 0.5 } });

      // 4. Large Text
      tl.fromTo(".text-68", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
        .fromTo(".text-one", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "+=0.2");

      // 5. Core appears behind
      tl.to([".text-68", ".text-one"], { opacity: 0, y: -50, duration: 0.5 }, "+=1")
        .to(".scene-core", { opacity: 0.2, scale: 1, duration: 1 }, "-=0.5")
        .fromTo(".text-test", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 });

      // 6. Pulse moves through CTRL-001 -> Requirements turn green -> Text: SATISFY MANY
      tl.to(".central-control .dot", { backgroundColor: "#34D399", scale: 1.5, duration: 0.2 })
        .to(".central-control .dot", { scale: 1, duration: 0.2 })
        .to(".fw-line", { stroke: "#34D399", duration: 0.5 }, "-=0.2")
        .to(".fw-node", { borderColor: "#34D399", color: "#34D399", duration: 0.5 }, "-=0.2")
        .to(".text-test", { opacity: 0, scale: 1.1, duration: 0.5 })
        .fromTo(".text-satisfy", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 });

      // 7. Evidence object enters
      tl.fromTo(".evidence-node", { y: 200, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "+=0.5")
        .to(".evidence-node", { top: "50%", left: "50%", xPercent: -50, yPercent: -50, duration: 0.5 })
        .to(".evidence-node", { scale: 0, opacity: 0, duration: 0.2 }) // absorbed
        .to(".central-control", { boxShadow: "0 0 30px #34D399", duration: 0.2 })
        .to(".fw-node", { backgroundColor: "#34D399", color: "#05080D", duration: 0.5 }, "+=0.1");

      // 8. Large closing statement
      tl.to(".text-satisfy", { opacity: 0, scale: 1.1, duration: 0.5 }, "+=0.5")
        .to([".fw-node", ".fw-line", ".central-control"], { opacity: 0.1, duration: 0.5 }, "-=0.5")
        .fromTo(".text-no-dup", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
        .fromTo(".text-ever", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" });

    }, sceneRef);

    return () => ctx.revert();
  }, []);

  return (
    
      <div className="gsap-pin-wrapper">
      <section ref={sceneRef} className="w-full h-screen relative bg-[#05080D] text-[#F2F5F7] overflow-hidden flex items-center justify-center">
        
        {/* Core Background */}
        <div className="scene-core absolute w-[70vw] h-[70vw] sm:w-[60vw] sm:h-[60vw] md:w-[70vh] md:h-[70vh] opacity-0 scale-50 z-0">
          <SecurithumCore state="FRAMEWORK_GRAPH" />
        </div>

        {/* Central Control */}
        <div className="central-control absolute z-20 flex flex-col items-center bg-[#0E1825] p-4 rounded-xl border border-[#22D3EE]/50">
          <div className="dot w-4 h-4 rounded-full bg-[#22D3EE] mb-2" />
          <span className="font-mono text-sm font-bold text-[#22D3EE]">CTRL-001</span>
          <span className="text-xs text-[#8997A8]">ACCESS CONTROL POLICY</span>
        </div>

        {/* Orbital Frameworks */}
        <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
          <g transform="translate(50%, 50%)">
            {frameworkNames.map((name, i) => {
              const angle = (i * (360 / frameworkNames.length)) * (Math.PI / 180);
              // Use a responsive radius via CSS custom property not possible in SVG, so cap at 40vmin
              const r = 200;
              const x = (r * Math.cos(angle)).toFixed(2);
              const y = (r * Math.sin(angle)).toFixed(2);
              return (
                <line
                  key={`line-${i}`}
                  x1="0" y1="0" x2={x} y2={y}
                  stroke="#8997A8"
                  strokeWidth="1"
                  opacity="0.3"
                  className="fw-line"
                  strokeDasharray="300"
                  strokeDashoffset="300"
                />
              );
            })}
          </g>
        </svg>

        <div className="absolute inset-0 z-20 pointer-events-none">
          {frameworkNames.map((name, i) => {
            const angle = (i * (360 / frameworkNames.length)) * (Math.PI / 180);
            const r = 200;
            return (
              <div
                key={`node-${i}`}
                className="fw-node absolute font-mono text-[9px] sm:text-[10px] md:text-xs px-2 sm:px-3 py-0.5 sm:py-1 border border-[#8997A8] rounded-full text-[#8997A8] opacity-0 scale-0 bg-[#05080D]"
                style={{
                  top: `calc(50% + ${(r * Math.sin(angle)).toFixed(2)}px)`,
                  left: `calc(50% + ${(r * Math.cos(angle)).toFixed(2)}px)`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {name}
              </div>
            );
          })}
        </div>

        {/* Evidence Node */}
        <div className="evidence-node absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-[#F2F5F7] text-[#05080D] px-4 py-2 rounded-full font-mono text-xs font-bold opacity-0">
          <span className="w-2 h-2 rounded-full bg-[#34D399]" />
          EVIDENCE-JIRA-TICKET-891
        </div>

        {/* Typography */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30 px-4">
          <h2 className="text-68 absolute text-6xl sm:text-7xl md:text-9xl font-bold tracking-tighter opacity-0 translate-y-8 text-center text-[#F2F5F7] px-4">
            68<br/>FRAMEWORKS.
          </h2>
          <h2 className="text-one absolute text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter opacity-0 translate-y-8 mt-32 sm:mt-48 text-center text-[#22D3EE] px-4">
            ONE<br/>CONTROL<br/>GRAPH.
          </h2>

          <h2 className="text-test absolute text-6xl sm:text-7xl md:text-9xl font-bold tracking-tighter opacity-0 text-center px-4">
            TEST<br/>ONCE.
          </h2>

          <h2 className="text-satisfy absolute text-6xl sm:text-7xl md:text-9xl font-bold tracking-tighter opacity-0 text-center text-[#34D399] px-4">
            SATISFY<br/>MANY.
          </h2>

          <div className="text-no-dup absolute flex flex-col items-center opacity-0 px-4">
            <h2 className="text-5xl sm:text-6xl md:text-9xl font-bold tracking-tighter text-center">
              NO<br/>DUPLICATE<br/>WORK.
            </h2>
            <h1 className="text-ever text-[15vw] font-bold tracking-tighter text-[#00B8D4] mt-4 sm:mt-8 opacity-0">
              EVER.
            </h1>
          </div>
        </div>

      </section>
    </div>
  );
}
