import type { Subsection } from "@feature/talks/types/Subsection";


export type Section = {
  id: string;
  name: string;
  subsections: Subsection[];
};
