"use client";
import React, { useRef } from 'react';
import { gsap } from '@/lib/animations/gsap';
import { useIsomorphicLayoutEffect } from '@/lib/hooks/useIsomorphicLayoutEffect';
import SecurithumCore from '../core/SecurithumCore';

export default function SignalAcquisition({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, { opacity: 0, duration: 1, onComplete });
        }
      });

    // Initial silence
    tl.to({}, { duration: 1 });

    // Tiny cyan point appears
    tl.to(".signal-point", { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" })
      .to(".signal-text", { opacity: 1, duration: 0.5 }, "-=0.2");

    // Point pulses
    tl.to(".signal-point", { scale: 1.5, opacity: 0.5, yoyo: true, repeat: 3, duration: 0.2 });

    // Thin horizontal signal line travels
    tl.to(".signal-point", { scale: 0, opacity: 0, duration: 0.2 })
      .to(".signal-text", { opacity: 0, duration: 0.2 }, "<")
      .to(".signal-line", { width: "100%", duration: 1, ease: "power2.inOut" });

    // Technical messages appear
    tl.to(".tech-msg", { opacity: 1, stagger: 0.2, duration: 0.5 });

    // Signal line becomes unstable
    tl.to(".signal-line", { y: () => Math.random() * 20 - 10, yoyo: true, repeat: 10, duration: 0.05 })
      .to(".signal-line", { opacity: 0, duration: 0.2 });

    // Disconnected points appear
    tl.to(".tech-msg", { opacity: 0, duration: 0.3 })
      .to(".disconnected-point", { opacity: 1, scale: 1, stagger: 0.1, duration: 0.4, ease: "back.out(1.5)" });

    // Text: YOUR ORGANISATION IS ALREADY GENERATING SIGNALS.
    tl.to(".story-text-1", { opacity: 1, y: 0, duration: 0.8 })
      .to({}, { duration: 1.5 })
      .to(".story-text-1", { opacity: 0, y: -20, duration: 0.5 });

    // Text: THE QUESTION IS WHETHER YOU CAN SEE THEM.
    tl.to(".story-text-2", { opacity: 1, y: 0, duration: 0.8 })
      .to({}, { duration: 1.5 });

    // Core begins forming
    tl.to(".story-text-2", { opacity: 0, y: -20, duration: 0.5 }, "+=0.5")
      .to(".core-wrapper", { opacity: 0.3, scale: 1, duration: 2, ease: "power2.out" })
      .to({}, { duration: 1 }); // Hold before passing to hero

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[200] bg-[#05080D] flex items-center justify-center overflow-hidden font-mono text-[#F2F5F7]">
      
      {/* Initial Signal */}
      <div className="absolute flex flex-col items-center gap-4">
        <div className="signal-point w-2 h-2 rounded-full bg-[#22D3EE] opacity-0 scale-0" />
        <div className="signal-text text-xs tracking-widest text-[#22D3EE] opacity-0">SIGNAL DETECTED</div>
      </div>

      {/* Signal Line */}
      <div className="absolute left-0 w-0 h-[1px] bg-[#22D3EE] signal-line" />

      {/* Technical Messages */}
      <div className="absolute left-8 bottom-8 md:left-16 md:bottom-16 flex flex-col gap-2 text-xs text-[#8997A8]">
        <div className="tech-msg opacity-0">REGION / UK + INDIA</div>
        <div className="tech-msg opacity-0">SYSTEM / SECURITHUM</div>
        <div className="tech-msg opacity-0">FRAMEWORK INDEX / 068</div>
        <div className="tech-msg opacity-0">SERVICE NODES / 036</div>
        <div className="tech-msg opacity-0">PLATFORM MODULES / 012</div>
        <div className="tech-msg opacity-0 text-[#22D3EE]">STATUS / INITIALISING</div>
      </div>

      {/* Disconnected Points */}
      <div className="absolute inset-0">
        {[
          { label: "RISK", top: "20%", left: "20%" },
          { label: "ASSET", top: "70%", left: "15%" },
          { label: "VENDOR", top: "15%", left: "80%" },
          { label: "POLICY", top: "80%", left: "75%" },
          { label: "CONTROL", top: "40%", left: "90%" },
          { label: "INCIDENT", top: "60%", left: "30%" },
          { label: "EVIDENCE", top: "30%", left: "60%" },
          { label: "FRAMEWORK", top: "85%", left: "50%" }
        ].map((node, i) => (
          <div 
            key={i} 
            className="disconnected-point absolute flex flex-col items-center gap-2 opacity-0 scale-0"
            style={{ top: node.top, left: node.left }}
          >
            <div className="w-1 h-1 rounded-full bg-[#FF4D4D] animate-pulse" />
            <span className="text-[10px] text-[#8997A8]">{node.label}</span>
          </div>
        ))}
      </div>

      {/* Story Text */}
      <div className="absolute inset-0 flex items-center justify-center text-center font-sans">
        <h2 className="story-text-1 text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight opacity-0 translate-y-4 max-w-2xl px-6">
          YOUR ORGANISATION<br/>IS ALREADY<br/>GENERATING SIGNALS.
        </h2>
        <h2 className="story-text-2 absolute text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight opacity-0 translate-y-4 max-w-2xl px-6 text-[#22D3EE]">
          THE QUESTION IS<br/>WHETHER YOU<br/>CAN SEE THEM.
        </h2>
      </div>

      {/* Core Formation */}
      <div className="core-wrapper absolute inset-0 flex items-center justify-center opacity-0 scale-50 pointer-events-none">
        <div className="w-[70vmin] h-[70vmin]">
          <SecurithumCore state="FRAGMENTED" />
        </div>
      </div>
    </div>
  );
}
