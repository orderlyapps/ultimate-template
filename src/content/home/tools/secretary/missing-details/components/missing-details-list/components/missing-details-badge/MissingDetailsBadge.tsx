import { IonBadge } from "@ionic/react";

/**
 * Props for the MissingDetailsBadge component
 */
interface MissingDetailsBadgeProps {
  /** Label text to display in the badge */
  label: string;
  /** Ionic color for the badge */
  color: "warning" | "danger" | "medium";
}

/**
 * MissingDetailsBadge - A small badge component to indicate a missing detail.
 * Uses different colors to indicate priority:
 * - warning (orange): Phone, Address (important for contact)
 * - danger (red): Emergency Contact (critical for safety)
 * - medium (gray): Email, Birth Date, Baptism Date (less critical)
 */
export function MissingDetailsBadge({
  label,
  color,
}: MissingDetailsBadgeProps) {
  return (
    <IonBadge color={color} style={{ fontSize: "10px", padding: "2px 6px" }}>
      {label}
    </IonBadge>
  );
}
