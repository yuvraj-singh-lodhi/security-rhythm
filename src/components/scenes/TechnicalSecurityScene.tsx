"use client";
import React, { useRef } from 'react';
import { gsap } from '@/lib/animations/gsap';
import { useIsomorphicLayoutEffect } from '@/lib/hooks/useIsomorphicLayoutEffect';

export default function TechnicalSecurityScene() {
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

      // 1. Initial Clean Architecture
      tl.fromTo(".arch-node", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2 });

      // 2. Adversarial Signal Enters & Probes AUTH
      tl.fromTo(".adv-signal", { x: -100, y: 150, opacity: 0 }, { x: 300, y: 150, opacity: 1, duration: 1 })
        .to(".adv-signal", { x: 450, y: 100, duration: 0.5 }) // approaches AUTH
        .to(".arch-node-AUTH", { borderColor: "#FF4D4D", duration: 0.2 })
        .to(".adv-signal", { scale: 1.5, backgroundColor: "#FF4D4D", duration: 0.2 }) // blocked
        .to(".adv-signal", { x: 300, y: 150, scale: 1, duration: 0.5 }) // retreats
        .to(".arch-node-AUTH", { borderColor: "#34D399", duration: 0.5 }, "<"); // secure

      // 3. Probes API -> Finds INPUT -> Moves deeper
      tl.to(".adv-signal", { x: 450, y: 200, duration: 0.5 }) // approaches API
        .to(".arch-node-API", { borderColor: "#F5A623", duration: 0.2 }) // found something
        .to(".arch-input", { opacity: 1, duration: 0.2 }) // INPUT revealed
        .to(".adv-signal", { x: 600, y: 200, duration: 0.5 }) // moves through
        .to(".arch-node-DATABASE", { borderColor: "#FF4D4D", backgroundColor: "#FF4D4D", color: "#05080D", duration: 0.5 }) // DB compromised
        .to(".arch-line", { stroke: "#FF4D4D", duration: 0.5 }, "<");

      // 4. Large Typography 1
      tl.to(".arch-wrapper", { opacity: 0.1, scale: 0.8, duration: 1 }, "+=0.5")
        .fromTo(".text-no-scanner", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo(".text-pen-test", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, "+=0.2");

      // 5. Show Technical Vectors
      tl.to([".text-no-scanner", ".text-pen-test"], { opacity: 0, duration: 1 }, "+=1")
        .fromTo(".tech-vector", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.2 });

      // 6. FIND IT. PROVE IT. FIX IT.
      tl.to(".tech-vector", { opacity: 0, x: 50, duration: 0.5, stagger: 0.1 }, "+=1")
        .fromTo(".text-find", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.5 })
        .fromTo(".text-prove", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.5 }, "+=0.2")
        .fromTo(".text-fix", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.5 }, "+=0.2");

    }, sceneRef);

    return () => ctx.revert();
  }, []);

  return (
    
      <div className="gsap-pin-wrapper">
      <section ref={sceneRef} className="w-full h-screen relative bg-[#05080D] text-[#F2F5F7] overflow-hidden flex items-center justify-center">
        
        {/* Architecture Visualization */}
        <div className="arch-wrapper absolute inset-0 flex items-center justify-center z-0">
          <div className="relative w-full max-w-4xl h-[400px]">
            {/* Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <line x1="20%" y1="50%" x2="40%" y2="50%" stroke="#8997A8" strokeWidth="2" strokeDasharray="4 4" className="arch-line" />
              <line x1="40%" y1="50%" x2="60%" y2="25%" stroke="#8997A8" strokeWidth="2" strokeDasharray="4 4" className="arch-line" />
              <line x1="40%" y1="50%" x2="60%" y2="75%" stroke="#8997A8" strokeWidth="2" strokeDasharray="4 4" className="arch-line" />
              <line x1="60%" y1="75%" x2="80%" y2="50%" stroke="#8997A8" strokeWidth="2" strokeDasharray="4 4" className="arch-line" />
            </svg>

            {/* Nodes */}
            <div className="arch-node arch-node-CLOUD absolute top-1/2 left-[10%] -translate-y-1/2 w-32 h-32 border-2 border-[#22D3EE] rounded-full flex flex-col items-center justify-center font-mono text-sm">
              <span>CLOUD</span>
              <span className="text-[10px] text-[#8997A8]">VPC</span>
            </div>

            <div className="arch-node arch-node-WEB absolute top-1/2 left-[30%] -translate-y-1/2 w-24 h-24 bg-[#0E1825] border border-[#8997A8] rounded-xl flex items-center justify-center font-mono text-sm z-10">
              WEB
            </div>

            <div className="arch-node arch-node-AUTH absolute top-[25%] left-[50%] -translate-y-1/2 w-24 h-24 bg-[#0E1825] border border-[#8997A8] rounded-xl flex items-center justify-center font-mono text-sm z-10">
              AUTH
            </div>

            <div className="arch-node arch-node-API absolute top-[75%] left-[50%] -translate-y-1/2 w-24 h-24 bg-[#0E1825] border border-[#8997A8] rounded-xl flex flex-col items-center justify-center font-mono text-sm z-10">
              <span>API</span>
              <span className="arch-input opacity-0 text-[10px] text-[#F5A623] mt-1">/INPUT</span>
            </div>

            <div className="arch-node arch-node-DATABASE absolute top-1/2 right-[10%] -translate-y-1/2 w-32 h-32 bg-[#0E1825] border border-[#8997A8] rounded-xl flex flex-col items-center justify-center font-mono text-sm z-10">
              <span>DATABASE</span>
              <span className="text-[10px] opacity-70">PII / PHI</span>
            </div>

            {/* Adversarial Signal */}
            <div className="adv-signal absolute w-4 h-4 bg-[#FF4D4D] rounded-full z-20 shadow-[0_0_15px_#FF4D4D] opacity-0" />
          </div>
        </div>

        {/* Typography 1 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-4">
          <h2 className="text-no-scanner absolute text-5xl md:text-8xl font-bold tracking-tighter text-center opacity-0 -translate-y-16">
            WE DON&apos;T RUN<br/>A SCANNER
          </h2>
          <h2 className="text-pen-test absolute text-5xl md:text-8xl font-bold tracking-tighter text-center opacity-0 translate-y-16 text-[#FF4D4D]">
            AND CALL IT<br/>A PEN TEST.
          </h2>
        </div>

        {/* Vectors */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 pointer-events-none z-20">
          {["APPLICATION LOGIC", "ACCESS CONTROL", "ATTACK CHAIN", "PRIVILEGE PATH", "BUSINESS IMPACT"].map((vec, i) => (
            <div key={i} className="tech-vector opacity-0 font-mono text-2xl md:text-4xl lg:text-5xl font-bold tracking-widest text-[#22D3EE] border-b border-[#22D3EE]/30 pb-2">
              {vec}
            </div>
          ))}
        </div>

        {/* Final Statement */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none z-30">
          <h1 className="text-find text-7xl md:text-[10vw] font-bold tracking-tighter opacity-0 leading-none">FIND IT.</h1>
          <h1 className="text-prove text-7xl md:text-[10vw] font-bold tracking-tighter opacity-0 leading-none text-[#FF4D4D]">PROVE IT.</h1>
          <h1 className="text-fix text-7xl md:text-[10vw] font-bold tracking-tighter opacity-0 leading-none text-[#34D399]">FIX IT.</h1>
        </div>

      </section>
    </div>
  );
}
