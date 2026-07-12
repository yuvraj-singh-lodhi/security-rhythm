"use client";
import React, { useRef } from 'react';
import { gsap } from '@/lib/animations/gsap';
import { useIsomorphicLayoutEffect } from '@/lib/hooks/useIsomorphicLayoutEffect';
import SecurithumCore from '../core/SecurithumCore';

export default function TwoEnginesScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!sceneRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          pin: true,
          start: "top top",
          end: "+=300%",
          scrub: 1,
        }
      });

      // Split the core
      tl.to(".core-left-half", { xPercent: -50, duration: 1 }, 0)
        .to(".core-right-half", { xPercent: 50, duration: 1 }, 0)
        .to(".signal-bridge", { opacity: 1, width: "20vw", duration: 1 }, 0)
        .fromTo(".text-two-engines", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.5);

      // Show Engine descriptions
      tl.to(".text-two-engines", { y: -50, opacity: 0, duration: 1 }, 2)
        .fromTo(".text-one-outcome", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 2)
        .fromTo(".engine-01-desc", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, 2.5)
        .fromTo(".engine-02-desc", { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, 2.5);

      // Central thesis
      tl.to([".text-one-outcome", ".engine-01-desc", ".engine-02-desc"], { opacity: 0, duration: 1 }, 4)
        .to(".core-left-half", { opacity: 0.2, duration: 1 }, 4)
        .to(".core-right-half", { opacity: 0.2, duration: 1 }, 4)
        .fromTo(".thesis-statement-1", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 4.5)
        .fromTo(".thesis-statement-2", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 5);

      // Reconnect
      tl.to([".thesis-statement-1", ".thesis-statement-2"], { opacity: 0, duration: 0.5 }, 6.5)
        .to(".core-left-half", { xPercent: 0, opacity: 1, duration: 1 }, 7)
        .to(".core-right-half", { xPercent: 0, opacity: 1, duration: 1 }, 7)
        .to(".signal-bridge", { opacity: 0, width: "0", duration: 1 }, 7);

    }, sceneRef);

    return () => ctx.revert();
  }, []);

  return (
    
      <div className="gsap-pin-wrapper">
      <section ref={sceneRef} className="w-full h-screen relative bg-[#05080D] text-[#F2F5F7] overflow-hidden flex items-center justify-center">

        {/* The Split Cores */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="core-left-half absolute w-[60vw] h-[60vw] sm:w-[50vw] sm:h-[50vw] md:w-[55vh] md:h-[55vh] flex justify-end" style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}>
            <div className="w-full h-full absolute right-0">
               <SecurithumCore state="SPLIT" />
            </div>
          </div>

          <div className="signal-bridge absolute h-[2px] bg-[#22D3EE] opacity-0" />

          <div className="core-right-half absolute w-[60vw] h-[60vw] sm:w-[50vw] sm:h-[50vw] md:w-[55vh] md:h-[55vh] flex justify-start" style={{ clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)" }}>
            <div className="w-full h-full absolute left-0">
               <SecurithumCore state="SPLIT" />
            </div>
          </div>
        </div>

        {/* Headings */}
        <h2 className="text-two-engines absolute text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter opacity-0 text-center z-10 pointer-events-none px-4">
          TWO<br/>ENGINES.
        </h2>
        <h2 className="text-one-outcome absolute text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter opacity-0 text-center z-10 pointer-events-none text-[#22D3EE] px-4">
          ONE<br/>OUTCOME.
        </h2>

        {/* Engine 01 Description */}
        <div className="engine-01-desc absolute left-4 md:left-24 max-w-[40%] sm:max-w-xs font-sans opacity-0 z-20">
          <div className="font-mono text-xs sm:text-sm tracking-widest text-[#00B8D4] mb-1 sm:mb-2">ENGINE 01</div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">THE PLATFORM</h3>
          <p className="text-[#8997A8] leading-relaxed mb-2 sm:mb-4 text-sm sm:text-base">
            A GRC SaaS platform that feels like a conversation, not a form.
          </p>
          <ul className="text-xs sm:text-sm font-mono text-[#F2F5F7] space-y-1 sm:space-y-2">
            <li>12 connected modules.</li>
            <li>68 frameworks at launch.</li>
            <li>One Universal Control Framework.</li>
            <li>Every change audit-trailed.</li>
          </ul>
        </div>

        {/* Engine 02 Description */}
        <div className="engine-02-desc absolute right-4 md:right-24 max-w-[40%] sm:max-w-xs font-sans opacity-0 z-20 text-right">
          <div className="font-mono text-xs sm:text-sm tracking-widest text-[#34D399] mb-1 sm:mb-2">ENGINE 02</div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">THE PRACTICE</h3>
          <p className="text-[#8997A8] leading-relaxed mb-2 sm:mb-4 text-sm sm:text-base">
            Practitioner-led cybersecurity.
          </p>
          <ul className="text-xs sm:text-sm font-mono text-[#F2F5F7] space-y-1 sm:space-y-2 flex flex-col items-end">
            <li>Compliance.</li>
            <li>Advisory.</li>
            <li>Audit & Assurance.</li>
            <li>Technical security.</li>
            <li>Regulatory depth (UK + India).</li>
          </ul>
        </div>

        {/* Central Thesis */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center font-bold tracking-tighter pointer-events-none z-20 px-4">
          <h2 className="thesis-statement-1 text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-4xl leading-tight opacity-0 text-[#8997A8]">
            TECHNOLOGY<br/>AUTOMATES<br/>THE ROUTINE.
          </h2>
          <h2 className="thesis-statement-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-4xl leading-tight opacity-0 mt-6 sm:mt-8 text-[#F2F5F7]">
            PRACTITIONERS<br/>HANDLE<br/>THE DECISIONS<br/>THAT MATTER.
          </h2>
        </div>

      </section>
    </div>
  );
}
