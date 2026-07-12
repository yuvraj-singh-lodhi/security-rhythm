"use client";
import BentoCard from '../ui/BentoCard';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full min-h-screen py-24 px-6 md:px-16 lg:px-32 flex flex-col justify-center z-10 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-4">
          Two engines. <span className="text-primary">One outcome.</span>
        </h2>
        <p className="text-xl text-foreground/70 max-w-3xl">
          Technology without expertise is noise. Expertise without technology doesn&apos;t scale. We built both.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
        
        {/* Engine 1: Platform */}
        <BentoCard className="md:col-span-1" delay={0.1}>
          <div className="flex flex-col h-full">
            <h3 className="text-sm font-mono uppercase tracking-widest text-primary mb-2">Engine 1</h3>
            <h4 className="text-3xl font-bold mb-6">The Platform</h4>
            <p className="text-foreground/70 text-lg mb-8">
              A GRC SaaS platform that feels like a conversation, not a form. Built for non-technical users who were told &apos;we need ISO 27001&apos; yesterday.
            </p>
            <ul className="space-y-4 font-sans text-sm text-foreground/80 mt-auto">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                10-minute onboarding generates the full compliance program
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                68 frameworks at launch - incl. India DPDP Act 2023 in full
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Test once, satisfy many - one control maps to all frameworks
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Everything editable, every change audit-trailed
              </li>
            </ul>
          </div>
        </BentoCard>

        {/* Engine 2: Consulting */}
        <BentoCard className="md:col-span-1 bg-gradient-to-br from-accent/5 to-primary/5" delay={0.2}>
          <div className="flex flex-col h-full">
            <h3 className="text-sm font-mono uppercase tracking-widest text-accent mb-2">Engine 2</h3>
            <h4 className="text-3xl font-bold mb-6">The Consulting Practice</h4>
            <p className="text-foreground/70 text-lg mb-8">
              Practitioner-led services across the full security lifecycle - from strategy and certification to adversarial testing.
            </p>
            <ul className="space-y-4 font-sans text-sm text-foreground/80 mt-auto">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-accent" />
                Compliance & Advisory - ISMS, SOC 2, DPDPA, privacy, BCP
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-accent" />
                Audit & Assurance - IT audit, risk, DSPT, third-party, gaps
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-accent" />
                Technical Security - pen testing, red team, AI/ML, cloud, code
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-accent" />
                Honest assessments - we won&apos;t tell you you&apos;re fine when you&apos;re not
              </li>
            </ul>
          </div>
        </BentoCard>

        {/* Why Combination Wins */}
        <BentoCard className="md:col-span-2 border-primary/20" delay={0.3}>
          <h4 className="text-xl font-mono uppercase tracking-widest text-primary mb-4">Why the combination wins</h4>
          <p className="text-lg md:text-xl font-light text-foreground/90">
            Consulting clients graduate onto the platform to sustain what we build; platform customers escalate to consulting when they need depth. Each engine feeds the other&apos;s pipeline - a flywheel no pure-SaaS or pure-consulting competitor can copy.
          </p>
        </BentoCard>

      </div>
    </section>
  );
}
