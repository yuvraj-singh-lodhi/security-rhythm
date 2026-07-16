"use client";
import { useEffect, useState } from "react";

interface Props {
  isLoaded: boolean;
}

export default function ModelPreloader({ isLoaded }: Props) {
  const [progress, setProgress] = useState(0);
  const [fading, setFading]     = useState(false);
  const [gone, setGone]         = useState(false);

  // Tick 0 → 85 over ~3 s (30 ms per step)
  useEffect(() => {
    const iv = setInterval(() => {
      setProgress((p) => {
        if (p >= 85) { clearInterval(iv); return p; }
        return p + 1;
      });
    }, 35);
    return () => clearInterval(iv);
  }, []);

  // When model is ready: jump to 100 then fade out
  useEffect(() => {
    if (!isLoaded) return;
    // Snap to 100 then start the fade after a short pause
    setProgress(100);
    const fadeTick = setTimeout(() => setFading(true), 200);
    const removeTick = setTimeout(() => setGone(true), 1100);
    return () => { clearTimeout(fadeTick); clearTimeout(removeTick); };
  }, [isLoaded]);

  if (gone) return null;

  const display = String(progress).padStart(2, "0");

  return (
    <div
      className="fixed inset-0 flex flex-col"
      style={{
        zIndex: 9999,
        // Explicit solid colour — avoids CSS-variable flash during SSR hydration
        backgroundColor: "var(--color-background, #0A0D17)",
        transition: fading ? "opacity 0.85s cubic-bezier(0.4,0,0.2,1)" : "none",
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? "none" : "all",
      }}
    >
      {/* ── Header — mirrors site header exactly ───────────────── */}
      <div
        className="w-full flex justify-between items-center px-6 md:px-12 py-6"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <span
          className="text-sm font-bold tracking-widest uppercase"
          style={{
            fontFamily: "var(--font-mono, monospace)",
            color: "var(--color-foreground)",
          }}
        >
          SECURITHUM <span style={{ opacity: 0.4, fontWeight: 400 }}>// GRC</span>
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: 10,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--color-foreground)",
            opacity: 0.35,
          }}
        >
          Initializing
        </span>
      </div>

      {/* ── Centre: big counter ─────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center select-none">
        <div className="text-center">
          {/* The actual visible number — full opacity */}
          <span
            style={{
              fontFamily: "var(--font-display, system-ui)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              fontSize: "clamp(7rem, 22vw, 16rem)",
              lineHeight: 1,
              color: "var(--color-foreground)",
              opacity: 0.06,          /* ghost — editorial depth */
            }}
          >
            {display}
          </span>

          {/* Readable percentage below the ghost */}
          <p
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: 13,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              marginTop: 16,
              color: "var(--color-primary)",
            }}
          >
            {progress}%
          </p>
        </div>
      </div>

      {/* ── Bottom progress area ────────────────────────────────── */}
      <div
        className="px-6 md:px-12 pb-10"
        style={{ paddingTop: 20 }}
      >
        {/* Label row */}
        <div className="flex justify-between items-center mb-3">
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: 9,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--color-foreground)",
              opacity: 0.3,
            }}
          >
            Loading Asset
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: 9,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-foreground)",
              opacity: 0.3,
            }}
          >
            Securithum // Regulatory Assurance Engine
          </span>
        </div>

        {/* 1-px progress track */}
        <div
          className="w-full relative overflow-hidden"
          style={{ height: 1, backgroundColor: "var(--color-border)" }}
        >
          <div
            style={{
              position: "absolute",
              top: 0, left: 0,
              height: "100%",
              width: `${progress}%`,
              backgroundColor: "var(--color-primary)",
              transition: "width 0.06s linear",
              boxShadow: "0 0 6px var(--color-primary)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
