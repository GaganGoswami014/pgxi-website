import { motion } from "framer-motion";

/** Eid – Crescent moon glow + mosque silhouette + twinkling stars */
const EidTheme = () => {
  const stars = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 70}%`,
    size: 1.5 + Math.random() * 2.5,
    delay: Math.random() * 4,
    duration: 2 + Math.random() * 3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Night sky tint */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          background: "linear-gradient(180deg, hsl(230 40% 20%) 0%, transparent 100%)",
        }}
      />

      {/* Crescent moon */}
      <motion.div
        className="absolute top-3 right-[15%]"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="12" fill="hsl(45 80% 70%)" opacity={0.4} />
          <circle cx="20" cy="14" r="10" fill="hsl(var(--background))" />
        </svg>
        {/* Glow */}
        <div
          className="absolute -inset-4 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, hsl(45 80% 70%), transparent 70%)",
          }}
        />
      </motion.div>

      {/* Mosque silhouette */}
      <div className="absolute bottom-0 left-[10%] opacity-[0.06]">
        <svg width="120" height="50" viewBox="0 0 120 50" fill="hsl(var(--foreground))">
          <rect x="0" y="25" width="120" height="25" />
          <ellipse cx="60" cy="25" rx="30" ry="20" />
          <rect x="5" y="10" width="4" height="40" />
          <rect x="111" y="10" width="4" height="40" />
          <circle cx="7" cy="8" r="3" />
          <circle cx="113" cy="8" r="3" />
        </svg>
      </div>

      {/* Twinkling stars */}
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-yellow-200"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
          }}
          animate={{ opacity: [0.1, 0.5, 0.1] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default EidTheme;
