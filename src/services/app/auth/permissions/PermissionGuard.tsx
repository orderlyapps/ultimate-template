import { useHasPermission } from "./useHasPermission";
import type { PermissionCheck } from "./types";

interface PermissionGuardProps {
  /** The permission to check */
  permission: PermissionCheck;
  /** Optional group ID for report permissions */
  groupId?: string;
  /** Optional congregation ID of the group */
  groupCongregationId?: string;
  /** Content to render if permission is granted */
  children: React.ReactNode;
  /** Optional fallback content if permission is denied */
  fallback?: React.ReactNode;
}

/**
 * Component that conditionally renders children based on user permissions.
 * Supports role-based checks and resource-specific checks.
 *
 * @example
 * // Only show for super admins
 * <PermissionGuard permission="super_admin">
 *   <AdminPanel />
 * </PermissionGuard>
 *
 * @example
 * // Show for users with read access to a specific group
 * <PermissionGuard permission="read:report" groupId="group-uuid" groupCongregationId="congregation-uuid">
 *   <GroupReports />
 * </PermissionGuard>
 *
 * @example
 * // Show menu item if user has ANY report access
 * <PermissionGuard permission="read:report" fallback={null}>
 *   <MenuItem>Group Reports</MenuItem>
 * </PermissionGuard>
 */
export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  permission,
  groupId,
  groupCongregationId,
  children,
  fallback = null,
}) => {
  const hasPermission = useHasPermission(permission, groupId, groupCongregationId);

  if (!hasPermission) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
