import { motion } from "framer-motion";
import { BarChart3, Zap, Layers, TrendingUp } from "lucide-react";

const reasons = [
  { icon: BarChart3, title: "Data-Driven", desc: "Every campaign grounded in analytics and performance data." },
  { icon: Zap, title: "Fast Execution", desc: "Rapid turnarounds without compromising quality." },
  { icon: Layers, title: "Structured Systems", desc: "Repeatable frameworks that deliver consistent results." },
  { icon: TrendingUp, title: "Measurable Results", desc: "Clear KPIs, transparent reporting, real growth." },
];

const WhyUsSection = () => (
  <section className="py-24 md:py-32">
    <div className="container mx-auto px-4">
      <motion.p
        className="text-primary font-display text-sm tracking-widest uppercase mb-3 text-center font-semibold"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
      >
        Why PG-XI
      </motion.p>
      <motion.h2
        className="text-3xl md:text-5xl font-display font-bold text-center mb-14"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      >
        Why Brands <span className="text-primary">Choose Us</span>
      </motion.h2>

      <div className="grid md:grid-cols-4 gap-6">
        {reasons.map((r, i) => (
          <motion.div
            key={r.title}
            className="text-center p-8 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.15)] hover:-translate-y-1 transition-all duration-300 group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary transition-all duration-300">
              <r.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2">{r.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUsSection;
