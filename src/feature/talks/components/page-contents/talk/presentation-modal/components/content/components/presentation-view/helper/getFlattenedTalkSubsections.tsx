import type { Outline } from "@feature/talks/types/Outline";
import type { PresentationItem } from "../PresentationView";

export function getFlattenedTalkSubsections(
  talk?: Outline
): PresentationItem[] {
  const items: PresentationItem[] = [];

  if (!talk) return items;

  for (const section of talk.sections) {
    for (const subsection of section.subsections) {
      items.push({
        section: section.name,
        name: subsection.name,
        content: subsection.content,
      });
    }
  }

  return items;
}
