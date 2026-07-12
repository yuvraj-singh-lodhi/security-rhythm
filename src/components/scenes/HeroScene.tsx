"use client";
import React, { useRef } from 'react';
import { gsap } from '@/lib/animations/gsap';
import { useIsomorphicLayoutEffect } from '@/lib/hooks/useIsomorphicLayoutEffect';
import SecurithumCore from '../core/SecurithumCore';

export default function HeroScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  
  useIsomorphicLayoutEffect(() => {
    if (!sceneRef.current) return;
    
    // We target elements inside the scene
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

      // Initial state: Core is mostly hidden (opacity, or masked), we'll simulate it by scaling up and brightening
      tl.to(".hero-core", { rotation: 20, scale: 1.1, opacity: 1, duration: 1 })
        .to({}, { duration: 0.5 }); // Wait
      
      // Step 1: Text splitting
      tl.to(".hero-text-security", { xPercent: -150, opacity: 0, duration: 1 }, "split")
        .to(".hero-text-rhythm", { xPercent: 150, opacity: 0, duration: 1 }, "split");

      // Step 2: "YOUR RISK DOESN&apos;T SIT STILL."
      tl.fromTo(".hero-statement-1", 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1 }, "+=0.5"
      )
      .to(".hero-core", { rotation: 40, scale: 1.2, duration: 1 }, "<")
      .to({}, { duration: 1 }); // Read time

      // Fade out 1
      tl.to(".hero-statement-1", { y: -50, opacity: 0, duration: 1 });

      // Step 3: "YOUR COMPLIANCE SYSTEM SHOULDN&apos;T EITHER."
      tl.fromTo(".hero-statement-2",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }, "+=0.5"
      )
      .to(".hero-core", { rotation: 60, scale: 1.3, duration: 1 }, "<")
      .to({}, { duration: 1 }); // Read time

      // Fade out 2
      tl.to(".hero-statement-2", { y: -50, opacity: 0, duration: 1 });

      // Final Stage: "SECURITHUM" massive behind Core, Supporting copy + CTAs
      tl.fromTo(".hero-massive-bg",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 0.1, duration: 1.5 }, "+=0.5"
      )
      .to(".hero-core", { rotation: 90, scale: 1, duration: 1.5 }, "<")
      .fromTo(".hero-final-content",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }, "-=0.5"
      )
      .to({}, { duration: 2 }); // Extra padding at the end to ensure scrubbing catches up before unpinning
        
    }, sceneRef);

    return () => ctx.revert();
  }, []);

  return (
    
      <div className="gsap-pin-wrapper">
      <section ref={sceneRef} className="overflow-hidden w-full h-screen flex items-center justify-center relative bg-[#05080D] text-[#F2F5F7]">
        
        {/* Massive Background Text (Final Stage) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
          <h1 className="hero-massive-bg text-[15vw] font-bold tracking-tighter opacity-0 whitespace-nowrap text-center text-[#22D3EE]">
            SECURITHUM
          </h1>
        </div>

        {/* The Core */}
        <div className="hero-core absolute z-10 w-[60vh] h-[60vh] md:w-[80vh] md:h-[80vh] opacity-30">
          <SecurithumCore state="HERO" />
        </div>

        {/* Narrative Text Layers (z-20) */}
        <div className="relative z-20 w-full h-full flex flex-col items-center justify-center font-sans font-bold text-center tracking-tighter px-6">
          
          {/* Initial Statement */}
          <div className="absolute flex flex-col md:flex-row gap-4 md:gap-8 text-5xl md:text-7xl lg:text-9xl">
            <span className="hero-text-security">SECURITY</span>
            <span className="hero-text-rhythm text-[#22D3EE]">IN RHYTHM.</span>
          </div>

          {/* Statement 1 */}
          <h2 className="hero-statement-1 absolute text-4xl md:text-6xl lg:text-8xl max-w-4xl leading-tight opacity-0">
            YOUR RISK<br/>DOESN&apos;T<br/>SIT STILL.
          </h2>

          {/* Statement 2 */}
          <h2 className="hero-statement-2 absolute text-4xl md:text-6xl lg:text-8xl max-w-5xl leading-tight opacity-0">
            YOUR<br/>COMPLIANCE<br/>SYSTEM<br/><span className="text-[#00B8D4]">SHOULDN&apos;T<br/>EITHER.</span>
          </h2>

          {/* Final Stage Content */}
          <div className="hero-final-content absolute bottom-12 md:bottom-24 flex flex-col items-center gap-8 opacity-0 w-full px-6">
            <p className="text-lg md:text-xl font-light text-[#8997A8] max-w-2xl text-center font-sans">
              A cloud-native GRC platform and practitioner-led cybersecurity practice, designed to work together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-[#00B8D4] text-[#05080D] font-mono text-sm tracking-widest uppercase hover:bg-[#22D3EE] transition-colors">
                Explore the Platform
              </button>
              <button className="px-8 py-4 border border-[#00B8D4] text-[#00B8D4] font-mono text-sm tracking-widest uppercase hover:bg-[#00B8D4]/10 transition-colors">
                Assess Your Security
              </button>
            </div>

            {/* Metadata Footer */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-xs font-mono text-[#8997A8] tracking-widest uppercase opacity-60">
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
