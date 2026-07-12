export type PricingPlan = {
  name: string;
  gbp: number;
  inr: number;
  period: "month" | "year";
  popular?: boolean;
  features: string[];
};

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    gbp: 99,
    inr: 8000,
    period: "month",
    features: ["Core modules + onboarding", "Up to 2 frameworks", "Email support"]
  },
  {
    name: "Professional",
    gbp: 199,
    inr: 15000,
    period: "month",
    popular: true,
    features: ["All modules", "Unlimited frameworks", "Vendor + contract intelligence", "Priority support"]
  },
  {
    name: "Enterprise",
    gbp: 399,
    inr: 25000,
    period: "month",
    features: ["Everything in Professional", "Auditor portal + Trust Center", "API + CRM integrations", "Onboarding assistance"]
  }
];
