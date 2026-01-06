import type { Outline } from "../../types/Outline";

export const addTalk = (name: string) => (state: { talks: Outline[] }) => {
  const now = Date.now();
  const newTalk: Outline = {
    id: crypto.randomUUID(),
    name,
    sections: [],
    createdAt: now,
    updatedAt: now,
  };

  return {
    talks: [newTalk, ...state.talks],
  };
};
