import { motion } from "framer-motion";

/** Christmas – Snowfall + glowing lights */
const ChristmasTheme = () => {
  const snowflakes = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: 3 + Math.random() * 5,
    delay: Math.random() * 8,
    duration: 5 + Math.random() * 5,
    opacity: 0.15 + Math.random() * 0.25,
  }));

  const lights = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: `${5 + i * 10}%`,
    color: ["hsl(0 80% 55%)", "hsl(120 60% 45%)", "hsl(45 90% 55%)", "hsl(200 70% 55%)", "hsl(0 80% 55%)"][i % 5],
    delay: i * 0.3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Christmas lights string */}
      <div className="absolute top-0 left-0 right-0 h-8 flex items-start">
        {lights.map((l) => (
          <motion.div
            key={l.id}
            className="absolute w-2.5 h-3.5 rounded-b-full"
            style={{
              left: l.left,
              top: 2,
              backgroundColor: l.color,
            }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{
              duration: 1.5,
              delay: l.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Snowfall */}
      {snowflakes.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: s.left,
            top: "-5%",
            width: s.size,
            height: s.size,
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, Math.sin(s.id) * 25, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          initial={{ opacity: s.opacity }}
        />
      ))}
    </div>
  );
};

export default ChristmasTheme;
