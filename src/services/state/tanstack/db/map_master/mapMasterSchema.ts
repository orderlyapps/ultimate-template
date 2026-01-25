import { z } from "zod";

export const mapMasterSchema = z.object({
  congregation_id: z.string().uuid(),
  boundary: z.any(), // jsonb
  details: z.string().nullable(),
});

export type MapMaster = z.infer<typeof mapMasterSchema>;
