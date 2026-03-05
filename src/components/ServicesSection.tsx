import { motion } from "framer-motion";
import { Target, Brush, Globe, Zap } from "lucide-react";

const services = [
  { icon: Target, title: "Performance Marketing", desc: "Data-driven ad campaigns across Meta, Google & more that maximize ROAS and scale revenue." },
  { icon: Brush, title: "Creative Design", desc: "Scroll-stopping creatives, brand identities, and visual systems that demand attention." },
  { icon: Globe, title: "Website Development", desc: "Conversion-focused, AI-powered websites that look premium and perform flawlessly." },
  { icon: Zap, title: "Automation Systems", desc: "Automated funnels, lead nurturing, and workflow systems that run your growth on autopilot." },
];

const ServicesSection = () => (
  <section id="services" className="py-24 md:py-32 bg-muted/30">
    <div className="container mx-auto px-4">
      <motion.p
        className="text-primary font-display text-sm tracking-widest uppercase mb-3 text-center font-semibold"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      >
        What We Do
      </motion.p>
      <motion.h2
        className="text-3xl md:text-5xl font-display font-bold text-center mb-14"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
      >
        Services Built to <span className="text-primary">Scale</span>
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            className="bg-card border border-border rounded-2xl p-8 group hover:border-primary/40 hover:shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.15)] hover:-translate-y-1 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary transition-all duration-300">
              <s.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
            </div>
            <h3 className="text-lg font-display font-semibold mb-3">{s.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
