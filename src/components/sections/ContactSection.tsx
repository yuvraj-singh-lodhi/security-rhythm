"use client";
import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section className="relative w-full flex flex-col px-6 md:px-16 lg:px-32 py-24 z-10 bg-background overflow-hidden">
      
      <div className="mb-24">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6 text-center">
          Published. Transparent. <br/> <span className="text-primary">In two currencies.</span>
        </h2>
        <p className="text-center text-foreground/70 max-w-2xl mx-auto mb-16">
          Every competitor hides pricing behind a sales call. We put ours on the website - including INR.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors">
            <h3 className="text-xl font-mono uppercase tracking-widest text-foreground/50 mb-4">Starter</h3>
            <div className="mb-2">
              <span className="text-4xl font-bold">GBP 99</span>
            </div>
            <div className="mb-6">
              <span className="text-2xl font-bold text-primary">INR 8,000</span>
              <span className="text-sm text-foreground/50 ml-2">/ month</span>
            </div>
            <ul className="space-y-3 text-sm text-foreground/80 border-t border-white/10 pt-6">
              <li className="flex items-center gap-2">✓ Core modules + onboarding</li>
              <li className="flex items-center gap-2">✓ Up to 2 frameworks</li>
              <li className="flex items-center gap-2">✓ Email support</li>
            </ul>
          </div>

          {/* Pro */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-primary/10 to-transparent border border-primary relative transform md:-translate-y-4 shadow-[0_0_30px_rgba(0,229,255,0.1)]">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-background px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Most Popular
            </div>
            <h3 className="text-xl font-mono uppercase tracking-widest text-foreground/50 mb-4">Professional</h3>
            <div className="mb-2">
              <span className="text-5xl font-bold">GBP 199</span>
            </div>
            <div className="mb-6">
              <span className="text-3xl font-bold text-primary">INR 15,000</span>
              <span className="text-sm text-foreground/50 ml-2">/ month</span>
            </div>
            <ul className="space-y-3 text-sm text-foreground/80 border-t border-white/10 pt-6">
              <li className="flex items-center gap-2">✓ All modules</li>
              <li className="flex items-center gap-2">✓ Unlimited frameworks</li>
              <li className="flex items-center gap-2">✓ Vendor + contract intelligence</li>
              <li className="flex items-center gap-2">✓ Priority support</li>
            </ul>
          </div>

          {/* Enterprise */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors">
            <h3 className="text-xl font-mono uppercase tracking-widest text-foreground/50 mb-4">Enterprise</h3>
            <div className="mb-2">
              <span className="text-4xl font-bold">GBP 399</span>
            </div>
            <div className="mb-6">
              <span className="text-2xl font-bold text-primary">INR 25,000</span>
              <span className="text-sm text-foreground/50 ml-2">/ month</span>
            </div>
            <ul className="space-y-3 text-sm text-foreground/80 border-t border-white/10 pt-6">
              <li className="flex items-center gap-2">✓ Everything in Professional</li>
              <li className="flex items-center gap-2">✓ Auditor portal + Trust Center</li>
              <li className="flex items-center gap-2">✓ API + CRM integrations</li>
              <li className="flex items-center gap-2">✓ Onboarding assistance</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Smart Service Selector */}
      <div className="mt-12 mb-24 bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">The Smart Service Selector</h2>
        <p className="text-foreground/70 mb-12">No sales calls. Prospects qualify themselves.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-4xl font-bold text-primary opacity-50">01</span>
            <h4 className="font-bold">Select a Service</h4>
            <p className="text-sm text-foreground/60">Visit securithum.com and pick the service you care about.</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-4xl font-bold text-primary opacity-50">02</span>
            <h4 className="font-bold">Answer Questions</h4>
            <p className="text-sm text-foreground/60">A short adaptive assessment in plain English, under 5 minutes.</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-4xl font-bold text-primary opacity-50">03</span>
            <h4 className="font-bold">Maturity Rating</h4>
            <p className="text-sm text-foreground/60">An instant, benchmarked view of where you stand today.</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-4xl font-bold text-primary opacity-50">04</span>
            <h4 className="font-bold">Receive Package</h4>
            <p className="text-sm text-foreground/60">A recommended package and tier matched to your maturity.</p>
          </div>
        </div>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          className="mt-12 px-8 py-4 bg-primary text-background font-bold uppercase tracking-widest rounded-full"
        >
          Take the Assessment
        </motion.button>
      </div>

      <div className="w-full h-[1px] bg-white/10 mb-8" />

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-mono text-foreground/50">
        <p>© {new Date().getFullYear()} Securithum. All rights reserved. - UK & India Edition</p>
        <div className="flex gap-8">
          <a href="mailto:info@securithum.com" className="hover:text-primary transition-colors">info@securithum.com</a>
        </div>
      </div>
    </section>
  );
}
