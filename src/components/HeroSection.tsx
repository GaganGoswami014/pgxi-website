import { motion } from "framer-motion";

const stats = [
  { value: "150+", label: "Projects" },
  { value: "5X", label: "Average ROAS" },
  { value: "98%", label: "Retention" },
  { value: "24/7", label: "Support" },
];

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Design That Converts.
          <br />
          <span className="text-primary">Growth That Scales.</span>
        </motion.h1>

        <motion.p
          className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Performance marketing, creative strategy, AI-powered websites and automation systems built to scale brands.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 rounded-xl font-display font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Start Your Growth
          </button>
          <button
            onClick={() => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 rounded-xl font-display font-semibold border-2 border-border text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            View Our Work
          </button>
        </motion.div>

        {/* Trust stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl md:text-4xl font-display font-bold text-primary">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
