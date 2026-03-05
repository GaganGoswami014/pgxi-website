const items = [
  "DIGITAL MARKETING",
  "WEB DESIGN & DEVELOPMENT",
  "PERFORMANCE ADS",
  "CREATIVE STRATEGY",
  "AUTOMATION SYSTEMS",
  "BRAND DESIGN",
];

const MarqueeSection = () => {
  const content = items.map((item, i) => (
    <span key={i} className="flex items-center gap-6 shrink-0">
      <span className="text-3xl md:text-5xl font-display font-bold text-foreground/90 whitespace-nowrap">
        {item}
      </span>
      <span className="text-primary text-lg">✦</span>
    </span>
  ));

  return (
    <section className="py-16 overflow-hidden relative bg-card border-y border-border">
      {/* Edge blur */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-card to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-card to-transparent z-10" />

      <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused]">
        {content}
        {content}
      </div>
    </section>
  );
};

export default MarqueeSection;
