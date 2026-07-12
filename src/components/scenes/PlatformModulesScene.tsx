"use client";
import React, { useRef } from 'react';
import { gsap } from '@/lib/animations/gsap';
import { useIsomorphicLayoutEffect } from '@/lib/hooks/useIsomorphicLayoutEffect';
import { modules } from '@/data/modules';
import SecurithumCore from '../core/SecurithumCore';

// Color palette cycling per module
const moduleColors = [
  "#22D3EE", // cyan
  "#34D399", // green
  "#F5A623", // amber
  "#FF4D4D", // red
  "#A78BFA", // purple
  "#00B8D4", // primary cyan
  "#22D3EE",
  "#34D399",
  "#F5A623",
  "#FF4D4D",
  "#A78BFA",
  "#00B8D4",
];

export default function PlatformModulesScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!sceneRef.current) return;

    const ctx = gsap.context(() => {
      // For each module card, create a reveal step
      const moduleCards = gsap.utils.toArray<HTMLElement>(".mod-card");
      const totalModules = moduleCards.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          pin: true,
          start: "top top",
          end: `+=${totalModules * 100}%`,
          scrub: 1,
        }
      });

      // Initial state: all cards hidden
      gsap.set(moduleCards, { opacity: 0, yPercent: 30 });
      gsap.set(".mod-progress-fill", { scaleY: 0, transformOrigin: "top center" });

      // Intro
      tl.fromTo(".platform-intro-text",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
      tl.to(".platform-intro-text", { opacity: 0, y: -40, duration: 0.3 }, "+=0.3");

      // Reveal each module in sequence
      moduleCards.forEach((card, i) => {
        const nextCard = moduleCards[i + 1];
        const stepDuration = 0.8;
        const holdDuration = 0.5;

        // Show current card
        tl.to(card, { opacity: 1, yPercent: 0, duration: stepDuration, ease: "power3.out" });

        // Update progress bar
        tl.to(".mod-progress-fill", {
          scaleY: (i + 1) / totalModules,
          duration: stepDuration,
          ease: "power3.out"
        }, "<");

        // Update module number counter
        tl.to(".mod-counter", {
          innerHTML: (i + 1).toString().padStart(2, "0"),
          duration: 0.1,
          snap: { innerHTML: 1 }
        }, "<");

        tl.to({}, { duration: holdDuration }); // hold time

        // Hide current, bring in next
        if (nextCard) {
          tl.to(card, { opacity: 0, yPercent: -30, duration: stepDuration * 0.5 });
        }
      });

      // Final: all 12 done → fade to "12 MODULES. ONE PLATFORM."
      tl.to(moduleCards[moduleCards.length - 1], { opacity: 0, yPercent: -30, duration: 0.5 }, "+=0.3");
      tl.fromTo(".platform-final",
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
      );

    }, sceneRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="gsap-pin-wrapper">
      <section
        ref={sceneRef}
        className="w-full h-screen relative bg-[#05080D] text-[#F2F5F7] overflow-hidden flex items-center justify-center"
      >
        {/* Background core — subtle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] z-0">
          <div className="w-[80vh] h-[80vh]">
            <SecurithumCore state="STABLE" />
          </div>
        </div>

        {/* Grid lines for depth */}
        <div
          className="absolute inset-0 opacity-[0.04] z-0"
          style={{
            backgroundImage: "linear-gradient(#22D3EE 1px, transparent 1px), linear-gradient(90deg, #22D3EE 1px, transparent 1px)",
            backgroundSize: "80px 80px"
          }}
        />

        {/* ─── LEFT: Progress rail ─── */}
        <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-20">
          {/* Track */}
          <div className="w-[1px] h-40 bg-[#8997A8]/20 relative">
            <div className="mod-progress-fill absolute top-0 left-0 w-full bg-[#22D3EE] h-full origin-top scale-y-0" />
          </div>
          {/* Counter */}
          <div className="font-mono text-[10px] text-[#8997A8] tracking-widest flex flex-col items-center gap-0.5">
            <span className="mod-counter text-[#22D3EE] text-lg font-bold">00</span>
            <span className="text-[#8997A8]/40">/12</span>
          </div>
        </div>

        {/* ─── RIGHT: Module number badge ─── */}
        <div className="absolute right-6 md:right-12 top-8 z-20 font-mono text-right">
          <div className="text-xs text-[#8997A8] tracking-widest uppercase mb-1">PLATFORM MODULE</div>
          <div className="text-xs text-[#8997A8]/40 tracking-widest">12 TOTAL</div>
        </div>

        {/* ─── CENTER: Content stage ─── */}
        <div className="relative z-10 w-full max-w-5xl px-16 md:px-24 flex flex-col items-start justify-center h-full">

          {/* Intro Text (fades away) */}
          <div className="platform-intro-text absolute inset-0 flex flex-col items-center justify-center text-center px-8 opacity-0">
            <div className="font-mono text-xs text-[#22D3EE] tracking-widest uppercase mb-6">ENGINE 01 — THE PLATFORM</div>
            <h2 className="text-6xl md:text-9xl font-bold tracking-tighter leading-none">
              12<br /><span className="text-[#22D3EE]">MODULES.</span>
            </h2>
            <p className="text-xl text-[#8997A8] mt-8 max-w-lg font-light">
              One connected GRC platform. Built to work together, not in silos.
            </p>
          </div>

          {/* Module Cards (stacked, revealed one at a time) */}
          {modules.map((mod, i) => {
            const color = moduleColors[i];
            return (
              <div
                key={mod.id}
                className="mod-card absolute inset-0 flex items-center px-16 md:px-28 opacity-0"
              >
                <div className="w-full max-w-4xl">
                  {/* Module number + label */}
                  <div className="flex items-baseline gap-4 mb-4">
                    <span
                      className="font-mono text-[10vw] md:text-[8vw] font-bold leading-none select-none"
                      style={{ color, opacity: 0.12 }}
                    >
                      {mod.id}
                    </span>
                  </div>

                  {/* Module name */}
                  <h2
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none mb-4"
                    style={{ color }}
                  >
                    {mod.name.toUpperCase()}
                  </h2>

                  {/* Short description */}
                  <p className="text-lg md:text-2xl text-[#8997A8] font-light mb-8 max-w-xl">
                    {mod.shortDescription}
                  </p>

                  {/* Capabilities */}
                  <div className="flex flex-wrap gap-3">
                    {mod.capabilities.map((cap, j) => (
                      <div
                        key={j}
                        className="px-4 py-2 rounded-full font-mono text-xs tracking-wider border"
                        style={{
                          borderColor: `${color}40`,
                          color: color,
                          backgroundColor: `${color}0D`
                        }}
                      >
                        {cap}
                      </div>
                    ))}
                  </div>

                  {/* Decorative side line */}
                  <div
                    className="absolute left-16 md:left-24 top-0 bottom-0 w-[2px]"
                    style={{ backgroundColor: `${color}30` }}
                  />
                  <div
                    className="absolute left-16 md:left-24 top-1/3 h-24 w-[2px]"
                    style={{ backgroundColor: color }}
                  />
                </div>
              </div>
            );
          })}

          {/* Final summary */}
          <div className="platform-final absolute inset-0 flex flex-col items-center justify-center text-center px-8 opacity-0">
            <div className="font-mono text-xs text-[#22D3EE] tracking-widest uppercase mb-6">ALL MODULES. CONNECTED.</div>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none mb-6">
              12 MODULES.<br /><span className="text-[#22D3EE]">ONE PLATFORM.</span>
            </h2>
            <p className="text-xl text-[#8997A8] max-w-xl font-light leading-relaxed">
              Every module shares the same risk graph, the same control framework, and the same evidence layer. Nothing sits in a silo.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-10 max-w-3xl">
              {modules.map((mod) => (
                <div
                  key={mod.id}
                  className="px-3 py-1.5 rounded border border-[#22D3EE]/20 font-mono text-xs text-[#8997A8] hover:text-[#22D3EE] hover:border-[#22D3EE]/50 transition-colors"
                >
                  {mod.id}. {mod.name}
                </div>
              ))}
            </div>
          </div>

        </div>

      </section>
    </div>
  );
}
