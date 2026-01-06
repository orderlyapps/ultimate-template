import type { Outline } from "../../types/Outline";

export const addSection =
  (talkId: string, name: string) => (state: { talks: Outline[] }) => {
    const now = Date.now();

    return {
      talks: state.talks.map((t) => {
        if (t.id !== talkId) return t;

        return {
          ...t,
          sections: [
            ...t.sections,
            { id: crypto.randomUUID(), name, subsections: [] },
          ],
          updatedAt: now,
        };
      }),
    };
  };
