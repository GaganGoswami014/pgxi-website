import { motion } from "framer-motion";

/** Independence Day / Republic Day – Tiranga wave + Ashoka Chakra */
const IndiaPatrioticTheme = ({ variant }: { variant: "independence" | "republic" }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Tricolor gradient */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          background: "linear-gradient(180deg, hsl(25 90% 55%) 0%, hsl(0 0% 100%) 50%, hsl(130 60% 40%) 100%)",
        }}
      />

      {/* Ashoka Chakra */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" opacity={0.08}>
          <circle cx="25" cy="25" r="22" stroke="hsl(220 60% 35%)" strokeWidth="1.5" />
          <circle cx="25" cy="25" r="4" fill="hsl(220 60% 35%)" />
          {Array.from({ length: 24 }, (_, i) => {
            const angle = (i * 15 * Math.PI) / 180;
            const x1 = 25 + 6 * Math.cos(angle);
            const y1 = 25 + 6 * Math.sin(angle);
            const x2 = 25 + 20 * Math.cos(angle);
            const y2 = 25 + 20 * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="hsl(220 60% 35%)"
                strokeWidth="0.5"
              />
            );
          })}
        </svg>
      </motion.div>

      {/* Subtle flag wave strips */}
      {[
        { color: "hsl(25 90% 55%)", top: "15%" },
        { color: "hsl(130 60% 40%)", top: "75%" },
      ].map((strip, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0 h-[2px]"
          style={{ top: strip.top, backgroundColor: strip.color, opacity: 0.12 }}
          animate={{ scaleX: [0.8, 1, 0.8], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
        />
      ))}
    </div>
  );
};

export default IndiaPatrioticTheme;
