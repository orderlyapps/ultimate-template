import { z } from "zod";

export const groupSchema = z.object({
  id: z.uuid(),
  congregation_id: z.uuid(),
  name: z.string(),
  overseer_id: z.uuid().nullable(),
  assistant_id: z.uuid().nullable(),
});

export type Group = z.infer<typeof groupSchema>;
