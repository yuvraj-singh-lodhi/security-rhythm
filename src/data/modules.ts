export type PlatformModule = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  capabilities: string[];
};

export const modules: PlatformModule[] = [
  { id: "01", slug: "onboarding", name: "Onboarding", shortDescription: "Conversational setup", capabilities: ["14-question conversation", "Generates complete compliance program"] },
  { id: "02", slug: "org-context", name: "Org Context", shortDescription: "ISO 27001 Clause 4", capabilities: ["Internal/External issues", "ISMS scope", "Stakeholder register"] },
  { id: "03", slug: "risk-register", name: "Risk Register", shortDescription: "RAG + FAIR in GBP/INR", capabilities: ["Dual scoring", "Quantified financial exposure"] },
  { id: "04", slug: "asset-mgmt", name: "Asset Management", shortDescription: "Inventory + criticality", capabilities: ["Hardware, software, data, cloud, SaaS", "Classified by criticality"] },
  { id: "05", slug: "incident-mgmt", name: "Incident Management", shortDescription: "Playbooks + reg clocks", capabilities: ["GDPR's 72 hours", "CERT-In's 6 hours", "DPDPA notification"] },
  { id: "06", slug: "compliance-automation", name: "Compliance Automation", shortDescription: "UCF, test once satisfy many", capabilities: ["Universal Control Framework mapping across 68 frameworks"] },
  { id: "07", slug: "privacy", name: "Privacy", shortDescription: "GDPR, CCPA, DPDP", capabilities: ["ROPA auto-generated", "DSR tracker with statutory clocks", "DPIAs"] },
  { id: "08", slug: "policy-mgmt", name: "Policy Management", shortDescription: "Library + attestation", capabilities: ["Owner, review cycle, acknowledgement trail"] },
  { id: "09", slug: "vendors-contracts", name: "Vendors & Contract Intelligence", shortDescription: "TPRM + AI contract review", capabilities: ["Inbound contracts checked clause-by-clause", "DPA and BAA validators"] },
  { id: "10", slug: "audit-mgmt", name: "Audit Management", shortDescription: "Internal audits + auditor portal", capabilities: ["Internal audits, evidence collection", "Read-only scoped portal for external auditors"] },
  { id: "11", slug: "ai-governance", name: "AI Governance", shortDescription: "EU AI Act, ISO 42001", capabilities: ["AI system inventory", "Risk classification", "Conformity assessment tracking"] },
  { id: "12", slug: "trust-center", name: "Trust Center", shortDescription: "Public page, CRM-linked", capabilities: ["NDA-gated documents", "AI-drafted questionnaire answers"] }
];
