import { motion } from "framer-motion";

/** Valentine – Floating hearts + rose petals */
const ValentineTheme = () => {
  const hearts = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${5 + Math.random() * 90}%`,
    size: 8 + Math.random() * 14,
    delay: Math.random() * 6,
    duration: 5 + Math.random() * 4,
    opacity: 0.08 + Math.random() * 0.15,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Soft pink overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          background: "linear-gradient(135deg, hsl(340 80% 60%) 0%, hsl(350 70% 70%) 50%, transparent 100%)",
        }}
      />

      {/* Floating hearts */}
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute"
          style={{ left: h.left, top: "-10%" }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, Math.sin(h.id) * 30, 0],
            rotate: [0, 15, -10, 0],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            width={h.size}
            height={h.size}
            viewBox="0 0 24 24"
            fill="hsl(345 80% 60%)"
            opacity={h.opacity}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default ValentineTheme;
