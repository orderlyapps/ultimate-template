import type { Outline } from "../../types/Outline";

export const duplicateTalk =
  (talkId: string) => (state: { talks: Outline[] }) => {
    const now = Date.now();
    const talkIndex = state.talks.findIndex((t) => t.id === talkId);
    const talkToCopy = state.talks[talkIndex];

    if (!talkToCopy) {
      return state;
    }

    const copiedTalk: Outline = {
      ...talkToCopy,
      id: crypto.randomUUID(),
      name: `${talkToCopy.name} copy`,
      createdAt: now,
      updatedAt: now,
      sections: talkToCopy.sections.map((section) => {
        return {
          ...section,
          id: crypto.randomUUID(),
          subsections: section.subsections.map((ss) => ({
            ...ss,
            id: crypto.randomUUID(),
          })),
        };
      }),
    };

    const nextTalks = [...state.talks];
    nextTalks.splice(talkIndex + 1, 0, copiedTalk);

    return {
      talks: nextTalks,
    };
  };
