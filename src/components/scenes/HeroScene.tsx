"use client";
import React, { useRef } from 'react';
import { gsap } from '@/lib/animations/gsap';
import { useIsomorphicLayoutEffect } from '@/lib/hooks/useIsomorphicLayoutEffect';
import SecurithumCore from '../core/SecurithumCore';

export default function HeroScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!sceneRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          pin: true,
          start: "top top",
          end: "+=600%",
          scrub: 1,
        }
      });

      tl.to(".hero-core", { rotation: 20, scale: 1.1, opacity: 1, duration: 1 })
        .to({}, { duration: 0.5 });

      tl.to(".hero-text-security", { xPercent: -150, opacity: 0, duration: 1 }, "split")
        .to(".hero-text-rhythm", { xPercent: 150, opacity: 0, duration: 1 }, "split");

      tl.fromTo(".hero-statement-1",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }, "+=0.5"
      )
      .to(".hero-core", { rotation: 40, scale: 1.2, duration: 1 }, "<")
      .to({}, { duration: 1 });

      tl.to(".hero-statement-1", { y: -50, opacity: 0, duration: 1 });

      tl.fromTo(".hero-statement-2",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }, "+=0.5"
      )
      .to(".hero-core", { rotation: 60, scale: 1.3, duration: 1 }, "<")
      .to({}, { duration: 1 });

      tl.to(".hero-statement-2", { y: -50, opacity: 0, duration: 1 });

      tl.fromTo(".hero-massive-bg",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 0.1, duration: 1.5 }, "+=0.5"
      )
      .to(".hero-core", { rotation: 90, scale: 1, duration: 1.5 }, "<")
      .fromTo(".hero-final-content",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }, "-=0.5"
      )
      .to({}, { duration: 2 });

    }, sceneRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="gsap-pin-wrapper">
      <section ref={sceneRef} className="overflow-hidden w-full h-screen flex items-center justify-center relative bg-[#05080D] text-[#F2F5F7]">

        {/* Massive Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
          <h1 className="hero-massive-bg text-[18vw] sm:text-[15vw] font-bold tracking-tighter opacity-0 whitespace-nowrap text-center text-[#22D3EE]">
            SECURITHUM
          </h1>
        </div>

        {/* The Core */}
        <div className="hero-core absolute z-10 w-[50vw] h-[50vw] sm:w-[45vw] sm:h-[45vw] md:w-[55vh] md:h-[55vh] lg:w-[65vh] lg:h-[65vh] opacity-30">
          <SecurithumCore state="HERO" />
        </div>

        {/* Narrative Text */}
        <div className="relative z-20 w-full h-full flex flex-col items-center justify-center font-sans font-bold text-center tracking-tighter px-4 sm:px-6">

          {/* Initial Statement */}
          <div className="absolute flex flex-col sm:flex-row gap-2 sm:gap-4 md:gap-8 text-4xl sm:text-5xl md:text-7xl lg:text-9xl">
            <span className="hero-text-security">SECURITY</span>
            <span className="hero-text-rhythm text-[#22D3EE]">IN RHYTHM.</span>
          </div>

          {/* Statement 1 */}
          <h2 className="hero-statement-1 absolute text-3xl sm:text-4xl md:text-6xl lg:text-8xl max-w-4xl leading-tight opacity-0 px-4">
            YOUR RISK<br/>DOESN&apos;T<br/>SIT STILL.
          </h2>

          {/* Statement 2 */}
          <h2 className="hero-statement-2 absolute text-3xl sm:text-4xl md:text-6xl lg:text-7xl max-w-5xl leading-tight opacity-0 px-4">
            YOUR<br/>COMPLIANCE<br/>SYSTEM<br/><span className="text-[#00B8D4]">SHOULDN&apos;T<br/>EITHER.</span>
          </h2>

          {/* Final Stage Content */}
          <div className="hero-final-content absolute bottom-6 sm:bottom-12 md:bottom-24 flex flex-col items-center gap-4 sm:gap-6 md:gap-8 opacity-0 w-full px-4 sm:px-6">
            <p className="text-sm sm:text-base md:text-xl font-light text-[#8997A8] max-w-2xl text-center font-sans">
              A cloud-native GRC platform and practitioner-led cybersecurity practice, designed to work together.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-[#00B8D4] text-[#05080D] font-mono text-xs sm:text-sm tracking-widest uppercase hover:bg-[#22D3EE] transition-colors">
                Explore the Platform
              </button>
              <button className="px-6 sm:px-8 py-3 sm:py-4 border border-[#00B8D4] text-[#00B8D4] font-mono text-xs sm:text-sm tracking-widest uppercase hover:bg-[#00B8D4]/10 transition-colors">
                Assess Your Security
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-2 text-[10px] sm:text-xs font-mono text-[#8997A8] tracking-widest uppercase opacity-60">
              <span>UK + INDIA</span>
              <span className="hidden sm:inline">•</span>
              <span>68 FRAMEWORKS</span>
              <span className="hidden sm:inline">•</span>
              <span>12 PLATFORM MODULES</span>
              <span className="hidden sm:inline">•</span>
              <span>4 SERVICE PILLARS</span>
            </div>
          </div>

        </div>

      </section>
    </div>
  );
}
