import type { Outline } from "../../types/Outline";
import type { Subsection } from "../../types/Subsection";

export const updateSubsection =
  (
    talkId: string,
    sectionId: string,
    subsectionId: string,
    updates: Partial<Pick<Subsection, "content" | "timeAllocation">>
  ) =>
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
              subsections: section.subsections.map((ss) => {
                if (ss.id !== subsectionId) return ss;
                return { ...ss, ...updates };
              }),
            };
          }),
          updatedAt: now,
        };
      }),
    };
  };
