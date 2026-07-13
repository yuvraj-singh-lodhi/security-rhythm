"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Wait until mounted on client to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="w-full min-h-screen bg-background text-foreground font-sans selection:bg-foreground selection:text-background transition-colors duration-300">
      
      {/* 
        HEADER / NAVIGATION 
      */}
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
          {/* Theme switcher toggle */}
          {mounted && (
            <button 
              onClick={toggleTheme} 
              className="p-2 border border-border hover:bg-surface transition-colors rounded-sm"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                // Sun Icon
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 12.728A9 9 0 115.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              ) : (
                // Moon Icon
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          )}

          <a 
            href="#contact" 
            className="border border-border hover:border-foreground/60 px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors rounded-sm"
          >
            Access Protocol
          </a>
        </div>
      </header>

      {/* 
        HERO SECTION 
      */}
      <section className="py-20 md:py-32 px-6 md:px-12 border-b border-border max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8">
          <span className="font-mono text-xs opacity-50 uppercase tracking-widest block mb-4">
            Security in Rhythm // Continuous Assurance
          </span>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none uppercase">
            Cybersecurity <br />
            &amp; Compliance. <br />
            <span className="opacity-40">Unified.</span>
          </h1>
          <p className="opacity-70 text-sm md:text-lg max-w-2xl mt-8 leading-relaxed font-light">
            Securithum unifies continuous compliance auditing with practitioner-led technical security across the UK, India, and global markets. We map evidence once to satisfy all global frameworks automatically.
          </p>
          <div className="flex gap-4 mt-10">
            <a 
              href="#contact" 
              className="bg-foreground text-background hover:opacity-90 px-6 py-3 font-mono text-xs uppercase tracking-widest transition-opacity font-bold rounded-sm shadow-sm"
            >
              Start Diagnostic
            </a>
            <a 
              href="#modules" 
              className="border border-border hover:border-foreground px-6 py-3 font-mono text-xs uppercase tracking-widest transition-colors rounded-sm opacity-80"
            >
              Review Engine
            </a>
          </div>
        </div>
        <div className="lg:col-span-4 border border-border p-8 rounded-sm font-mono text-xs flex flex-col gap-6 bg-surface transition-colors duration-300">
          <div className="flex justify-between border-b border-border pb-3">
            <span className="opacity-55 uppercase">SYSTEM STATUS</span>
            <span className="font-bold">ACTIVE</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="opacity-55 uppercase">MAPPED FRAMEWORKS</span>
            <span className="text-2xl font-bold font-sans">68 GLOBAL DBs</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="opacity-55 uppercase">COMPLIANCE LATENCY</span>
            <span className="text-2xl font-bold font-sans">&lt; 15 SECONDS</span>
          </div>
        </div>
      </section>

      {/* 
        PROBLEM VS SOLUTION 
      */}
      <section id="about" className="py-20 md:py-28 px-6 md:px-12 border-b border-border max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="border-r border-border/0 md:border-r md:border-border pr-0 md:pr-12 transition-colors duration-300">
          <span className="font-mono text-xs opacity-50 uppercase tracking-widest block mb-4">The Friction</span>
          <h3 className="text-3xl font-bold tracking-tight uppercase">The Disconnected Organization</h3>
          <p className="opacity-70 text-sm mt-4 leading-relaxed font-light">
            Most businesses operate in fragments. Audits are done manually once a year. Technical scanning runs separate from policy frameworks. Incident logs sit in isolated storage. This disconnect builds risk and duplicates engineering workloads.
          </p>
        </div>
        <div className="pl-0 md:pl-12 flex flex-col justify-between">
          <div>
            <span className="font-mono text-xs opacity-50 uppercase tracking-widest block mb-4">The Solution</span>
            <h3 className="text-3xl font-bold tracking-tight uppercase">Symmetric Security Rhythm</h3>
            <p className="opacity-70 text-sm mt-4 leading-relaxed font-light">
              We connect policies, controls, assets, and scanning into one single GRC engine. Test once and satisfy multiple frameworks automatically (SOC2, ISO27001, GDPR, CERT-In), turning static compliance into a continuous operation.
            </p>
          </div>
        </div>
      </section>

      {/* 
        12 GRC MODULES 
      */}
      <section id="modules" className="py-20 md:py-28 px-6 md:px-12 border-b border-border max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="font-mono text-xs opacity-50 uppercase tracking-widest block mb-4">The GRC Ecosystem</span>
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">Twelve Core Control Engines</h2>
          <p className="opacity-70 text-sm mt-2 max-w-xl">
            A modular cloud-native architecture connecting all security vectors in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 border-t border-l border-border bg-border transition-colors duration-300">
          {[
            { id: "01", name: "Risk Profiling", desc: "Maps infrastructure threats to regulatory requirements automatically." },
            { id: "02", name: "Asset Registers", desc: "Auto-discovery of assets and software dependencies." },
            { id: "03", name: "Policy Constructor", desc: "Minimalist templating bound to global framework benchmarks." },
            { id: "04", name: "Control Matrix", desc: "Unified control nodes that map answers to duplicate requests." },
            { id: "05", name: "Evidence Capture", desc: "Automated API captures of configurations, logs, and screenshots." },
            { id: "06", name: "Auditor Portals", desc: "Read-only access keys for certification bodies during audits." },
            { id: "07", name: "Vulnerability Scans", desc: "Continuous external network and domain configuration checks." },
            { id: "08", name: "Access Controls", desc: "Tracks IAM matrices, onboarding checklists, and device security." },
            { id: "09", name: "Vendor Risk", desc: "Monitors third-party compliance, supply chain vectors, and DPA agreements." },
            { id: "10", name: "Incident Readiness", desc: "GDPR/CERT-In timeline monitors and workflow checklists." },
            { id: "11", name: "Trust Centers", desc: "Publicly shareable compliance and pentest certificate dashboards." },
            { id: "12", name: "GRC Mirror", desc: "Assess maturity score and gaps against localized standards." }
          ].map((m) => (
            <div key={m.id} className="p-8 bg-background hover:bg-surface transition-colors flex flex-col justify-between min-h-[180px]">
              <span className="font-mono opacity-50 text-sm block mb-4 font-bold">{m.id} //</span>
              <div>
                <h4 className="text-lg font-bold font-mono uppercase">{m.name}</h4>
                <p className="opacity-70 text-xs mt-2 leading-relaxed font-light">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 
        FRAMEWORKS 
      */}
      <section id="frameworks" className="py-20 md:py-28 px-6 md:px-12 border-b border-border max-w-7xl mx-auto flex flex-col md:flex-row gap-12 justify-between items-center">
        <div className="max-w-xl">
          <span className="font-mono text-xs opacity-50 uppercase tracking-widest block mb-4">Framework Mapping</span>
          <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">Test Once. Satisfy 68 Frameworks.</h3>
          <p className="opacity-70 text-sm mt-4 leading-relaxed font-light">
            Instead of executing duplicate tasks, map a single control to fulfill compliance across ISO 27001, SOC 2, HIPAA, GDPR, UK Cyber Essentials, India CERT-In, and the DPDP Act. Our control graph eliminates up to 80% of repetitive workflows.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 max-w-md font-mono text-[10px] tracking-wider opacity-85">
          {["ISO 27001", "SOC 2 Type II", "GDPR", "HIPAA", "UK Cyber Essentials", "India CERT-In", "DPDP Act", "NIST CSF", "PCI DSS", "ISO 27701"].map((f) => (
            <span key={f} className="border border-border px-3 py-1.5 rounded-sm bg-surface transition-colors duration-300">{f}</span>
          ))}
        </div>
      </section>

      {/* 
        PRICING 
      */}
      <section id="pricing" className="py-20 md:py-28 px-6 md:px-12 border-b border-border max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-mono text-xs opacity-50 uppercase tracking-widest block mb-4">Command Core Pricing</span>
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">Symmetric Pricing Packages</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Starter", subtitle: "For Growing Startups", price: "$499", desc: "Core GRC mapping, asset register, policies builder, and basic framework mappings to establish compliance.", action: "Deploy Starter" },
            { name: "Professional", subtitle: "For Scaling Orgs", price: "$1,199", desc: "Continuous automated verification integrations, regulatory clocks, active vulnerability checks, and auditor keys.", action: "Deploy Pro", popular: true },
            { name: "Enterprise", subtitle: "For Regulated Orgs", price: "Custom", desc: "Custom framework mappings, AI-powered compliance tools, dedicated GRC advisors, and private trust portals.", action: "Request Proposal" }
          ].map((plan) => (
            <div 
              key={plan.name} 
              className={`border p-8 flex flex-col justify-between min-h-[380px] rounded-sm relative bg-surface transition-colors duration-300 ${plan.popular ? "border-foreground" : "border-border"}`}
            >
              {plan.popular && (
                <span className="absolute top-4 right-4 font-mono text-[8px] bg-foreground text-background px-1.5 py-0.5 uppercase tracking-widest font-bold">Popular</span>
              )}
              <div>
                <span className="font-mono text-[10px] opacity-50 uppercase font-bold">{plan.subtitle}</span>
                <h4 className="text-2xl font-bold font-mono uppercase mt-2">{plan.name}</h4>
                <p className="opacity-70 text-xs mt-4 leading-relaxed font-light">{plan.desc}</p>
              </div>
              <div className="pt-8 border-t border-border mt-8">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold font-mono">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-[10px] opacity-55 uppercase">/ month</span>}
                </div>
                <a 
                  href="#contact" 
                  className={`w-full block text-center font-mono text-[10px] uppercase tracking-widest py-3 font-bold rounded-sm border transition-colors duration-300 ${plan.popular ? "bg-foreground text-background border-foreground hover:opacity-85" : "bg-transparent text-foreground border-border hover:border-foreground/60"}`}
                >
                  {plan.action}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 
        CONTACT / ACCESS PROTOCOL 
      */}
      <section id="contact" className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center max-w-xl">
          <span className="font-mono text-xs opacity-50 uppercase tracking-widest block mb-4">Access Protocol</span>
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">Initiate Security Review</h2>
          <p className="opacity-70 text-xs md:text-sm mt-4 leading-relaxed font-light">
            Provide your email coordinate. A practitioner will follow up to assess your GRC parameters and compile a custom compliance report.
          </p>

          {!submitted ? (
            <form onSubmit={handleContact} className="mt-10 flex flex-col md:flex-row gap-3 w-full">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL ADDRESS" 
                className="flex-grow bg-surface border border-border text-foreground placeholder-foreground/30 px-4 py-3 text-xs font-mono uppercase tracking-widest focus:outline-none focus:border-foreground/50 rounded-sm transition-colors duration-300"
              />
              <button 
                type="submit" 
                className="bg-foreground text-background hover:opacity-85 px-6 py-3 font-mono text-xs uppercase tracking-widest font-bold transition-opacity rounded-sm shadow-sm"
              >
                REQUEST AUDIT
              </button>
            </form>
          ) : (
            <div className="mt-10 bg-surface border border-border p-6 text-center rounded-sm max-w-md mx-auto transition-colors duration-300">
              <p className="font-mono text-xs opacity-85 uppercase tracking-widest font-bold">Protocol initiated successfully.</p>
              <p className="text-[10px] opacity-55 font-mono mt-1 uppercase">A GRC advisor will contact you within 24 hours.</p>
            </div>
          )}
        </div>
      </section>

      {/* 
        FOOTER 
      */}
      <footer className="border-t border-border py-12 px-6 md:px-12 bg-background max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[10px] opacity-55 uppercase tracking-widest transition-colors duration-300">
        <div>
          <span className="font-bold opacity-100 text-foreground">SECURITHUM</span> // REGULATORY ASSURANCE ENGINE
        </div>
        <div className="flex gap-6">
          <a href="#about" className="hover:opacity-100 transition-opacity">About</a>
          <a href="#modules" className="hover:opacity-100 transition-opacity">Modules</a>
          <a href="#frameworks" className="hover:opacity-100 transition-opacity">Frameworks</a>
        </div>
      </footer>

    </div>
  );
}
