/**
 * Permission types for the group reports permission system.
 * Supports super_admin, congregation_admin, and group-level permissions.
 */

/** Permission level for a specific resource */
export type PermissionLevel = "none" | "read" | "edit";

/** Individual group permission from report_permission table */
export interface GroupPermission {
  group_id: string;
  can_read: boolean;
  can_edit: boolean;
}

/** Clean permission from clean_permission table */
export interface CleanPermission {
  congregation_id: string;
  can_edit: boolean;
}

/** Secretary permission from secretary_permission table */
export interface SecretaryPermission {
  congregation_id: string;
}

/** Consolidated user permissions across all systems */
export interface UserPermissions {
  /** Whether the user is a super admin (full database access) */
  isSuperAdmin: boolean;

  /** Whether the user is a congregation admin for any congregation */
  isCongregationAdmin: boolean;

  /** The congregation ID the user belongs to (from their publisher record) */
  congregationId: string | null;

  /** Group-level permissions from report_permission table */
  groupPermissions: GroupPermission[];

  /** Clean table permissions from clean_permission table */
  cleanPermissions: CleanPermission[];

  /** Secretary permissions from secretary_permission table */
  secretaryPermissions: SecretaryPermission[];

  /** Whether permissions are still loading */
  isLoading: boolean;
}

/** Specific permission check types */
export type PermissionCheck =
  | "super_admin"
  | "congregation_admin"
  | "read:report"
  | "edit:report"
  | "edit:clean"
  | "secretary";

/** Result of a group permission check */
export interface GroupPermissionResult {
  canRead: boolean;
  canEdit: boolean;
}
