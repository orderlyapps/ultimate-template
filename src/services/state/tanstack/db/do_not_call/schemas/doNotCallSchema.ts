import z from "zod";

export const doNotCallSchema = z.object({
  id: z.uuid(),
  created_at: z.string(),
  coordinates: z.tuple([z.number(), z.number()]),
  congregation_id: z.uuid(),
  suburb_id: z.uuid(),
  street_id: z.uuid(),
  house_number: z.string(),
  unit_number: z.string().nullable(),
  notes: z.string().nullable(),
  match_data: z.object(),
  updated_at: z.string(),
});

export type DoNotCall = z.infer<typeof doNotCallSchema>;
