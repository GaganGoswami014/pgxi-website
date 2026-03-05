export type FestivalId =
  | "makar-sankranti"
  | "valentine"
  | "holi"
  | "easter"
  | "eid"
  | "independence-day"
  | "diwali"
  | "christmas"
  | "new-year"
  | "republic-day";

export interface FestivalConfig {
  id: FestivalId;
  name: string;
  greeting: string;
  /** Month (1-12) and day for the festival date. For lunar festivals, approximate dates for the current year. */
  dates: { month: number; day: number }[];
  /** Days before festival to activate the theme */
  activateBefore: number;
  /** Days after festival to keep the theme */
  deactivateAfter: number;
  /** Priority when multiple festivals overlap (higher = more important) */
  priority: number;
}

/**
 * Festival dates – update yearly for lunar-calendar festivals.
 * Fixed-date festivals stay the same every year.
 */
export const festivals: FestivalConfig[] = [
  {
    id: "new-year",
    name: "New Year",
    greeting: "Happy New Year! 🎉",
    dates: [{ month: 1, day: 1 }],
    activateBefore: 5,
    deactivateAfter: 1,
    priority: 8,
  },
  {
    id: "makar-sankranti",
    name: "Makar Sankranti",
    greeting: "Happy Makar Sankranti! 🪁",
    dates: [{ month: 1, day: 14 }],
    activateBefore: 5,
    deactivateAfter: 1,
    priority: 6,
  },
  {
    id: "republic-day",
    name: "Republic Day",
    greeting: "Happy Republic Day! 🇮🇳",
    dates: [{ month: 1, day: 26 }],
    activateBefore: 5,
    deactivateAfter: 1,
    priority: 9,
  },
  {
    id: "valentine",
    name: "Valentine's Week",
    greeting: "Happy Valentine's Day! 💕",
    dates: [{ month: 2, day: 14 }],
    activateBefore: 7,
    deactivateAfter: 1,
    priority: 5,
  },
  {
    id: "holi",
    name: "Holi",
    greeting: "Happy Holi! 🎨",
    // Approximate – update yearly
    dates: [{ month: 3, day: 14 }],
    activateBefore: 5,
    deactivateAfter: 1,
    priority: 7,
  },
  {
    id: "easter",
    name: "Easter",
    greeting: "Happy Easter! 🐣",
    // Approximate – update yearly
    dates: [{ month: 4, day: 20 }],
    activateBefore: 5,
    deactivateAfter: 1,
    priority: 5,
  },
  {
    id: "eid",
    name: "Eid",
    greeting: "Eid Mubarak! 🌙",
    // Approximate – update yearly
    dates: [{ month: 3, day: 31 }],
    activateBefore: 5,
    deactivateAfter: 1,
    priority: 7,
  },
  {
    id: "independence-day",
    name: "Independence Day",
    greeting: "Happy Independence Day! 🇮🇳",
    dates: [{ month: 8, day: 15 }],
    activateBefore: 5,
    deactivateAfter: 1,
    priority: 9,
  },
  {
    id: "diwali",
    name: "Diwali",
    greeting: "Happy Diwali! 🪔",
    // Approximate – update yearly
    dates: [{ month: 10, day: 20 }],
    activateBefore: 7,
    deactivateAfter: 1,
    priority: 10,
  },
  {
    id: "christmas",
    name: "Christmas",
    greeting: "Merry Christmas! 🎄",
    dates: [{ month: 12, day: 25 }],
    activateBefore: 7,
    deactivateAfter: 1,
    priority: 8,
  },
];
