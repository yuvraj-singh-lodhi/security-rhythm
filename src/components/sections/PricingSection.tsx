"use client";
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: "Growth",
    price: "4,500",
    desc: "For scaling startups needing SOC 2 & ISO 27001.",
    features: ["Automated Evidence Collection", "10 Integrations", "Vendor Risk Management", "Email Support"],
    color: "primary"
  },
  {
    name: "Enterprise",
    price: "12,000",
    desc: "For global enterprises with complex regulatory needs.",
    features: ["Unlimited Integrations", "Custom Frameworks", "Continuous Pen Testing", "Dedicated vCISO", "24/7 Phone Support"],
    color: "accent",
    popular: true
  }
];

export default function PricingSection() {
  return (
    <section id="pricing" className="relative min-h-screen py-32 bg-background z-10 px-6 overflow-hidden flex flex-col justify-center">
      
      {/* 3D Grid Background specific to Pricing */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,var(--color-primary)_0%,transparent_70%)] opacity-15 pointer-events-none" />
      <div 
        className="absolute bottom-0 left-0 right-0 h-[50vh] opacity-10 bg-[linear-gradient(var(--color-primary)_1px,transparent_1px),linear-gradient(90deg,var(--color-primary)_1px,transparent_1px)] bg-[size:50px_50px]"
        style={{ transform: "perspective(500px) rotateX(60deg) translateY(100px) scale(3)", transformOrigin: "bottom center" }}
      />

      <div className="max-w-5xl mx-auto w-full relative z-20">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            Transparent <span className="text-primary">Investment</span>
          </h2>
          <p className="text-xl opacity-70 max-w-2xl mx-auto">
            Choose the OS that scales with your security posture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              whileHover={{ y: -20 }}
              className={`glass-panel p-10 rounded-3xl relative overflow-hidden group border ${plan.popular ? 'border-accent/50 shadow-[0_0_50px_rgba(0,255,163,0.1)]' : 'border-border'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-accent text-[#030712] font-bold text-xs uppercase tracking-widest px-4 py-1 rounded-bl-xl">
                  Most Deployed
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="opacity-70 text-sm h-10">{plan.desc}</p>
              
              <div className="my-8 flex items-end gap-2">
                <span className="text-sm opacity-50 mb-2">$</span>
                <motion.span 
                  className={`text-6xl font-bold tracking-tighter text-${plan.color}`}
                  whileHover={{ scale: 1.05 }}
                >
                  {plan.price}
                </motion.span>
                <span className="text-sm opacity-50 mb-2">/mo</span>
              </div>

              <button className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all relative overflow-hidden group-hover:scale-[1.02] ${plan.popular ? 'bg-accent text-[#030712]' : 'bg-foreground/5 text-foreground hover:bg-foreground/10 border border-border'}`}>
                <span className="relative z-10">Initialize Plan</span>
                {plan.popular && (
                  <motion.div 
                    className="absolute inset-0 bg-white opacity-20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </button>

              <div className="mt-8 space-y-4">
                {plan.features.map((feat, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center bg-${plan.color}/20 text-${plan.color}`}>
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-sm opacity-90">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Hover Glow */}
              <div className={`absolute inset-0 bg-gradient-to-t from-${plan.color}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
