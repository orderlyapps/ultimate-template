import { IonBadge } from "@ionic/react";
import type { ComponentProps } from "react";

type BadgeProps = ComponentProps<typeof IonBadge>;

export const Badge: React.FC<BadgeProps> = ({ children, ...props }) => {
  return <IonBadge {...props}>{children}</IonBadge>;
};
