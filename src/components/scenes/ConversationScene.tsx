"use client";
import React, { useRef } from 'react';
import { gsap } from '@/lib/animations/gsap';
import { useIsomorphicLayoutEffect } from '@/lib/hooks/useIsomorphicLayoutEffect';
import SecurithumCore from '../core/SecurithumCore';

const questions = [
  { q: "WHERE DOES\nYOUR ORGANISATION\nOPERATE?", opts: ["UK", "INDIA", "BOTH"] },
  { q: "WHAT DOES\nYOUR COMPANY\nDO?", opts: ["SAAS", "FINTECH", "HEALTH", "OTHER"] },
  { q: "WHAT DATA\nDO YOU\nHANDLE?", opts: ["PII", "PHI", "PCI", "NONE"] },
  { q: "WHO DO\nYOU SELL\nTO?", opts: ["B2B ENTERPRISE", "B2C", "GOVERNMENT"] },
  { q: "WHICH CLOUD\nDO YOU\nUSE?", opts: ["AWS", "AZURE", "GCP"] }
];

export default function ConversationScene() {
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

      // Core transforms into UI
      tl.to(".scene-core", { scale: 1.5, opacity: 0.1, duration: 1 });

      // Questions 1-5
      questions.forEach((item, i) => {
        tl.fromTo(`.q-block-${i}`, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "+=0.2")
          .to(`.q-block-${i}`, { y: -50, opacity: 0, duration: 0.5 }, "+=0.5");
      });

      // Acceleration (06 -> 14)
      tl.to(".rapid-numbers", { opacity: 1, duration: 0.2 });
      for(let i = 6; i <= 14; i++) {
        tl.to(".rapid-number", { innerHTML: i.toString().padStart(2, '0'), duration: 0.1, snap: { innerHTML: 1 } });
      }
      tl.to(".rapid-numbers", { opacity: 0, duration: 0.2 });

      // Collapse into Core
      tl.to(".scene-core", { scale: 0.6, opacity: 0.8, duration: 1 })
        .fromTo(".text-enough", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
        .to(".text-enough", { y: -50, opacity: 0, duration: 0.5 }, "+=0.5")
        .fromTo(".text-thinking", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
        .to(".text-thinking", { y: -50, opacity: 0, duration: 0.5 }, "+=0.5");

      // Generating Outputs
      tl.to(".scene-core", { rotation: 90, scale: 0.8, duration: 1 }, "-=1");
      
      const outputs = [".out-frameworks", ".out-risks", ".out-action", ".out-isms", ".out-legal"];
      outputs.forEach((out, i) => {
        tl.fromTo(out, { opacity: 0, x: i % 2 === 0 ? -20 : 20 }, { opacity: 1, x: 0, duration: 0.3 }, "-=0.1");
      });

      // Final Reveal: 30 MIN
      tl.to(outputs, { opacity: 0, duration: 1 }, "+=1")
        .to(".scene-core", { scale: 1, opacity: 0.3, duration: 1 }, "-=1")
        .fromTo(".text-final", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 });

    }, sceneRef);

    return () => ctx.revert();
  }, []);

  return (
    
      <div className="gsap-pin-wrapper">
      <section ref={sceneRef} className="w-full h-screen relative bg-[#05080D] text-[#F2F5F7] overflow-hidden flex items-center justify-center">
        
        {/* The Core Background */}
        <div className="scene-core absolute w-[80vh] h-[80vh] z-0">
          <SecurithumCore state="STABLE" />
        </div>

        {/* Questions Interface */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-6">
          {questions.map((q, i) => (
            <div key={i} className={`q-block-${i} absolute flex flex-col items-center opacity-0`}>
              <div className="font-mono text-[#00B8D4] mb-8">QUESTION {(i+1).toString().padStart(2, '0')} / 14</div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-center whitespace-pre-line leading-tight mb-12">
                {q.q}
              </h2>
              <div className="flex gap-4">
                {q.opts.map(opt => (
                  <div key={opt} className="px-6 py-3 border border-[#8997A8]/30 rounded-full font-mono text-sm tracking-widest text-[#8997A8]">
                    {opt}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Rapid Numbers */}
          <div className="rapid-numbers absolute opacity-0 font-mono text-9xl text-[#00B8D4] tracking-tighter">
            <span className="rapid-number">06</span>
          </div>

          {/* Transition Text */}
          <h2 className="text-enough absolute text-6xl md:text-8xl font-bold tracking-tighter opacity-0">THAT&apos;S<br/>ENOUGH.</h2>
          <h2 className="text-thinking absolute text-5xl md:text-7xl font-bold tracking-tighter opacity-0 text-center text-[#22D3EE]">THE PLATFORM<br/>DOES THE<br/>THINKING.</h2>
        </div>

        {/* Generating Outputs */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="w-full max-w-4xl relative h-[60vh]">
            <div className="out-frameworks absolute top-[10%] left-[10%] bg-[#0E1825] border border-[#22D3EE]/30 p-4 rounded-lg opacity-0">
              <div className="text-xs text-[#22D3EE] font-mono mb-2">FRAMEWORKS</div>
              <div className="font-bold">ISO 27001, SOC 2, UK GDPR, DPDP ACT 2023</div>
            </div>
            <div className="out-risks absolute top-[25%] right-[10%] bg-[#0E1825] border border-[#FF4D4D]/30 p-4 rounded-lg opacity-0">
              <div className="text-xs text-[#FF4D4D] font-mono mb-2">RISKS</div>
              <div className="font-bold">TOP 5 RISKS GENERATED</div>
            </div>
            <div className="out-action absolute top-[50%] left-[5%] bg-[#0E1825] border border-[#34D399]/30 p-4 rounded-lg opacity-0">
              <div className="text-xs text-[#34D399] font-mono mb-2">ACTION PLAN</div>
              <div className="font-bold">12-WEEK ROADMAP GENERATED</div>
            </div>
            <div className="out-isms absolute top-[70%] right-[15%] bg-[#0E1825] border border-[#F5A623]/30 p-4 rounded-lg opacity-0">
              <div className="text-xs text-[#F5A623] font-mono mb-2">ISMS CONTEXT</div>
              <div className="font-bold">CLAUSE 4 CONTEXT GENERATED</div>
            </div>
            <div className="out-legal absolute bottom-[5%] left-[20%] bg-[#0E1825] border border-[#8997A8]/30 p-4 rounded-lg opacity-0">
              <div className="text-xs text-[#8997A8] font-mono mb-2">LEGAL REGISTER</div>
              <div className="font-bold">APPLICABLE LAWS IDENTIFIED</div>
            </div>
          </div>
        </div>

        {/* Final 30 MIN text */}
        <div className="text-final absolute flex flex-col items-center text-center opacity-0 z-30">
          <h3 className="text-3xl md:text-5xl font-bold text-[#8997A8] mb-4">FROM SIGN-UP</h3>
          <h3 className="text-3xl md:text-5xl font-bold mb-8">TO A COMPLIANCE PROGRAM.</h3>
          <h1 className="text-8xl md:text-[12vw] font-bold tracking-tighter text-[#00B8D4] leading-none">
            30 MIN.
          </h1>
        </div>

      </section>
    </div>
  );
}
