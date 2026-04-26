import z from "zod";

/** Schema for the congregation_admin table */
export const congregationAdminSchema = z.object({
  id: z.uuid(),
  auth_user_id: z.uuid(),
  congregation_id: z.uuid(),
  created_at: z.string(),
  created_by: z.uuid().nullable().optional(),
});

export type CongregationAdmin = z.infer<typeof congregationAdminSchema>;
