import type { Outline } from "../../types/Outline";
import type { Subsection } from "../../types/Subsection";

export const duplicateSubsection =
  (talkId: string, sectionId: string, subsectionIndex: number) =>
  (state: { talks: Outline[] }) => {
    const now = Date.now();

    return {
      talks: state.talks.map((t) => {
        if (t.id !== talkId) return t;

        return {
          ...t,
          sections: t.sections.map((section) => {
            if (section.id !== sectionId) return section;

            const subsectionToCopy = section.subsections[subsectionIndex];
            if (!subsectionToCopy) return section;

            const copiedSubsection: Subsection = {
              ...subsectionToCopy,
              id: crypto.randomUUID(),
              name: `${subsectionToCopy.name} copy`,
            };

            const nextSubsections = [...section.subsections];
            nextSubsections.splice(subsectionIndex + 1, 0, copiedSubsection);

            return {
              ...section,
              subsections: nextSubsections,
            };
          }),
          updatedAt: now,
        };
      }),
    };
  };
