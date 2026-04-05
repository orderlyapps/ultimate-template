import { z } from "zod";

/** Schema for the public.report table */
export const reportSchema = z.object({
  confidential_id: z.uuid(),
  congregation_id: z.uuid(),
  date: z.string(), // date string
  active: z.boolean(),
  hours: z.number().nullable(),
  bible_studies: z.number().nullable(),
  comments: z.string().nullable(),
});

export type Report = z.infer<typeof reportSchema>;
