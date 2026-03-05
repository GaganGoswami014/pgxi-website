import { motion } from "framer-motion";
import { BarChart3, Palette, Settings } from "lucide-react";

const pillars = [
  {
    icon: BarChart3,
    title: "Data-Driven Strategy",
    desc: "Every decision backed by analytics. We turn numbers into actionable growth plans.",
  },
  {
    icon: Palette,
    title: "Creative Execution",
    desc: "Designs that stop the scroll. Creative that converts browsers into buyers.",
  },
  {
    icon: Settings,
    title: "Structured Growth Systems",
    desc: "Repeatable frameworks and automation that scale results predictably.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
  }),
};

const AboutSection = () => (
  <section id="about" className="py-24 md:py-32">
    <div className="container mx-auto px-4">
      <motion.p
        className="text-primary font-display text-sm tracking-widest uppercase mb-3 text-center font-semibold"
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
      >
        About PG-XI
      </motion.p>
      <motion.h2
        className="text-3xl md:text-5xl font-display font-bold text-center mb-6"
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
      >
        Performance & Growth, <span className="text-primary">Exponential Impact</span>
      </motion.h2>
      <motion.p
        className="max-w-2xl mx-auto text-muted-foreground text-center text-lg mb-16"
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}
      >
        PG stands for Performance & Growth. XI stands for Exponential Impact. Together, PG-XI represents structured growth powered by design, data, and automation — built for brands that want to dominate.
      </motion.p>

      <div className="grid md:grid-cols-3 gap-8">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            className="bg-card border border-border rounded-2xl p-8 text-center hover:border-primary/40 hover:shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.15)] hover:-translate-y-1 transition-all duration-300 group"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 3}
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary transition-all duration-300">
              <p.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
            </div>
            <h3 className="text-lg font-display font-semibold mb-3">{p.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
