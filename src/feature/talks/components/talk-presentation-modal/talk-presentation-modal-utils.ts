import type { Outline } from "@feature/talks/state/useTalksStore";

export function getTotalAllocatedSeconds(talk: Outline) {
  return talk.sections.reduce((talkTotal, section) => {
    const sectionTotal = section.subsections.reduce(
      (subTotal, subsection) => subTotal + (subsection.timeAllocation ?? 0),
      0
    );
    return talkTotal + sectionTotal;
  }, 0);
}

export function toLocalDatetimeValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
