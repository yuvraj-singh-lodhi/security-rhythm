"use client";
import React, { useRef } from 'react';
import { gsap } from '@/lib/animations/gsap';
import { useIsomorphicLayoutEffect } from '@/lib/hooks/useIsomorphicLayoutEffect';
import SecurithumCore from '../core/SecurithumCore';

export default function FinalRhythmScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!sceneRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true
        }
      });

      // 1. Initial State
      tl.to(".core-final", { scale: 1, opacity: 0.8, duration: 1 })
        .fromTo(".text-product", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, 0);

      // 2. "IT IS A PROGRAMME YOU BUILD."
      tl.to(".text-product", { opacity: 0, y: -50, duration: 1 }, "+=0.5")
        .fromTo(".text-build", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, "-=0.5")
        .to(".core-final", { scale: 1.1, duration: 1 }, "<");

      // 3. "AND SUSTAIN."
      tl.to(".text-build", { opacity: 0, y: -50, duration: 1 }, "+=0.5")
        .fromTo(".text-sustain", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, "-=0.5")
        .to(".core-final", { scale: 1.2, duration: 1 }, "<");

      // 4. Final rhythm & CTA
      tl.to(".text-sustain", { opacity: 0, scale: 1.5, duration: 1 }, "+=0.5")
        .to(".core-final", { opacity: 0.2, scale: 0.9, duration: 1 }, "-=0.5")
        .fromTo(".final-closing", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 });

    }, sceneRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="gsap-pin-wrapper">
      <section ref={sceneRef} className="w-full h-[100vh] relative bg-[#05080D] text-[#F2F5F7] overflow-hidden flex items-center justify-center">
      
      {/* The Core (Complete) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="core-final w-[75vw] h-[75vw] sm:w-[60vw] sm:h-[60vw] md:w-[80vh] md:h-[80vh] opacity-0 scale-50">
          <SecurithumCore state="COMPLETE" />
        </div>
      </div>

      {/* Story Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none z-10">
        <h2 className="text-product absolute text-4xl sm:text-5xl md:text-8xl font-bold tracking-tighter opacity-0 text-center px-4">
          SECURITY<br/>IS NOT<br/>A PRODUCT<br/>YOU BUY.
        </h2>
        <h2 className="text-build absolute text-4xl sm:text-5xl md:text-8xl font-bold tracking-tighter opacity-0 text-[#22D3EE] text-center px-4">
          IT IS A<br/>PROGRAMME<br/>YOU BUILD.
        </h2>
        <h2 className="text-sustain absolute text-5xl sm:text-6xl md:text-9xl font-bold tracking-tighter opacity-0 text-[#34D399] text-center px-4">
          AND<br/>SUSTAIN.
        </h2>
      </div>

      {/* Final Closing UI */}
      <div className="final-closing absolute inset-0 flex flex-col items-center justify-center z-20 px-6 opacity-0">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-widest text-[#00B8D4] mb-1 sm:mb-2 uppercase">SECURITHUM</h1>
        <h2 className="text-xl sm:text-2xl md:text-4xl font-light tracking-widest text-[#F2F5F7] mb-8 sm:mb-16 uppercase">SECURITY IN RHYTHM.</h2>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-8 sm:mb-16 w-full sm:w-auto px-6 sm:px-0">
          <button className="px-8 py-4 bg-[#00B8D4] text-[#05080D] font-mono text-sm tracking-widest uppercase hover:bg-[#22D3EE] transition-colors border border-transparent">
            Assess Your Security
          </button>
          <button className="px-8 py-4 bg-[#0E1825] text-[#F2F5F7] font-mono text-sm tracking-widest uppercase hover:bg-[#152336] transition-colors border border-[#8997A8]/30">
            Explore the Platform
          </button>
          <button className="px-8 py-4 bg-transparent text-[#22D3EE] font-mono text-sm tracking-widest uppercase hover:bg-[#22D3EE]/10 transition-colors border border-[#22D3EE]/50">
            Talk to a Practitioner
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 text-[#8997A8] font-mono text-sm tracking-widest">
          <a href="#" className="hover:text-[#00B8D4] transition-colors">SECURITHUM.COM</a>
          <span className="hidden md:inline">•</span>
          <a href="mailto:info@securithum.com" className="hover:text-[#00B8D4] transition-colors">INFO@SECURITHUM.COM</a>
          <span className="hidden md:inline">•</span>
          <span>MARKETS: UK + INDIA</span>
        </div>
      </div>

    </section>
    </div>
  );
}
