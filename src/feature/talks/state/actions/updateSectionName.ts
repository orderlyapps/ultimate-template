import type { Outline } from "../../types/Outline";

export const updateSectionName =
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
            return { ...section, name };
          }),
          updatedAt: now,
        };
      }),
    };
  };
