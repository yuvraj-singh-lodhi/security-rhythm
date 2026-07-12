"use client";
import React, { useRef } from 'react';
import { gsap } from '@/lib/animations/gsap';
import { useIsomorphicLayoutEffect } from '@/lib/hooks/useIsomorphicLayoutEffect';
import SecurithumCore from '../core/SecurithumCore';
import { frameworks } from '@/data/frameworks';

export default function MarketsScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!sceneRef.current) return;

    const ctx = gsap.context(() => {
      // Ambient signal travel animation (context-scoped for cleanup)
      gsap.to(".signal-dot", { x: "40vw", duration: 2, repeat: -1, yoyo: true, ease: "power1.inOut" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          pin: true,
          start: "top top",
          end: "+=300%",
          scrub: 1,
        }
      });

      // 1. Core shrinks to a signal line
      tl.to(".scene-core", { scale: 0, opacity: 0, duration: 1 })
        .fromTo(".signal-bridge", { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 1 }, "<")
        .fromTo(".market-uk", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.5 })
        .fromTo(".market-in", { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.5 }, "<");

      // 2. Frameworks appear
      tl.to(".fw-uk", { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, "+=0.5")
        .to(".fw-in", { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, "<");

      // 3. Typography
      tl.to([".market-uk", ".market-in", ".signal-bridge", ".signal-dot"], { opacity: 0.2, duration: 1 }, "+=1")
        .to([".fw-uk", ".fw-in"], { opacity: 0, duration: 0.5 }, "<")
        .fromTo(".text-global", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo(".text-local", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, "+=0.5");

      // 4. UK <-> INDIA
      tl.to([".text-global", ".text-local"], { opacity: 0, y: -50, duration: 1 }, "+=1")
        .fromTo(".text-uk-in", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 1 });

    }, sceneRef);

    return () => ctx.revert();
  }, []);

  return (
    
      <div className="gsap-pin-wrapper">
      <section ref={sceneRef} className="w-full h-screen relative bg-[#05080D] text-[#F2F5F7] overflow-hidden flex items-center justify-center">
        
        {/* Core converting to signal line */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="scene-core w-[40vw] h-[40vw] sm:w-[35vw] sm:h-[35vw] md:w-[35vh] md:h-[35vh] opacity-30">
            <SecurithumCore state="STABLE" />
          </div>
          <div className="signal-bridge absolute h-[2px] w-[50vw] bg-[#0E1825] opacity-0 overflow-hidden">
            <div className="signal-dot absolute w-32 h-[2px] bg-gradient-to-r from-transparent via-[#22D3EE] to-transparent -left-16" />
          </div>
        </div>

        {/* Markets & Frameworks */}
        <div className="absolute inset-0 flex items-center justify-between px-12 md:px-32 pointer-events-none z-10">
          {/* UK */}
          <div className="flex flex-col items-start w-1/3">
            <h2 className="market-uk text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter opacity-0 mb-4 sm:mb-12">UK</h2>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {frameworks.uk_eu.map((fw, i) => (
                <div key={i} className="fw-uk opacity-0 translate-y-4 px-2 sm:px-4 py-1 sm:py-2 border border-[#8997A8]/30 bg-[#0E1825]/50 rounded font-mono text-[10px] sm:text-xs">
                  {fw}
                </div>
              ))}
            </div>
          </div>

          {/* INDIA */}
          <div className="flex flex-col items-end w-1/3 text-right">
            <h2 className="market-in text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter opacity-0 mb-4 sm:mb-12">INDIA</h2>
            <div className="flex flex-wrap gap-1 sm:gap-2 justify-end">
              {frameworks.india.map((fw, i) => (
                <div key={i} className="fw-in opacity-0 translate-y-4 px-2 sm:px-4 py-1 sm:py-2 border border-[#8997A8]/30 bg-[#0E1825]/50 rounded font-mono text-[10px] sm:text-xs text-[#34D399]">
                  {fw}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Typography */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 px-4">
          <h2 className="text-global absolute text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-center opacity-0 -translate-y-16 px-4">
            GLOBAL<br/>STANDARDS.
          </h2>
          <h2 className="text-local absolute text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-center opacity-0 translate-y-24 text-[#22D3EE] px-4">
            LOCAL<br/>REGULATORY<br/>DEPTH.
          </h2>

          <h1 className="text-uk-in absolute text-[14vw] sm:text-[12vw] font-bold tracking-tighter opacity-0 text-center px-4">
            UK <span className="text-[#8997A8] font-light mx-2 sm:mx-4">↔</span> INDIA
          </h1>
        </div>

      </section>
    </div>
  );
}
