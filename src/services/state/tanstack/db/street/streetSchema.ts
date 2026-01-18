import { z } from "zod";

export const streetSchema = z.object({
  id: z.string().uuid(),
  congregation_id: z.string().uuid(),
  suburb_id: z.string().uuid(),
  name: z.string(),
  coordinates: z.array(z.number()),
});

export type Street = z.infer<typeof streetSchema>;
