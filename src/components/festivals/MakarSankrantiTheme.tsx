import { motion } from "framer-motion";

/** Makar Sankranti – Flying kites with thread + sun glow */
const MakarSankrantiTheme = () => {
  const kiteColors = [
    "hsl(var(--primary))",
    "hsl(0 84% 60%)",
    "hsl(200 80% 55%)",
    "hsl(130 60% 50%)",
    "hsl(280 70% 60%)",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Sun glow */}
      <div
        className="absolute -top-20 right-10 w-60 h-60 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, hsl(43 90% 60%) 0%, transparent 70%)",
        }}
      />

      {/* Kites */}
      {kiteColors.map((color, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${15 + i * 18}%`,
            top: `${10 + (i % 3) * 15}%`,
          }}
          animate={{
            x: [0, 12, -8, 5, 0],
            y: [0, -10, 5, -15, 0],
            rotate: [0, 8, -5, 10, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Kite shape */}
          <svg width="24" height="30" viewBox="0 0 24 30" fill="none">
            <path d="M12 0 L24 12 L12 24 L0 12 Z" fill={color} opacity={0.6} />
            <line x1="12" y1="24" x2="12" y2="30" stroke={color} strokeWidth="0.5" opacity={0.4} />
          </svg>
          {/* Thread */}
          <motion.svg
            width="2"
            height="40"
            className="absolute top-6 left-[11px]"
            animate={{ d: ["M1 0 Q5 20 1 40", "M1 0 Q-3 20 1 40"] }}
          >
            <motion.path
              d="M1 0 Q5 20 1 40"
              stroke={color}
              strokeWidth="0.5"
              fill="none"
              opacity={0.3}
            />
          </motion.svg>
        </motion.div>
      ))}
    </div>
  );
};

export default MakarSankrantiTheme;
