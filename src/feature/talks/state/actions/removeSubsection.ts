import type { Outline } from "../../types/Outline";

export const removeSubsection =
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

            return {
              ...section,
              subsections: section.subsections.filter(
                (_, i) => i !== subsectionIndex
              ),
            };
          }),
          updatedAt: now,
        };
      }),
    };
  };
