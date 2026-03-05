import { lazy, Suspense, useEffect, useState } from "react";
import { useFestivalDetection } from "@/hooks/useFestivalDetection";
import type { FestivalId } from "@/config/festivals";

const festivalComponents: Record<FestivalId, React.LazyExoticComponent<React.ComponentType<any>>> = {
  "makar-sankranti": lazy(() => import("./MakarSankrantiTheme")),
  "valentine": lazy(() => import("./ValentineTheme")),
  "holi": lazy(() => import("./HoliTheme")),
  "easter": lazy(() => import("./EasterTheme")),
  "eid": lazy(() => import("./EidTheme")),
  "independence-day": lazy(() => import("./IndiaPatrioticTheme")),
  "diwali": lazy(() => import("./DiwaliTheme")),
  "christmas": lazy(() => import("./ChristmasTheme")),
  "new-year": lazy(() => import("./NewYearTheme")),
  "republic-day": lazy(() => import("./IndiaPatrioticTheme")),
};

interface FestivalHeaderLayerProps {
  /** Force a specific festival for preview/testing */
  previewFestival?: FestivalId | null;
}

const FestivalHeaderLayer = ({ previewFestival }: FestivalHeaderLayerProps) => {
  const activeFestival = useFestivalDetection(previewFestival);
  const [visible, setVisible] = useState(true);

  // Respect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setVisible(!mq.matches);
    const handler = (e: MediaQueryListEvent) => setVisible(!e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Pause when tab is hidden
  useEffect(() => {
    const handler = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  if (!activeFestival || !visible) return null;

  const ThemeComponent = festivalComponents[activeFestival.id];
  if (!ThemeComponent) return null;

  const extraProps = activeFestival.id === "independence-day"
    ? { variant: "independence" as const }
    : activeFestival.id === "republic-day"
    ? { variant: "republic" as const }
    : {};

  return (
    <Suspense fallback={null}>
      <ThemeComponent {...extraProps} />
    </Suspense>
  );
};

export default FestivalHeaderLayer;
