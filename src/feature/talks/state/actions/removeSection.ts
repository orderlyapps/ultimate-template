import type { Outline } from "../../types/Outline";

export const removeSection =
  (talkId: string, sectionIndex: number) => (state: { talks: Outline[] }) => {
    const now = Date.now();

    return {
      talks: state.talks.map((t) => {
        if (t.id !== talkId) return t;

        return {
          ...t,
          sections: t.sections.filter((_, i) => i !== sectionIndex),
          updatedAt: now,
        };
      }),
    };
  };
