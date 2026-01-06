import type { Outline } from "../../types/Outline";

export const reorderSections =
  (talkId: string, fromIndex: number, toIndex: number) =>
  (state: { talks: Outline[] }) => {
    const now = Date.now();

    return {
      talks: state.talks.map((t) => {
        if (t.id !== talkId) return t;

        const nextSections = [...t.sections];
        const [moved] = nextSections.splice(fromIndex, 1);

        if (!moved) return t;

        nextSections.splice(toIndex, 0, moved);

        return {
          ...t,
          sections: nextSections,
          updatedAt: now,
        };
      }),
    };
  };
