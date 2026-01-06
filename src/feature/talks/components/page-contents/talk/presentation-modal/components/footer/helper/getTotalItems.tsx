import type { Outline } from "@feature/talks/types/Outline";

export function getTotalItems(talk?: Outline): number {
  let count = 0;

  if (!talk) return count;

  for (const section of talk.sections) {
    count += section.subsections.length;
  }

  return count;
}
