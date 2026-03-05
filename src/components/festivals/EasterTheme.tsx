import { motion } from "framer-motion";

/** Easter – Pastel gradient + floating eggs + spring particles */
const EasterTheme = () => {
  const eggs = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: `${8 + Math.random() * 84}%`,
    color: [
      "hsl(340 60% 75%)",
      "hsl(200 60% 75%)",
      "hsl(140 50% 70%)",
      "hsl(270 50% 75%)",
      "hsl(45 70% 75%)",
      "hsl(170 50% 70%)",
      "hsl(320 50% 75%)",
      "hsl(30 60% 70%)",
    ][i],
    delay: Math.random() * 5,
    duration: 4 + Math.random() * 3,
    size: 12 + Math.random() * 8,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Pastel gradient */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          background: "linear-gradient(135deg, hsl(340 60% 80%), hsl(200 60% 80%), hsl(140 50% 75%))",
        }}
      />

      {/* Floating eggs */}
      {eggs.map((e) => (
        <motion.div
          key={e.id}
          className="absolute"
          style={{ left: e.left, top: "110%" }}
          animate={{
            y: [0, -(window?.innerHeight || 400) * 1.3],
            x: [0, Math.sin(e.id * 2) * 20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: e.duration,
            delay: e.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg width={e.size} height={e.size * 1.3} viewBox="0 0 20 26" fill="none">
            <ellipse cx="10" cy="14" rx="9" ry="12" fill={e.color} opacity={0.3} />
            <line x1="4" y1="10" x2="16" y2="10" stroke="white" strokeWidth="0.8" opacity={0.3} />
            <line x1="4" y1="14" x2="16" y2="14" stroke="white" strokeWidth="0.8" opacity={0.2} />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default EasterTheme;
