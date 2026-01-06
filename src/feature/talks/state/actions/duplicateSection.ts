import type { Outline } from "../../types/Outline";
import type { Section } from "../../types/Section";

export const duplicateSection =
  (talkId: string, sectionIndex: number) => (state: { talks: Outline[] }) => {
    const now = Date.now();

    return {
      talks: state.talks.map((t) => {
        if (t.id !== talkId) return t;

        const sectionToCopy = t.sections[sectionIndex];
        if (!sectionToCopy) return t;

        const copiedSection: Section = {
          ...sectionToCopy,
          id: crypto.randomUUID(),
          name: `${sectionToCopy.name} copy`,
          subsections: sectionToCopy.subsections.map((ss) => ({
            ...ss,
            id: crypto.randomUUID(),
          })),
        };

        const nextSections = [...t.sections];
        nextSections.splice(sectionIndex + 1, 0, copiedSection);

        return {
          ...t,
          sections: nextSections,
          updatedAt: now,
        };
      }),
    };
  };
