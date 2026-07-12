"use client";
import React, { useRef } from 'react';
import { gsap } from '@/lib/animations/gsap';
import { useIsomorphicLayoutEffect } from '@/lib/hooks/useIsomorphicLayoutEffect';
import SecurithumCore from '../core/SecurithumCore';

const floaters = [
  { id: "RISK-024", type: "risk", top: "20%", left: "10%" },
  { id: "ASSET-091", type: "asset", top: "15%", left: "80%" },
  { id: "VENDOR-012", type: "vendor", top: "70%", left: "20%" },
  { id: "POL-007", type: "policy", top: "80%", left: "70%" },
  { id: "CTRL-114", type: "control", top: "40%", left: "50%" },
  { id: "ISO27001/A.5.19", type: "framework", top: "50%", left: "85%" },
  { id: "SOC2/CC6.1", type: "framework", top: "60%", left: "15%" },
  { id: "DPDP/S8", type: "framework", top: "30%", left: "40%" },
  { id: "GDPR/ART32", type: "framework", top: "85%", left: "45%" }
];

export default function DisconnectedOrganisation() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!sceneRef.current) return;

    const ctx = gsap.context(() => {
      // Ambient movement for floaters - runs independently of scroll
      gsap.to(".floating-node", {
        y: "random(-50, 50)",
        x: "random(-50, 50)",
        rotation: "random(-10, 10)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.3 }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          pin: true,
          start: "top top",
          end: "+=350%",
          scrub: 1,
        }
      });

      // Sequence
      
      // Step 1: Show "COMPLIANCE IS FRAGMENTED."
      tl.to(".text-fragmented", { opacity: 1, y: 0, duration: 1 }, 0);

      // Step 2: "RISK OVER HERE. PRIVACY OVER THERE. AUDIT SOMEWHERE ELSE."
      tl.to(".text-fragmented", { opacity: 0, y: -50, duration: 1 }, 1)
        .to(".text-scatter-1", { opacity: 1, x: 0, duration: 0.5 }, 1.2)
        .to(".text-scatter-2", { opacity: 1, x: 0, duration: 0.5 }, 1.4)
        .to(".text-scatter-3", { opacity: 1, x: 0, duration: 0.5 }, 1.6);

      // Near misses (vendor risk moves past control, etc.)
      tl.to(".floater-0", { x: "50vw", y: "20vh", duration: 1.5 }, 1) // Risk moves
        .to(".floater-4", { x: "-30vw", duration: 1.5 }, 1); // Control moves past it without connecting

      // Step 3: "EVERY SYSTEM CALLS ITSELF A SYSTEM OF RECORD."
      tl.to([".text-scatter-1", ".text-scatter-2", ".text-scatter-3"], { opacity: 0, duration: 1 }, 2.5)
        .to(".text-record", { opacity: 1, scale: 1, duration: 1 }, 2.8);

      // Step 4: Screen clears, "RECORDS SIT STILL."
      tl.to(".text-record", { opacity: 0, scale: 1.1, duration: 1 }, 4)
        .to(".floating-node", { opacity: 0, duration: 1 }, 4)
        .to(".text-sit-still", { opacity: 1, duration: 1 }, 4.5);

      // Step 5: "YOUR RISK DOESN&apos;T." + Core Enters
      tl.to(".text-sit-still", { opacity: 0, duration: 0.5 }, 5.5)
        .to(".text-doesnt", { opacity: 1, scale: 1, duration: 1 }, 6)
        .to(".scene-core", { opacity: 0.2, scale: 1, y: 0, duration: 1.5, ease: "power2.out" }, 6);

    }, sceneRef);

    return () => ctx.revert();
  }, []);

  return (
    
      <div className="gsap-pin-wrapper">
      <section ref={sceneRef} className="w-full h-screen relative bg-[#05080D] text-[#F2F5F7] overflow-hidden">

        {/* Layer 01: Deep technical grid */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#09111C 1px, transparent 1px), linear-gradient(90deg, #09111C 1px, transparent 1px)", backgroundSize: "50px 50px" }} />

        {/* Layer 03-05: Floating entities */}
        <div className="absolute inset-0 z-10">
          {floaters.map((f, i) => (
            <div
              key={i}
              className={`floating-node floater-${i} absolute hidden sm:flex flex-col items-center gap-2 p-2 sm:p-3 bg-[#0E1825]/80 border border-[#8997A8]/20 rounded-lg backdrop-blur-sm`}
              style={{ top: f.top, left: f.left }}
            >
              <span className="font-mono text-xs text-[#22D3EE]">{f.id}</span>
              <div className="w-2 h-2 rounded-full bg-[#FF4D4D]" />
            </div>
          ))}
        </div>

        {/* Layer 06: Typography */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          
          <h2 className="text-fragmented absolute text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-center opacity-0 translate-y-12 px-4">
            COMPLIANCE<br/>IS FRAGMENTED.
          </h2>

          <div className="absolute w-full h-full max-w-5xl mx-auto flex flex-col justify-center px-6 sm:px-12">
            <h3 className="text-scatter-1 text-2xl sm:text-3xl md:text-5xl font-bold opacity-0 -translate-x-12 self-start text-[#F5A623]">RISK OVER HERE.</h3>
            <h3 className="text-scatter-2 text-2xl sm:text-3xl md:text-5xl font-bold opacity-0 translate-x-12 self-end mt-6 sm:mt-12 text-[#34D399]">PRIVACY OVER THERE.</h3>
            <h3 className="text-scatter-3 text-2xl sm:text-3xl md:text-5xl font-bold opacity-0 -translate-x-12 self-center mt-6 sm:mt-12 text-[#22D3EE]">AUDIT SOMEWHERE ELSE.</h3>
          </div>

          <h2 className="text-record absolute text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter text-center max-w-4xl opacity-0 scale-95 px-4">
            EVERY SYSTEM CALLS ITSELF A SYSTEM OF RECORD.
          </h2>

          <h3 className="text-sit-still absolute text-3xl md:text-5xl font-light tracking-wide text-center opacity-0 text-[#8997A8]">
            RECORDS SIT STILL.
          </h3>

          <h1 className="text-doesnt absolute text-[14vw] sm:text-[12vw] font-bold tracking-tighter text-center opacity-0 scale-110 text-[#FF4D4D] px-4">
            YOUR RISK<br/>DOESN&apos;T.
          </h1>

        </div>

        {/* Layer 07: The Core entering */}
        <div className="scene-core absolute z-0 inset-0 flex items-center justify-center opacity-0 scale-50 translate-y-32">
          <div className="w-[70vw] h-[70vw] sm:w-[60vw] sm:h-[60vw] md:w-[70vh] md:h-[70vh]">
            <SecurithumCore state="FRAGMENTED" />
          </div>
        </div>

      </section>
    </div>
  );
}
