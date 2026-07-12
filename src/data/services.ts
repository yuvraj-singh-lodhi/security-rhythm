export type ServicePillar = {
  id: string;
  name: string;
  description: string;
  services: Service[];
};

export type Service = {
  slug: string;
  name: string;
  description?: string;
  deliverables?: string[];
  standards?: string[];
};

export const servicePillars: ServicePillar[] = [
  {
    id: "01",
    name: "GRC Platform",
    description: "Cloud-native compliance automation, risk, asset and incident management, privacy, policies, vendor oversight, audits, AI governance and trust centre.",
    services: [
      { slug: "compliance-automation", name: "Compliance automation" },
      { slug: "risk-register", name: "Risk register & policies" },
      { slug: "vendor-risk", name: "Vendor risk & audits" },
      { slug: "incident-management", name: "Incident management" },
      { slug: "trust-centre", name: "Trust Centre & assets" }
    ]
  },
  {
    id: "02",
    name: "Compliance & Advisory",
    description: "ISO 27001, SOC 2, vCISO, DPDPA, global privacy, AI governance, Cyber Essentials, regulatory advisory, business continuity and awareness.",
    services: [
      { slug: "iso-27001", name: "ISMS implementation (ISO 27001)", deliverables: ["Gap analysis", "ISMS scope & context", "Risk assessment", "SOA", "Policy library"], standards: ["ISO/IEC 27001:2022"] },
      { slug: "soc-2", name: "SOC 2 readiness (Type I & II)" },
      { slug: "vciso", name: "vCISO - CISO-as-a-Service" },
      { slug: "dpdpa", name: "DPDPA compliance & DPO support" },
      { slug: "privacy", name: "GDPR & global privacy advisory" },
      { slug: "ai-governance", name: "AI Governance Advisory" },
      { slug: "cyber-essentials", name: "Cyber Essentials & CE Plus" },
      { slug: "regulatory", name: "Regulatory advisory (RBI/IRDAI/SEBI)" },
      { slug: "bcp-dr", name: "Business continuity & DR" },
      { slug: "awareness", name: "Security awareness training" }
    ]
  },
  {
    id: "03",
    name: "Audit & Assurance",
    description: "IT audit, risk assessment, gap assessment, third-party evaluation, NHS DSPT and M&A security due diligence - independent and honest.",
    services: [
      { slug: "it-audit", name: "IT audit (ITGC, COBIT)" },
      { slug: "it-risk", name: "IT risk assessment (FAIR)" },
      { slug: "gap-assessment", name: "Gap assessments (any framework)" },
      { slug: "tprm", name: "Third-party risk assessment" },
      { slug: "nhs-dspt", name: "NHS DSPT audit & submission" },
      { slug: "ma-due-diligence", name: "M&A Security Due Diligence" }
    ]
  },
  {
    id: "04",
    name: "Technical Security",
    description: "Penetration testing, red teaming, incident response retainer, AI security, cloud assessment, vulnerability management, code and architecture review.",
    services: [
      { slug: "pen-testing", name: "Penetration testing (OSCP/CREST)" },
      { slug: "red-teaming", name: "Red teaming (MITRE ATT&CK)" },
      { slug: "ir-retainer", name: "Incident Response Retainer & Forensics" },
      { slug: "ai-testing", name: "AI / ML security testing" },
      { slug: "cloud-assessment", name: "Cloud security assessment" },
      { slug: "vulnerability", name: "Vulnerability assessment" },
      { slug: "code-review", name: "Secure code review" },
      { slug: "architecture", name: "Security architecture review" }
    ]
  }
];
