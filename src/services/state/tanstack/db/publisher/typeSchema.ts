import z from "zod";

export const typeOptions = [
  { id: "publisher", label: "Publisher" },
  { id: "regular_pioneer", label: "Regular Pioneer" },
  { id: "continuous_auxilary", label: "Continuous Auxilary" },
  { id: "inactive", label: "Inactive" },
  { id: "speaker", label: "Speaker" },
  { id: "associate", label: "Associate" },
] as const;

export const type = z.union(typeOptions.map((option) => z.literal(option.id)));

export type PublisherType = z.infer<typeof type>;
