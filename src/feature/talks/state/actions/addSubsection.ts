import type { Outline } from "../../types/Outline";

export const addSubsection =
  (talkId: string, sectionId: string, name: string) =>
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
              subsections: [
                ...section.subsections,
                {
                  id: crypto.randomUUID(),
                  name,
                  content: "",
                  timeAllocation: 150,
                },
              ],
            };
          }),
          updatedAt: now,
        };
      }),
    };
  };
