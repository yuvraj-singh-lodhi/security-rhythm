"use client";
import React, { useRef } from 'react';
import { gsap } from '@/lib/animations/gsap';
import { useIsomorphicLayoutEffect } from '@/lib/hooks/useIsomorphicLayoutEffect';

export default function WhySecurithumScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!sceneRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          pin: true,
          start: "top top",
          end: "+=400%", // 4 statements, 400vh
          scrub: 1,
        }
      });

      // Statement 1
      tl.fromTo(".statement-1", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
        .to(".statement-1", { opacity: 0, y: -50, duration: 1 }, "+=0.5");

      // Statement 2
      tl.fromTo(".statement-2", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
        .to(".statement-2", { opacity: 0, y: -50, duration: 1 }, "+=0.5");

      // Statement 3 (Split Screen -> Merge)
      tl.fromTo(".stmt-3-left", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1 })
        .fromTo(".stmt-3-right", { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1 }, "<")
        .to([".stmt-3-left", ".stmt-3-right"], { opacity: 0, duration: 0.5 }, "+=0.5")
        .fromTo(".stmt-3-merge", { opacity: 0, scale: 1.5 }, { opacity: 1, scale: 1, duration: 1 })
        .to(".stmt-3-merge", { opacity: 0, y: -50, duration: 1 }, "+=0.5");

      // Statement 4
      tl.fromTo(".statement-4", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
        .to(".statement-4", { opacity: 0, scale: 1.1, duration: 0.5 }, "+=0.5")
        .fromTo(".text-truth", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.5)" });

    }, sceneRef);

    return () => ctx.revert();
  }, []);

  return (
    
      <div className="gsap-pin-wrapper">
      <section ref={sceneRef} className="w-full h-screen relative bg-[#05080D] text-[#F2F5F7] overflow-hidden flex items-center justify-center">

        {/* Background ambient gradient for editorial feel */}
        <div className="absolute inset-0 bg-radial-gradient from-[#0E1825] to-[#05080D] opacity-50" />

        {/* Statement 01 */}
        <div className="statement-1 absolute inset-0 flex flex-col items-center justify-center text-center px-4 opacity-0">
          <h2 className="text-6xl md:text-9xl font-bold tracking-tighter leading-none mb-8">
            WE OWN<br/>THE OUTCOME.
          </h2>
          <p className="text-xl md:text-3xl text-[#8997A8] max-w-3xl font-light">
            End-to-end ownership. From strategy through certification through ongoing assurance.
          </p>
        </div>

        {/* Statement 02 */}
        <div className="statement-2 absolute inset-0 flex flex-col items-center justify-center text-center px-4 opacity-0">
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none mb-8">
            WE KNOW WHAT<br/>REGULATORS<br/><span className="text-[#22D3EE]">ACTUALLY<br/>LOOK FOR.</span>
          </h2>
          <p className="text-lg md:text-2xl text-[#8997A8] max-w-4xl font-light font-mono uppercase tracking-widest leading-loose">
            Regulatory depth. RBI. IRDAI. SEBI. DPDPA. NHS DSPT. FCA. GDPR.
          </p>
        </div>

        {/* Statement 03 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-32 px-4">
            <h2 className="stmt-3-left text-4xl md:text-6xl font-bold tracking-tighter text-right opacity-0 text-[#8997A8]">
              TECHNOLOGY<br/>WITHOUT<br/>EXPERTISE<br/>IS NOISE.
            </h2>
            <h2 className="stmt-3-right text-4xl md:text-6xl font-bold tracking-tighter text-left opacity-0">
              EXPERTISE<br/>WITHOUT<br/>TECHNOLOGY<br/>DOESN&apos;T SCALE.
            </h2>
          </div>
          <h1 className="stmt-3-merge absolute text-6xl md:text-[8vw] font-bold tracking-tighter text-center leading-none opacity-0">
            PLATFORM<br/><span className="text-[#00B8D4]">+</span><br/>EXPERTISE
          </h1>
        </div>

        {/* Statement 04 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
          <h2 className="statement-4 absolute text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none opacity-0">
            WE WON&apos;T TELL<br/>YOU YOU&apos;RE FINE<br/><span className="text-[#FF4D4D]">WHEN<br/>YOU&apos;RE NOT.</span>
          </h2>
          <h1 className="text-truth absolute text-6xl md:text-[10vw] font-bold tracking-tighter leading-none text-[#F5A623] opacity-0">
            TRUTH<br/>OVER<br/>COMFORT.
          </h1>
        </div>

      </section>
    </div>
  );
}
