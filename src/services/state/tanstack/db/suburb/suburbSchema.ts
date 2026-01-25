import { z } from "zod";

export const suburbSchema = z.object({
  id: z.string().uuid(),
  congregation_id: z.string().uuid(),
  name: z.string(),
  bbox: z.tuple([z.number(), z.number(), z.number(), z.number()]),
});

export type Suburb = z.infer<typeof suburbSchema>;
