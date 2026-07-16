"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import ModelPreloader from "../components/layout/ModelPreloader";

const RobotCanvas = dynamic(() => import("../components/robot/RobotCanvas"), { ssr: false });

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(""); }
  };

  return (
    <div className="w-full min-h-screen bg-background text-foreground font-sans transition-colors duration-300">

      {/* Preloader — blocks page until GLB is ready */}
      <ModelPreloader isLoaded={modelLoaded} />

      {/* Fixed robot overlay */}
      <RobotCanvas onLoaded={() => setModelLoaded(true)} />

      {/* HEADER */}
      <header className="w-full border-b border-border py-6 px-6 md:px-12 flex justify-between items-center sticky top-0 bg-background/80 backdrop-blur-md z-50 transition-colors duration-300">
        <div className="font-mono tracking-widest text-sm font-bold">
          SECURITHUM <span className="opacity-60 font-normal">// GRC</span>
        </div>

        <nav className="hidden md:flex gap-8 text-[11px] font-mono tracking-wider uppercase opacity-70">
          <a href="#about" className="hover:opacity-100 transition-opacity">About</a>
          <a href="#modules" className="hover:opacity-100 transition-opacity">Modules</a>
          <a href="#frameworks" className="hover:opacity-100 transition-opacity">Frameworks</a>
          <a href="#pricing" className="hover:opacity-100 transition-opacity">Pricing</a>
          <a href="#contact" className="hover:opacity-100 transition-opacity">Contact</a>
        </nav>

        <div className="flex items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 border border-border hover:bg-surface transition-colors rounded-sm"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 12.728A9 9 0 115.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          )}
          <a href="#contact" className="border border-border hover:border-foreground/60 px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors rounded-sm">
            Access Protocol
          </a>
        </div>
      </header>

      {/* SECTION 1 — HERO */}
      <section data-robot-section="1" className="min-h-screen py-32 px-6 md:px-12 border-b border-border max-w-7xl mx-auto flex flex-col justify-center">
        <span className="font-mono text-xs opacity-50 uppercase tracking-widest block mb-4">
          Security in Rhythm // Continuous Assurance
        </span>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none uppercase max-w-2xl">
          Cyber&shy;security <br />
          &amp; Compliance. <br />
          <span className="opacity-40">Unified.</span>
        </h1>
        <p className="opacity-70 text-sm md:text-lg max-w-xl mt-8 leading-relaxed font-light">
          Securithum unifies continuous compliance auditing with practitioner-led technical security across the UK, India, and global markets.
        </p>
        <div className="flex gap-4 mt-10">
          <a href="#contact" className="bg-foreground text-background hover:opacity-90 px-6 py-3 font-mono text-xs uppercase tracking-widest font-bold rounded-sm">
            Start Diagnostic
          </a>
          <a href="#about" className="border border-border hover:border-foreground px-6 py-3 font-mono text-xs uppercase tracking-widest rounded-sm opacity-80">
            Learn More
          </a>
        </div>
      </section>

      {/* SECTION 2 — ABOUT / PROBLEM */}
      <section id="about" data-robot-section="2" className="min-h-screen py-32 px-6 md:px-12 border-b border-border max-w-7xl mx-auto flex flex-col justify-center">
        <div className="max-w-xl w-full">
          <span className="font-mono text-xs opacity-50 uppercase tracking-widest block mb-4">The Friction</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">
            The Disconnected Organization
          </h2>
          <p className="opacity-70 text-sm mt-6 leading-relaxed font-light">
            Most businesses operate in fragments. Audits are done manually once a year. Technical scanning runs separate from policy frameworks. Incident logs sit in isolated storage. This disconnect builds risk and duplicates engineering workloads.
          </p>
          <div className="mt-12 border-t border-border pt-8">
            <span className="font-mono text-xs opacity-50 uppercase tracking-widest block mb-4">The Solution</span>
            <h3 className="text-2xl font-bold uppercase">Symmetric Security Rhythm</h3>
            <p className="opacity-70 text-sm mt-4 leading-relaxed font-light">
              We connect policies, controls, assets, and scanning into one single GRC engine. Test once and satisfy multiple frameworks automatically.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 — MODULES — text/grid LEFT, model RIGHT */}
      <section id="modules" data-robot-section="3" className="min-h-screen py-32 px-6 md:px-12 border-b border-border max-w-7xl mx-auto flex flex-col justify-center">
        <span className="font-mono text-xs opacity-50 uppercase tracking-widest block mb-4">The GRC Ecosystem</span>
        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-12 max-w-xl">Twelve Core Engines</h2>

        {/* Grid constrained to left half so model has clear right space */}
        <div className="grid grid-cols-2 gap-1 border-t border-l border-border bg-border max-w-xl">
          {[
            { id: "01", name: "Risk Profiling" },
            { id: "02", name: "Asset Registers" },
            { id: "03", name: "Policy Constructor" },
            { id: "04", name: "Control Matrix" },
            { id: "05", name: "Evidence Capture" },
            { id: "06", name: "Auditor Portals" },
            { id: "07", name: "Vulnerability Scans" },
            { id: "08", name: "Access Controls" },
            { id: "09", name: "Vendor Risk" },
            { id: "10", name: "Incident Readiness" },
            { id: "11", name: "Trust Centers" },
            { id: "12", name: "GRC Mirror" },
          ].map((m) => (
            <div key={m.id} className="p-6 bg-background hover:bg-surface transition-colors">
              <span className="font-mono opacity-40 text-xs block mb-2">{m.id} //</span>
              <h4 className="font-bold font-mono uppercase text-sm">{m.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — FRAMEWORKS */}
      <section id="frameworks" data-robot-section="4" className="min-h-screen py-32 px-6 md:px-12 border-b border-border max-w-7xl mx-auto flex flex-col justify-center">
        <div className="max-w-xl w-full">
          <span className="font-mono text-xs opacity-50 uppercase tracking-widest block mb-4">Framework Mapping</span>
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">
            Test Once.<br />Satisfy 68 Frameworks.
          </h2>
          <p className="opacity-70 text-sm mt-6 leading-relaxed font-light">
            Map a single control to fulfill compliance across ISO 27001, SOC 2, HIPAA, GDPR, UK Cyber Essentials, India CERT-In, and the DPDP Act.
          </p>
          <div className="flex flex-wrap gap-3 mt-10 font-mono text-[10px] tracking-wider opacity-80">
            {["ISO 27001", "SOC 2 Type II", "GDPR", "HIPAA", "UK Cyber Essentials", "CERT-In", "DPDP Act", "NIST CSF", "PCI DSS", "ISO 27701"].map((f) => (
              <span key={f} className="border border-border px-3 py-1.5 rounded-sm bg-surface">{f}</span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — PRICING — content CENTER-LEFT, model far RIGHT */}
      <section id="pricing" data-robot-section="5" className="min-h-screen py-32 px-6 md:px-12 border-b border-border max-w-7xl mx-auto flex flex-col justify-center">
        <span className="font-mono text-xs opacity-50 uppercase tracking-widest block mb-4">Pricing</span>
        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-12 max-w-xl">Symmetric Packages</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-xl">
          {[
            { name: "Starter", price: "$499", popular: false },
            { name: "Professional", price: "$1,199", popular: true },
            { name: "Enterprise", price: "Custom", popular: false },
          ].map((plan) => (
            <div key={plan.name} className={`border p-8 rounded-sm bg-surface relative ${plan.popular ? "border-foreground" : "border-border"}`}>
              {plan.popular && (
                <span className="absolute top-3 right-3 font-mono text-[8px] bg-foreground text-background px-1.5 py-0.5 uppercase font-bold">Popular</span>
              )}
              <h4 className="font-bold font-mono uppercase">{plan.name}</h4>
              <div className="text-2xl font-bold mt-4 font-mono">{plan.price}</div>
              {plan.price !== "Custom" && <span className="text-[10px] opacity-50 font-mono uppercase">/ month</span>}
              <a href="#contact" className={`mt-6 block text-center font-mono text-[10px] uppercase tracking-widest py-2.5 font-bold border rounded-sm transition-colors ${plan.popular ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground/60"}`}>
                Get Started
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6 — CONTACT */}
      <section id="contact" data-robot-section="6" className="min-h-screen py-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center">
        <span className="font-mono text-xs opacity-50 uppercase tracking-widest block mb-4">Access Protocol</span>
        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight max-w-xl mb-8">
          Initiate Security Review
        </h2>
        <p className="opacity-70 text-sm max-w-md leading-relaxed font-light mb-10">
          Provide your email. A practitioner will follow up to compile a custom compliance report.
        </p>

        {!submitted ? (
          <form onSubmit={handleContact} className="flex flex-col sm:flex-row gap-3 max-w-md">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="EMAIL ADDRESS"
              className="flex-grow bg-surface border border-border text-foreground placeholder-foreground/30 px-4 py-3 text-xs font-mono uppercase tracking-widest focus:outline-none focus:border-foreground/50 rounded-sm"
            />
            <button type="submit" className="bg-foreground text-background hover:opacity-85 px-6 py-3 font-mono text-xs uppercase tracking-widest font-bold rounded-sm">
              Request Audit
            </button>
          </form>
        ) : (
          <div className="bg-surface border border-border p-6 rounded-sm max-w-md">
            <p className="font-mono text-xs opacity-85 uppercase tracking-widest font-bold">Protocol initiated.</p>
            <p className="text-[10px] opacity-55 font-mono mt-1 uppercase">A GRC advisor will contact you within 24 hours.</p>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] opacity-50 uppercase tracking-widest">
        <span><strong className="opacity-100">SECURITHUM</strong> // Regulatory Assurance Engine</span>
        <div className="flex gap-6">
          <a href="#about" className="hover:opacity-100 transition-opacity">About</a>
          <a href="#modules" className="hover:opacity-100 transition-opacity">Modules</a>
          <a href="#pricing" className="hover:opacity-100 transition-opacity">Pricing</a>
        </div>
      </footer>

    </div>
  );
}
