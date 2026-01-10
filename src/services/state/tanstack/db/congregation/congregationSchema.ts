import z from "zod";

export const congregationSchema = z.object({
  id: z.uuid(),
  congregation_id: z.uuid().nullable(),
  name: z.string(),
});

export type Congregation = z.infer<typeof congregationSchema>;
