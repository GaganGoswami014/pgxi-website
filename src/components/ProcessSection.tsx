import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Strategy", desc: "Deep dive into your brand, audience, and goals to craft a growth roadmap." },
  { num: "02", title: "Creative", desc: "Design assets, ad creatives, and web experiences that convert." },
  { num: "03", title: "Optimize", desc: "Continuous A/B testing, data analysis, and performance refinement." },
  { num: "04", title: "Scale", desc: "Amplify what works. Automate systems. Multiply results." },
];

const ProcessSection = () => (
  <section id="process" className="py-24 md:py-32">
    <div className="container mx-auto px-4">
      <motion.p
        className="text-primary font-display text-sm tracking-widest uppercase mb-3 text-center font-semibold"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
      >
        Our Process
      </motion.p>
      <motion.h2
        className="text-3xl md:text-5xl font-display font-bold text-center mb-16"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      >
        How We <span className="text-primary">Work</span>
      </motion.h2>

      <div className="grid md:grid-cols-4 gap-6 relative">
        <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-border">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0" />
        </div>

        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            className="text-center relative group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
          >
            <div className="w-20 h-20 rounded-full border-2 border-primary bg-background flex items-center justify-center mx-auto mb-6 relative z-10 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
              <span className="text-xl font-display font-bold text-primary group-hover:text-primary-foreground transition-colors duration-300">{step.num}</span>
            </div>
            <h3 className="text-lg font-display font-semibold mb-2">{step.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-[220px] mx-auto">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProcessSection;
