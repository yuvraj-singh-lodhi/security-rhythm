"use client";
import React, { useRef } from 'react';
import { gsap } from '@/lib/animations/gsap';
import { useIsomorphicLayoutEffect } from '@/lib/hooks/useIsomorphicLayoutEffect';
import SecurithumCore from '../core/SecurithumCore';

export default function RegulatoryClockScene() {
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

      // 1. Timers appear
      tl.fromTo(".timer-gdpr", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 })
        .fromTo(".timer-certin", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 }, "+=0.2");

      // Text 1
      tl.fromTo(".text-clock", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 }, "+=0.5");

      // Timers "tick" visually (we'll just scale/pulse them or change the text via generic counter, but scrubbing handles it best if we animate the numbers slightly)
      tl.to(".timer-gdpr .num", { innerHTML: 71, duration: 0.1, snap: { innerHTML: 1 } }, "+=0.5")
        .to(".timer-certin .num", { innerHTML: 5, duration: 0.1, snap: { innerHTML: 1 } }, "<");

      // 2. Incident Node appears + Text leaves
      tl.to(".text-clock", { opacity: 0, y: -50, duration: 0.5 })
        .to([".timer-gdpr", ".timer-certin"], { scale: 0.5, y: -200, opacity: 0.5, duration: 1 }, "<")
        .fromTo(".incident-node", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 }, "+=0.2");

      // 3. Core activates + Actions fire
      tl.to(".scene-core", { scale: 1, opacity: 0.3, duration: 1 }, "-=0.2")
        .to(".action-item", { opacity: 1, x: 0, duration: 0.5, stagger: 0.2 });

      // 4. Closing Statement
      tl.to([".incident-node", ".action-list"], { opacity: 0, duration: 0.5 }, "+=1")
        .fromTo(".text-know-1", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 })
        .fromTo(".text-know-2", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "+=0.2")
        .fromTo(".text-know-3", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "+=0.2");

    }, sceneRef);

    return () => ctx.revert();
  }, []);

  return (
    
      <div className="gsap-pin-wrapper">
      <section ref={sceneRef} className="w-full h-screen relative bg-[#05080D] text-[#F2F5F7] overflow-hidden flex items-center justify-center">
        
        {/* The Core Background */}
        <div className="scene-core absolute w-[70vw] h-[70vw] sm:w-[60vw] sm:h-[60vw] md:w-[70vh] md:h-[70vh] opacity-0 scale-50 z-0">
          <SecurithumCore state="INCIDENT" />
        </div>

        {/* Timers */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 sm:gap-12 z-10 pointer-events-none">
          <div className="timer-gdpr flex flex-col items-center opacity-0">
            <h2 className="text-5xl sm:text-7xl md:text-9xl font-mono font-bold tracking-tighter text-[#FF4D4D]"><span className="num">72</span>:00:00</h2>
            <div className="text-base sm:text-xl md:text-2xl font-bold tracking-widest text-[#8997A8] mt-1 sm:mt-2">GDPR</div>
          </div>
          <div className="timer-certin flex flex-col items-center opacity-0">
            <h2 className="text-5xl sm:text-7xl md:text-9xl font-mono font-bold tracking-tighter text-[#F5A623]">0<span className="num">6</span>:00:00</h2>
            <div className="text-base sm:text-xl md:text-2xl font-bold tracking-widest text-[#8997A8] mt-1 sm:mt-2">CERT-IN</div>
          </div>
        </div>

        {/* First Text */}
        <h2 className="text-clock absolute text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-center max-w-5xl opacity-0 z-20 px-4">
          WHEN SOMETHING<br/>GOES WRONG,<br/><span className="text-[#FF4D4D]">THE CLOCK<br/>DOESN&apos;T WAIT.</span>
        </h2>

        {/* Incident Node */}
        <div className="incident-node absolute z-20 bg-[#0E1825] border-2 border-[#FF4D4D] p-6 rounded-2xl flex flex-col items-center gap-2 opacity-0">
          <div className="w-4 h-4 rounded-full bg-[#FF4D4D] animate-pulse" />
          <h3 className="font-mono text-xl font-bold text-[#FF4D4D]">INCIDENT-0081</h3>
          <div className="text-xs font-bold tracking-widest text-[#F2F5F7]">SEVERITY / HIGH</div>
        </div>

        {/* Playbook Actions */}
        <div className="action-list absolute left-4 sm:left-8 md:left-24 top-1/2 -translate-y-1/2 flex flex-col gap-2 sm:gap-4 font-mono text-xs sm:text-sm tracking-widest z-20">
          <div className="action-item flex items-center gap-2 sm:gap-3 opacity-0 -translate-x-12"><span className="text-[#34D399]">✓</span> PLAYBOOK STARTED</div>
          <div className="action-item flex items-center gap-2 sm:gap-3 opacity-0 -translate-x-12"><span className="text-[#34D399]">✓</span> OWNER ASSIGNED</div>
          <div className="action-item hidden sm:flex items-center gap-2 sm:gap-3 opacity-0 -translate-x-12"><span className="text-[#34D399]">✓</span> LEGAL REVIEW</div>
          <div className="action-item hidden sm:flex items-center gap-2 sm:gap-3 opacity-0 -translate-x-12"><span className="text-[#34D399]">✓</span> REGULATORY IMPACT CHECK</div>
          <div className="action-item hidden sm:flex items-center gap-2 sm:gap-3 opacity-0 -translate-x-12"><span className="text-[#34D399]">✓</span> NOTIFICATION DEADLINE TRACKED</div>
        </div>

        {/* Closing Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center font-bold tracking-tighter text-3xl sm:text-5xl md:text-8xl leading-tight z-30 pointer-events-none px-4">
          <h2 className="text-know-1 opacity-0">KNOW WHAT HAPPENED.</h2>
          <h2 className="text-know-2 opacity-0 text-[#8997A8]">KNOW WHO OWNS IT.</h2>
          <h2 className="text-know-3 opacity-0 text-[#22D3EE]">KNOW WHAT HAPPENS NEXT.</h2>
        </div>

      </section>
    </div>
  );
}
