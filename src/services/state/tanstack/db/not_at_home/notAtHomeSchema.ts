import { z } from "zod";

export const notAtHomeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string(), // timestamp string
  coordinates: z.array(z.number()),
  congregation_id: z.string().uuid(),
  suburb_id: z.string().uuid(),
  street_id: z.string().uuid(),
  house_number: z.string(),
  unit_number: z.string().nullable().default(""),
  visit_log: z.array(z.string()), // array of timestamp strings
  write: z.boolean(),
  match_data: z.any(), // jsonb
});

export type NotAtHome = z.infer<typeof notAtHomeSchema>;
