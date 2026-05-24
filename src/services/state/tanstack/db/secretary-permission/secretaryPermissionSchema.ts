import z from "zod";

/** Schema for the secretary_permission table */
export const secretaryPermissionSchema = z.object({
  id: z.uuid(),
  auth_user_id: z.uuid(),
  congregation_id: z.uuid(),
  granted_by: z.uuid().nullable().optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type SecretaryPermission = z.infer<typeof secretaryPermissionSchema>;
