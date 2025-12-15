type SubsectionLike = {
  timeAllocation: number;
};

type SectionLike = {
  subsections: SubsectionLike[];
};

type TalkLike = {
  sections: SectionLike[];
};

type TimeAllocationValue = number | SubsectionLike | SectionLike | TalkLike;

function formatMinutesSeconds(totalSeconds: number) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function getTotalSeconds(value: TimeAllocationValue): number {
  if (typeof value === "number") return value;

  if ("timeAllocation" in value) {
    return value.timeAllocation;
  }

  if ("subsections" in value) {
    return value.subsections.reduce((sum, ss) => sum + ss.timeAllocation, 0);
  }

  return value.sections.reduce((sum, section) => sum + getTotalSeconds(section), 0);
}

export function formatTimeAllocation(value: TimeAllocationValue) {
  return formatMinutesSeconds(getTotalSeconds(value));
}
