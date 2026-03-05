import { motion } from "framer-motion";

/** New Year – Sparkler particles + elegant burst */
const NewYearTheme = () => {
  const sparkles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 80}%`,
    size: 2 + Math.random() * 3,
    delay: Math.random() * 4,
    duration: 1.5 + Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gold shimmer overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          background: "radial-gradient(ellipse at 50% 30%, hsl(43 90% 60%) 0%, transparent 60%)",
        }}
      />

      {/* Sparkle particles */}
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{ left: s.left, top: s.top }}
          animate={{
            opacity: [0, 0.7, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          <svg width={s.size * 4} height={s.size * 4} viewBox="0 0 16 16" fill="none">
            <path
              d="M8 0 L9 6.5 L16 8 L9 9.5 L8 16 L7 9.5 L0 8 L7 6.5 Z"
              fill="hsl(43 90% 65%)"
              opacity={0.5}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default NewYearTheme;
