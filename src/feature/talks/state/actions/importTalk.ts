import type { Outline } from "../../types/Outline";

export const importTalk = (talk: Outline) => (state: { talks: Outline[] }) => {
  const now = Date.now();
  const newTalk: Outline = {
    ...talk,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };

  return {
    talks: [newTalk, ...state.talks],
  };
};
