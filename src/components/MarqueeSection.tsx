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
    <div
      key={i}
      className="flex items-center gap-10 shrink-0"
    >

      <span className="marquee-font text-3xl md:text-5xl font-semibold tracking-widest uppercase text-foreground/90 whitespace-nowrap">
        {item}
      </span>

      <span className="text-primary text-xl">✦</span>

    </div>
  ));

  return (
    <section className="py-16 overflow-hidden relative bg-card border-y border-border">

      {/* LEFT FADE */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-card to-transparent z-10" />

      {/* RIGHT FADE */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-card to-transparent z-10" />

      <div className="flex gap-12 animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">

        {content}
        {content}

      </div>

    </section>
  );
};

export default MarqueeSection;
