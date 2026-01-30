import { z } from "zod";

export const eventSchema = z.object({
  id: z.uuid(),
  congregation_id: z.uuid(),
  name: z.string().default(""),
  description: z.string().default(""),
  address: z.string().default(""),
  coordinates: z.array(z.number()).nullable(),
  all_day: z.boolean(),
  start_date: z.string(), // date string in ISO format
  start_time: z.string().nullable(), // time string
  end_date: z.string().nullable(), // date string in ISO format
  end_time: z.string().nullable(), // time string
  type: z.string().nullable().default(""),
});

export type Event = z.infer<typeof eventSchema>;
