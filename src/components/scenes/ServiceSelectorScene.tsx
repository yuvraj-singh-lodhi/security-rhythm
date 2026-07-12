"use client";
import React, { useRef } from 'react';
import { gsap } from '@/lib/animations/gsap';
import { useIsomorphicLayoutEffect } from '@/lib/hooks/useIsomorphicLayoutEffect';
import SecurithumCore from '../core/SecurithumCore';

export default function ServiceSelectorScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!sceneRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          pin: true,
          start: "top top",
          end: "+=500%",
          scrub: 1,
        }
      });

      // Intro
      tl.fromTo(".text-not-sure", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
        .to(".text-not-sure", { opacity: 0, y: -50, duration: 1 }, "+=0.5")
        .fromTo(".text-good", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
        .to(".text-good", { opacity: 0, y: -50, duration: 1 }, "+=0.5");

      // Enter Path
      tl.to(".path-container", { opacity: 1, duration: 1 });

      // Stage 01
      tl.to(".stage-01", { opacity: 1, x: 0, duration: 0.5 })
        .to(".stage-01", { opacity: 0.2, duration: 0.5 }, "+=1");

      // Stage 02
      tl.to(".stage-02", { opacity: 1, x: 0, duration: 0.5 })
        .to(".stage-02", { opacity: 0.2, duration: 0.5 }, "+=1");

      // Stage 03 - Core Alignment
      tl.to(".stage-03", { opacity: 1, x: 0, duration: 0.5 })
        .to(".selector-core", { scale: 1, opacity: 1, rotation: 180, duration: 1.5 }, "-=0.5")
        .to(".stage-03", { opacity: 0.2, duration: 0.5 }, "+=1");

      // Stage 04
      tl.to(".stage-04", { opacity: 1, x: 0, duration: 0.5 })
        .to(".selector-core", { x: "25vw", duration: 1 }, "-=0.5") // move core aside
        .fromTo(".package-result", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 });

    }, sceneRef);

    return () => ctx.revert();
  }, []);

  return (
    
      <div className="gsap-pin-wrapper">
      <section ref={sceneRef} className="w-full h-screen relative bg-[#05080D] text-[#F2F5F7] overflow-hidden flex items-center justify-center">
        
        {/* Intro Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 px-4">
          <h2 className="text-not-sure absolute text-5xl md:text-8xl font-bold tracking-tighter text-center opacity-0">
            NOT SURE<br/>WHAT YOU<br/>NEED?
          </h2>
          <h2 className="text-good absolute text-5xl md:text-8xl font-bold tracking-tighter text-center opacity-0 text-[#34D399]">
            GOOD.<br/><span className="text-[#F2F5F7]">YOU SHOULDN&apos;T<br/>HAVE TO BE.</span>
          </h2>
        </div>

        {/* Path Container */}
        <div className="path-container absolute inset-0 flex flex-col items-start justify-center opacity-0 z-20 pl-8 md:pl-32 max-w-xl pointer-events-none">
          
          <div className="stage-01 flex gap-8 opacity-0 -translate-x-12 mb-12">
            <div className="text-6xl md:text-8xl font-bold text-[#00B8D4]">01</div>
            <div>
              <h3 className="text-2xl font-bold mb-2">SELECT A SERVICE</h3>
              <p className="text-[#8997A8]">SOC 2, ISO 27001, PEN TESTING, DPDPA, CLOUD SECURITY, ETC.</p>
            </div>
          </div>

          <div className="stage-02 flex gap-8 opacity-0 -translate-x-12 mb-12">
            <div className="text-6xl md:text-8xl font-bold text-[#00B8D4]">02</div>
            <div>
              <h3 className="text-2xl font-bold mb-2">ANSWER 10-15 QUESTIONS</h3>
              <p className="text-[#8997A8]">One question per screen. Plain English. Under five minutes.</p>
            </div>
          </div>

          <div className="stage-03 flex gap-8 opacity-0 -translate-x-12 mb-12">
            <div className="text-6xl md:text-8xl font-bold text-[#00B8D4]">03</div>
            <div>
              <h3 className="text-2xl font-bold mb-2">GET YOUR MATURITY RATING</h3>
              <p className="text-[#8997A8]">Instant scoring. Benchmarked, visual, honest.</p>
            </div>
          </div>

          <div className="stage-04 flex gap-8 opacity-0 -translate-x-12">
            <div className="text-6xl md:text-8xl font-bold text-[#00B8D4]">04</div>
            <div>
              <h3 className="text-2xl font-bold mb-2">RECEIVE YOUR PACKAGE</h3>
              <p className="text-[#8997A8]">Maturity, need, recommended service, indicative scope.</p>
            </div>
          </div>

        </div>

        {/* Visual Maturity Instrument (Core) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="selector-core w-[60vh] h-[60vh] opacity-0 scale-50">
            <SecurithumCore state="STABLE" />
          </div>
        </div>

        {/* Final Package Result UI */}
        <div className="package-result absolute inset-0 flex items-center justify-center md:justify-end md:pr-32 pointer-events-auto z-40 opacity-0 scale-95">
          <div className="bg-[#0E1825] border border-[#22D3EE]/30 p-8 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="font-mono text-xs text-[#8997A8] tracking-widest mb-1">RECOMMENDED SERVICE</div>
                <div className="text-2xl font-bold">SOC 2 Readiness + Audit</div>
              </div>
              <div className="bg-[#F5A623]/10 text-[#F5A623] px-3 py-1 font-mono text-xs rounded border border-[#F5A623]/30">
                MATURITY / 42%
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <div>
                <div className="font-mono text-[10px] text-[#8997A8] tracking-widest mb-1">INDICATIVE SCOPE</div>
                <div className="text-sm">Gap Analysis, Type I Audit Prep, Continuous Monitoring.</div>
              </div>
              <div>
                <div className="font-mono text-[10px] text-[#8997A8] tracking-widest mb-1">ESTIMATED TIMELINE</div>
                <div className="text-sm">12 Weeks</div>
              </div>
            </div>

            <button className="w-full bg-[#00B8D4] text-[#05080D] font-mono text-sm tracking-widest uppercase py-4 hover:bg-[#22D3EE] transition-colors">
              ASSESS YOUR SECURITY
            </button>
            <p className="text-xs text-center text-[#8997A8] mt-4 font-mono">
              Get a maturity snapshot before speaking to anyone.
            </p>
          </div>
        </div>

      </section>
    </div>
  );
}
