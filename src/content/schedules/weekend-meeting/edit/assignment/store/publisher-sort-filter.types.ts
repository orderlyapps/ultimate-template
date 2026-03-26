export type SortableStatKey =
  | "weeksSinceSameAssignment"
  | "weeksSinceAnyAssignment"
  | "weeksUntilSameAssignment"
  | "weeksUntilAnyAssignment"
  | "avgWeeksBetweenSameAssignment"
  | "avgWeeksBetweenAnyAssignment"
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
  "pastAssignments",
  "futureAssignments",
];

export const DEFAULT_PRESETS: SortFilterPreset[] = [
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
  {
    id: "custom-177449459254dfv5",
    name: "Fill In List",
    config: {
      sortBy: "weeksSinceAnyAssignment",
      sortDirection: "desc",
      filters: [
        {
          stat: "weeksSinceSameAssignment",
          minWeeks: 6,
        },
        {
          stat: "weeksSinceAnyAssignment",
          minWeeks: 2,
        },
        {
          stat: "avgWeeksBetweenAnyAssignment",
          minWeeks: 3,
        },
        {
          stat: "avgWeeksBetweenSameAssignment",
          minWeeks: 5,
        },
        {
          stat: "weeksUntilSameAssignment",
          minWeeks: 6,
        },
        {
          stat: "weeksUntilAnyAssignment",
          minWeeks: 2,
        },
      ],
      nullValueHandling: "hide",
      hideWithCurrentWeekAssignment: true,
      hideNonParticipants: true,
    },
    isBuiltIn: false,
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
