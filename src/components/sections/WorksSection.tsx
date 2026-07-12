"use client";
import { motion } from "framer-motion";

const modules = [
  { id: "01", title: "Onboarding", desc: "Conversational setup" },
  { id: "02", title: "Org Context", desc: "ISO 27001 Clause 4" },
  { id: "03", title: "Risk Register", desc: "RAG + FAIR in GBP/INR" },
  { id: "04", title: "Asset Mgmt", desc: "Inventory + criticality" },
  { id: "05", title: "Incident Mgmt", desc: "Playbooks + reg clocks" },
  { id: "06", title: "Compliance", desc: "UCF, test once satisfy many" },
  { id: "07", title: "Privacy", desc: "GDPR, CCPA, DPDP" },
  { id: "08", title: "Policies", desc: "Library + attestation" },
  { id: "09", title: "Vendors & Contracts", desc: "TPRM + AI contract review" },
  { id: "10", title: "Audits", desc: "Internal + auditor portal" },
  { id: "11", title: "AI Governance", desc: "EU AI Act, ISO 42001" },
  { id: "12", title: "Trust Center", desc: "Public page, CRM-linked" }
];

export default function WorksSection() {
  return (
    <section className="relative w-full py-24 px-6 md:px-16 lg:px-32 z-10 bg-background overflow-hidden">
      <div className="flex flex-col gap-4 mb-16 z-10">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">
          Twelve modules. <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">One connected graph.</span>
        </h2>
        <p className="text-lg text-foreground/70 max-w-2xl">
          Modular like OneTrust, connected like nothing else - a change in one module cascades intelligently to the rest.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 z-10">
        
        {/* Harmonisation Engine Card */}
        <div className="lg:w-1/3 flex-shrink-0">
          <div className="p-8 rounded-3xl bg-primary/10 border border-primary/30 backdrop-blur-md sticky top-32">
            <h3 className="text-2xl font-bold mb-4 text-primary">The Harmonisation Engine</h3>
            <p className="text-foreground/80 text-sm leading-relaxed mb-6">
              ISO 27001 + ISO 31000 form the permanent spine. Every framework maps into a Universal Control Framework of ~300 controls - so a customer pursuing ISO 27001, SOC 2 and DPDP simultaneously implements one control set, collects evidence once, and satisfies all three. No duplicate work, ever.
            </p>
            <div className="w-full h-[1px] bg-primary/20 mb-6" />
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-primary/80">
              <span>68 Frameworks</span>
              <span>1 Control Set</span>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {modules.map((mod, i) => (
            <motion.div 
              key={mod.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col justify-between hover:bg-white/10 hover:border-primary/30 transition-colors"
            >
              <span className="font-mono text-xs text-primary mb-4">{mod.id}</span>
              <div>
                <h4 className="font-bold text-lg mb-2 leading-tight">{mod.title}</h4>
                <p className="text-xs text-foreground/50">{mod.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
