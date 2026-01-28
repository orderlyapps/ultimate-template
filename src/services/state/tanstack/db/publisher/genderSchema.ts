import z from "zod";

export const genderOptions = [
  { id: "male", label: "Male" },
  { id: "female", label: "Male" },
] as const;

export const gender = z.union(
  genderOptions.map((option) => z.literal(option.id))
);

export type PublisherGender = z.infer<typeof gender>;
