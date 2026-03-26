export type SortableStatKey =
  | "weeksSinceSameAssignment"
  | "weeksSinceAnyAssignment"
  | "weeksUntilSameAssignment"
  | "weeksUntilAnyAssignment"
  | "avgWeeksBetweenSameAssignment"
  | "avgWeeksBetweenAnyAssignment"
  | "weeksBetweenAnyLastAndNext"
  | "weeksBetweenSameLastAndNext"
  | "pastAssignments"
  | "futureAssignments"
  | "alphabetical";

export type SortDirection = "asc" | "desc";

export type NullValueHandling = "hide" | "start" | "end";

export type FilterConfig = {
  stat: Exclude<SortableStatKey, "alphabetical">;
  minWeeks: number;
};

export type SortFilterConfig = {
  sortBy: SortableStatKey;
  sortDirection: SortDirection;
  filters: FilterConfig[];
  nullValueHandling: NullValueHandling;
  hideWithCurrentWeekAssignment: boolean;
  hideNonParticipants: boolean;
};

export type SortFilterPreset = {
  id: string;
  name: string;
  config: SortFilterConfig;
  isBuiltIn: boolean;
};

export const STAT_LABELS: Record<SortableStatKey, string> = {
  weeksSinceSameAssignment: "Weeks Since Same",
  weeksSinceAnyAssignment: "Weeks Since Any",
  weeksUntilSameAssignment: "Weeks Until Same",
  weeksUntilAnyAssignment: "Weeks Until Any",
  avgWeeksBetweenSameAssignment: "Avg Between Same",
  avgWeeksBetweenAnyAssignment: "Avg Between Any",
  weeksBetweenAnyLastAndNext: "Between Any Last & Next",
  weeksBetweenSameLastAndNext: "Between Same Last & Next",
  pastAssignments: "Past Assignments",
  futureAssignments: "Future Assignments",
  alphabetical: "Alphabetical",
};

export const FILTERABLE_STATS: Exclude<SortableStatKey, "alphabetical">[] = [
  "weeksSinceSameAssignment",
  "weeksSinceAnyAssignment",
  "weeksUntilSameAssignment",
  "weeksUntilAnyAssignment",
  "avgWeeksBetweenSameAssignment",
  "avgWeeksBetweenAnyAssignment",
  "weeksBetweenAnyLastAndNext",
  "weeksBetweenSameLastAndNext",
];

export const DEFAULT_PRESETS: SortFilterPreset[] = [
  {
    id: "custom-1774496530581",
    name: "Default",
    config: {
      sortBy: "weeksSinceAnyAssignment",
      sortDirection: "desc",
      filters: [
        {
          stat: "weeksSinceAnyAssignment",
          minWeeks: 4,
        },
        {
          stat: "avgWeeksBetweenAnyAssignment",
          minWeeks: 4,
        },
      ],
      nullValueHandling: "start",
      hideWithCurrentWeekAssignment: true,
      hideNonParticipants: true,
    },
    isBuiltIn: true,
  },

  {
    id: "builtin-longest-since-same",
    name: "Longest Since Same Assignment",
    config: {
      sortBy: "weeksSinceSameAssignment",
      sortDirection: "desc",
      filters: [],
      nullValueHandling: "end",
      hideWithCurrentWeekAssignment: false,
      hideNonParticipants: false,
    },
    isBuiltIn: true,
  },
  {
    id: "builtin-longest-since-any",
    name: "Longest Since Any Assignment",
    config: {
      sortBy: "weeksSinceAnyAssignment",
      sortDirection: "desc",
      filters: [],
      nullValueHandling: "end",
      hideWithCurrentWeekAssignment: false,
      hideNonParticipants: false,
    },
    isBuiltIn: true,
  },
  {
    id: "builtin-alphabetical",
    name: "Alphabetical",
    config: {
      sortBy: "alphabetical",
      sortDirection: "asc",
      filters: [],
      nullValueHandling: "end",
      hideWithCurrentWeekAssignment: false,
      hideNonParticipants: false,
    },
    isBuiltIn: true,
  },
];

export const DEFAULT_CONFIG: SortFilterConfig = {
  sortBy: "weeksSinceSameAssignment",
  sortDirection: "desc",
  filters: [],
  nullValueHandling: "end",
  hideWithCurrentWeekAssignment: false,
  hideNonParticipants: false,
};
