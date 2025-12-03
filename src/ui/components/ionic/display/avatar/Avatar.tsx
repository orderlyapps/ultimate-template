import { IonAvatar } from "@ionic/react";
import type { ComponentProps } from "react";

type AvatarProps = ComponentProps<typeof IonAvatar>;

export const Avatar: React.FC<AvatarProps> = ({ children, ...props }) => {
  return <IonAvatar {...props}>{children}</IonAvatar>;
};
