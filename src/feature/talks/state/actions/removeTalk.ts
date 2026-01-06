import type { Outline } from "../../types/Outline";

export const removeTalk = (id: string) => (state: { talks: Outline[] }) => ({
  talks: state.talks.filter((t) => t.id !== id),
});
