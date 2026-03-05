import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";

const projects = [
  { title: "D2C Fashion Brand", category: "Performance Marketing", metric: "4.2x ROAS", growth: "+320% Revenue", desc: "Scaled a fashion brand from ₹50K to ₹8L monthly revenue through targeted Meta ad campaigns and creative optimization." },
  { title: "SaaS Lead Funnel", category: "Automation", metric: "300+ Leads/mo", growth: "+180% Pipeline", desc: "Built an automated lead generation funnel that consistently delivers qualified leads at under ₹150 per lead." },
  { title: "Manufacturer Website", category: "Web Development", metric: "180% More Inquiries", growth: "+90% Organic", desc: "Designed a premium AI-powered website that dramatically increased B2B inquiry volume." },
  { title: "E-commerce Revamp", category: "Creative Design", metric: "2.5x Revenue", growth: "+60% Conversion", desc: "Complete store overhaul including UX redesign, product photography guidance, and conversion optimization." },
  { title: "IndiaMART Optimization", category: "Performance Marketing", metric: "5x Lead Quality", growth: "-80% Junk Leads", desc: "Optimized product listings and profile to attract high-intent buyers, reducing junk leads by 80%." },
  { title: "Restaurant Branding", category: "Creative Design", metric: "50K+ Followers", growth: "+400% Engagement", desc: "Created a cohesive brand identity and social media strategy that built a loyal community from scratch." },
];

const PortfolioSection = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="work" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.p
          className="text-primary font-display text-sm tracking-widest uppercase mb-3 text-center font-semibold"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          Our Work
        </motion.p>
        <motion.h2
          className="text-3xl md:text-5xl font-display font-bold text-center mb-14"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          Selected <span className="text-primary">Case Studies</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              className="bg-card border border-border rounded-2xl overflow-hidden group cursor-pointer hover:border-primary/40 hover:shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.15)] hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setSelected(i)}
            >
              <div className="h-44 bg-muted flex items-center justify-center relative overflow-hidden">
                <span className="text-6xl font-display font-bold text-muted-foreground/10 group-hover:text-primary/10 transition-colors duration-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary/0 group-hover:bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                    <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <span className="text-xs text-primary font-semibold uppercase tracking-wider">{p.category}</span>
                <h3 className="text-lg font-display font-semibold mt-2 mb-2">{p.title}</h3>
                <div className="flex gap-3">
                  <span className="text-sm font-semibold text-primary">{p.metric}</span>
                  <span className="text-sm text-muted-foreground">{p.growth}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selected !== null && (
            <motion.div
              className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            >
              <motion.div
                className="bg-card border border-border rounded-2xl p-8 md:p-10 max-w-lg w-full relative shadow-xl"
                initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
                <span className="text-xs text-primary font-semibold uppercase tracking-wider">{projects[selected].category}</span>
                <h3 className="text-2xl font-display font-bold mt-2 mb-1">{projects[selected].title}</h3>
                <div className="flex gap-3 mb-4">
                  <span className="text-sm font-semibold text-primary">{projects[selected].metric}</span>
                  <span className="text-sm text-muted-foreground">{projects[selected].growth}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{projects[selected].desc}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PortfolioSection;
