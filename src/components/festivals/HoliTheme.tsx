import { motion } from "framer-motion";

/** Holi – Color powder bursts + gradient splashes */
const HoliTheme = () => {
  const colors = [
    "hsl(340 80% 55%)",
    "hsl(45 90% 55%)",
    "hsl(170 70% 45%)",
    "hsl(270 70% 60%)",
    "hsl(200 80% 55%)",
    "hsl(20 90% 55%)",
  ];

  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    left: `${5 + Math.random() * 90}%`,
    top: `${10 + Math.random() * 70}%`,
    size: 4 + Math.random() * 10,
    delay: Math.random() * 8,
    duration: 3 + Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Rainbow gradient overlay */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          background:
            "linear-gradient(120deg, hsl(340 80% 55%), hsl(45 90% 55%), hsl(170 70% 45%), hsl(270 70% 60%), hsl(200 80% 55%))",
        }}
      />

      {/* Color particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.25, 0.15, 0],
            scale: [0, 1.5, 2, 2.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default HoliTheme;
