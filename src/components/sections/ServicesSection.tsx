"use client";
import { motion } from 'framer-motion';
import { Terminal, Shield, Cpu, Lock } from 'lucide-react';

const services = [
  { icon: Terminal, title: "Penetration Testing", desc: "Simulate advanced persistent threats to find vulnerabilities before they do." },
  { icon: Shield, title: "vCISO Services", desc: "Executive-level security leadership tailored for your organizational scale." },
  { icon: Cpu, title: "Architecture Review", desc: "Deep technical analysis of your cloud and on-premise infrastructure." },
  { icon: Lock, title: "Incident Response", desc: "24/7 emergency response team ready to contain and eradicate active threats." }
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative min-h-screen py-32 bg-background z-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            Elite <span className="text-primary">Services</span>
          </h2>
          <p className="text-xl opacity-70 max-w-2xl">
            Our offensive security engineers and compliance architects work as an extension of your team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              className="relative group rounded-2xl overflow-hidden glass-panel p-10 cursor-crosshair"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              whileHover={{ rotateX: 2, rotateY: -2, scale: 1.02 }}
              style={{ transformPerspective: 1000 }}
            >
              {/* Moving Light Border */}
              <div className="absolute inset-0 border border-primary/20 rounded-2xl overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-primary/30 to-transparent -rotate-45"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-8 pb-4 border-b border-border relative z-10">
                <div className="w-3 h-3 rounded-full bg-danger/50" />
                <div className="w-3 h-3 rounded-full bg-accent/50" />
                <div className="w-3 h-3 rounded-full bg-primary/50" />
                <div className="ml-auto text-xs font-mono opacity-50 uppercase tracking-widest">
                  sys.service_{i+1}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 flex gap-6">
                <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="opacity-70 font-mono text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
