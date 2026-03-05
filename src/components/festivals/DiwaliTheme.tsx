import { motion } from "framer-motion";

/** Diwali – Glowing diyas + spark particles + golden glow */
const DiwaliTheme = () => {
  const sparks = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 80}%`,
    size: 2 + Math.random() * 3,
    delay: Math.random() * 5,
    duration: 2 + Math.random() * 3,
  }));

  const diyas = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    left: `${10 + i * 20}%`,
    delay: i * 0.3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Golden ambient glow */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          background: "radial-gradient(ellipse at 50% 80%, hsl(43 90% 50%) 0%, transparent 70%)",
        }}
      />

      {/* Diyas */}
      {diyas.map((d) => (
        <motion.div
          key={d.id}
          className="absolute bottom-2"
          style={{ left: d.left }}
        >
          {/* Flame */}
          <motion.div
            className="w-3 h-4 rounded-full mx-auto"
            style={{
              background: "radial-gradient(ellipse, hsl(40 100% 70%), hsl(25 100% 50%) 60%, transparent 100%)",
            }}
            animate={{
              scaleX: [1, 1.15, 0.9, 1.1, 1],
              scaleY: [1, 1.1, 0.95, 1.05, 1],
              opacity: [0.7, 0.9, 0.6, 0.85, 0.7],
            }}
            transition={{
              duration: 1.5,
              delay: d.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Diya base */}
          <svg width="20" height="8" viewBox="0 0 20 8" className="mt-[-2px]">
            <ellipse cx="10" cy="4" rx="10" ry="4" fill="hsl(25 80% 40%)" opacity={0.5} />
          </svg>
        </motion.div>
      ))}

      {/* Spark particles */}
      {sparks.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            backgroundColor: "hsl(43 90% 60%)",
          }}
          animate={{
            opacity: [0, 0.6, 0],
            y: [0, -20],
            scale: [0.5, 1, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default DiwaliTheme;
