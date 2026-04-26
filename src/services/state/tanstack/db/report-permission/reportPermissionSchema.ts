import z from "zod";

/** Schema for the report_permission table */
export const reportPermissionSchema = z.object({
  id: z.uuid(),
  auth_user_id: z.uuid(),
  group_id: z.uuid(),
  can_read: z.boolean(),
  can_edit: z.boolean(),
  granted_by: z.uuid().nullable().optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type ReportPermission = z.infer<typeof reportPermissionSchema>;
