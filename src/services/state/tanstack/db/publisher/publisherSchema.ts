import z from "zod";
import { gender } from "./genderSchema";
import { standing } from "./standingSchema";
import { type } from "./typeSchema";

export const publisherSchema = z.object({
  id: z.uuid(),
  congregation_id: z.uuid(),
  display_name: z.string().nullable().optional(),
  first_name: z.string(),
  middle_name: z.string().nullable().optional(),
  last_name: z.string(),
  family_id: z.uuid().nullable().optional(),
  group_id: z.uuid().nullable().optional(),
  gender: gender,
  standing: standing,
  type: type,
});

export type Publisher = z.infer<typeof publisherSchema>;
