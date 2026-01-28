import z from "zod";

export const standingOptions = [
  { value: "elder", label: "Elder" },
  { value: "ministerial_servant", label: "Ministerial Servant" },
  { value: "publisher", label: "Publisher" },
  { value: "unbaptised_publisher", label: "Unbaptised Publisher" },
  { value: "associate", label: "Associate" },
] as const;

export const standing = z.union(
  standingOptions.map((option) => z.literal(option.value)),
);

export type PublisherStanding = z.infer<typeof standing>;
