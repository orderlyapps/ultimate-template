import type { Section } from "@feature/talks/types/Section";


export type Outline = {
  id: string;
  name: string;
  sections: Section[];
  createdAt: number;
  updatedAt: number;
};
