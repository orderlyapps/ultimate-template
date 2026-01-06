
export type Subsection = {
  id: string;
  name: string;
  content: Record<string, unknown> | string;
  timeAllocation: number;
};
