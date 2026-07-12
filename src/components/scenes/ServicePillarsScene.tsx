"use client";
import React, { useRef } from 'react';
import { gsap } from '@/lib/animations/gsap';
import { useIsomorphicLayoutEffect } from '@/lib/hooks/useIsomorphicLayoutEffect';
import { servicePillars } from '@/data/services';

export default function ServicePillarsScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!sceneRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          pin: true,
          start: "top top",
          end: "+=500%", // Long scroll for horizontal section
          scrub: 1,
        }
      });

      // Intro Text
      tl.fromTo(".text-intro-1", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
        .to(".text-intro-1", { opacity: 0, y: -50, duration: 1 }, "+=0.5")
        .fromTo(".text-intro-2", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
        .to(".text-intro-2", { opacity: 0, y: -50, duration: 1 }, "+=0.5");

      // Reveal horizontal track
      tl.fromTo(trackRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });

      // Horizontal Scroll
      // Total width to scroll = (number of sections - 1) * 100vw
      // Since we have 4 pillars, we scroll -300vw
      tl.to(".horizontal-container", {
        xPercent: -75, // 4 items each 100vw = 400vw total width. To show the last, scroll 3 * 100vw = 75% of total width
        ease: "none",
        duration: 4
      });

    }, sceneRef);

    return () => ctx.revert();
  }, []);

  return (
    
      <div className="gsap-pin-wrapper">
      <section ref={sceneRef} className="w-full h-screen relative bg-[#05080D] text-[#F2F5F7] overflow-hidden">
        
        {/* Intro Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <h2 className="text-intro-1 absolute text-5xl md:text-8xl font-bold tracking-tighter text-center max-w-5xl opacity-0 px-4">
            SOME DECISIONS<br/>SHOULD <span className="text-[#FF4D4D]">NOT</span> BE<br/>AUTOMATED.
          </h2>
          <h2 className="text-intro-2 absolute text-5xl md:text-8xl font-bold tracking-tighter text-center opacity-0 text-[#22D3EE]">
            THAT&apos;S<br/>WHERE WE<br/>COME IN.
          </h2>
        </div>

        {/* Horizontal Track */}
        <div ref={trackRef} className="absolute inset-0 opacity-0 z-10">
          {/* We make the container wide enough to hold all 4 sections (400vw) */}
          <div className="horizontal-container flex w-[400vw] h-full">
            
            {servicePillars.map((pillar) => (
              <div key={pillar.id} className="w-[100vw] h-full flex flex-col justify-center px-12 md:px-24 lg:px-48 border-r border-[#09111C]">
                <div className="font-mono text-[#00B8D4] mb-4 text-xl">PILLAR {pillar.id}</div>
                <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none mb-8">{pillar.name}</h2>
                <p className="text-2xl text-[#8997A8] max-w-3xl mb-16 leading-relaxed">
                  {pillar.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl">
                  {pillar.services.map(svc => (
                    <div key={svc.slug} className="flex items-start gap-4">
                      <div className="mt-1 w-2 h-2 rounded-full bg-[#34D399]" />
                      <div>
                        <div className="text-xl font-bold">{svc.name}</div>
                        {svc.standards && (
                          <div className="text-xs font-mono text-[#8997A8] mt-1">{svc.standards.join(" - ")}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

          </div>
        </div>

      </section>
    </div>
  );
}
