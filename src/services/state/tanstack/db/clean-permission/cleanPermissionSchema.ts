import z from "zod";

/** Schema for the clean_permission table */
export const cleanPermissionSchema = z.object({
  id: z.uuid(),
  auth_user_id: z.uuid(),
  congregation_id: z.uuid(),
  can_edit: z.boolean(),
  granted_by: z.uuid().nullable().optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type CleanPermission = z.infer<typeof cleanPermissionSchema>;
