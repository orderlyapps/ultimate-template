import type { Outline } from "@feature/talks/types/Outline";


export function getTotalAllocatedSeconds(talk: Outline) {
  return talk.sections.reduce((talkTotal, section) => {
    const sectionTotal = section.subsections.reduce(
      (subTotal, subsection) => subTotal + (subsection.timeAllocation ?? 0),
      0
    );
    return talkTotal + sectionTotal;
  }, 0);
}
