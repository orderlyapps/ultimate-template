import z from "zod";

export const authUserSchema = z.object({
  auth_user_id: z.uuid(),
  created_at: z.string(),
  is_super_admin: z.boolean(),
  created_by: z.uuid(),
});

export type AuthUser = z.infer<typeof authUserSchema>;
