"use client";
import React, { useRef } from 'react';
import { gsap } from '@/lib/animations/gsap';
import { useIsomorphicLayoutEffect } from '@/lib/hooks/useIsomorphicLayoutEffect';
import SecurithumCore from '../core/SecurithumCore';
import { pricingPlans } from '@/data/pricing';

export default function PricingScene() {
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

      // 1. Opening Statements
      tl.fromTo(".text-pricing", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
        .to(".text-pricing", { opacity: 0, y: -50, duration: 1 }, "+=0.5")
        .fromTo(".text-ours", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1 })
        .to(".text-ours", { opacity: 0, duration: 1 }, "+=0.5");

      // 2. Bring in Core (Starter State) & Plan 1
      tl.to(".core-pricing", { scale: 1, opacity: 1, duration: 1 }, "-=0.5")
        .to(".plan-0", { opacity: 1, x: 0, duration: 0.5 }, "-=0.5");

      // 3. Evolve to Professional
      tl.to(".plan-0", { opacity: 0, y: -50, duration: 0.5 }, "+=1")
        .to(".core-pricing", { rotationY: 180, scale: 1.1, duration: 1 }, "<")
        .to(".plan-1", { opacity: 1, x: 0, duration: 0.5 }, "-=0.5");

      // 4. Evolve to Enterprise
      tl.to(".plan-1", { opacity: 0, y: -50, duration: 0.5 }, "+=1")
        .to(".core-pricing", { rotationY: 360, scale: 1.2, duration: 1 }, "<")
        .to(".plan-2", { opacity: 1, x: 0, duration: 0.5 }, "-=0.5");

    }, sceneRef);

    return () => ctx.revert();
  }, []);

  return (
    
      <div className="gsap-pin-wrapper">
      <section ref={sceneRef} className="w-full h-screen relative bg-[#05080D] text-[#F2F5F7] overflow-hidden flex items-center justify-center">
        
        {/* Intro Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 px-4">
          <h2 className="text-pricing absolute text-5xl md:text-8xl font-bold tracking-tighter text-center opacity-0">
            PRICING<br/>SHOULDN&apos;T<br/>REQUIRE A<br/>SALES CALL.
          </h2>
          <h2 className="text-ours absolute text-[12vw] font-bold tracking-tighter text-center opacity-0 text-[#00B8D4]">
            OURS<br/>DOESN&apos;T.
          </h2>
        </div>

        {/* Pricing Core */}
        <div className="core-pricing absolute w-[45vw] h-[45vw] sm:w-[40vw] sm:h-[40vw] md:w-[45vh] md:h-[45vh] opacity-0 scale-50 z-10 [transform-style:preserve-3d]">
          <SecurithumCore state="STABLE" />
        </div>

        {/* Plan Details Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          {pricingPlans.map((plan, i) => (
            <div key={i} className={`plan-${i} absolute flex flex-col items-center bg-[#05080D]/80 backdrop-blur-md border border-[#8997A8]/30 rounded-2xl p-6 sm:p-8 md:p-12 opacity-0 -translate-x-12 w-[min(90vw,400px)]`}>
              {plan.popular && <div className="absolute -top-4 bg-[#22D3EE] text-[#05080D] px-4 py-1 font-mono text-xs font-bold rounded-full">MOST POPULAR</div>}
              
              <h3 className="font-mono text-sm sm:text-xl tracking-widest text-[#8997A8] mb-6 sm:mb-8">{plan.name.toUpperCase()}</h3>

              <div className="flex flex-col items-center gap-1 sm:gap-2 mb-6 sm:mb-8">
                <div className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter">£ {plan.gbp}</div>
                <div className="text-lg sm:text-2xl text-[#8997A8] font-mono">₹ {plan.inr.toLocaleString()}</div>
                <div className="text-[10px] sm:text-xs tracking-widest text-[#8997A8] uppercase">PER {plan.period}</div>
              </div>

              <ul className="w-full space-y-4 font-mono text-sm">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="text-[#34D399] mt-0.5">✓</span> 
                    <span className="text-left leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 text-[10px] text-[#8997A8] uppercase tracking-widest font-mono">
                ANNUAL PLANS: 2 MONTHS FREE
              </div>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
}
