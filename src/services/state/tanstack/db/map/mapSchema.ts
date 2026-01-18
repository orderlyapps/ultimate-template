import { z } from "zod";

export const mapSchema = z.object({
  id: z.string().uuid(),
  congregation_id: z.string().uuid(),
  name: z.string(),
  details: z.string().nullable(),
  boundary: z.any().nullable(), // jsonb
  blocks: z.any().nullable(), // jsonb
});

export type Map = z.infer<typeof mapSchema>;
