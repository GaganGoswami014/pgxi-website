import { useMemo } from "react";
import { festivals, type FestivalConfig, type FestivalId } from "@/config/festivals";

function daysBetween(a: Date, b: Date): number {
  const msPerDay = 86400000;
  const aDay = new Date(a.getFullYear(), a.getMonth(), a.getDate());
  const bDay = new Date(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((bDay.getTime() - aDay.getTime()) / msPerDay);
}

/**
 * Override: pass a festivalId to force-preview a specific festival.
 * Returns null if no festival is active.
 */
export function useFestivalDetection(overrideId?: FestivalId | null): FestivalConfig | null {
  return useMemo(() => {
    if (overrideId) {
      return festivals.find((f) => f.id === overrideId) ?? null;
    }

    const now = new Date();
    const active: FestivalConfig[] = [];

    for (const fest of festivals) {
      for (const d of fest.dates) {
        // Build festival date for current year
        const festDate = new Date(now.getFullYear(), d.month - 1, d.day);
        const diff = daysBetween(now, festDate);

        // Active window: from -activateBefore to +deactivateAfter
        if (diff >= -fest.deactivateAfter && diff <= fest.activateBefore) {
          active.push(fest);
          break;
        }
      }
    }

    if (active.length === 0) return null;
    // Return the highest-priority festival
    return active.sort((a, b) => b.priority - a.priority)[0];
  }, [overrideId]);
}
