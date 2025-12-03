import { IonHeader } from "@ionic/react";
import type { ComponentProps } from "react";

type HeaderProps = ComponentProps<typeof IonHeader>;

export const Header: React.FC<HeaderProps> = ({ children, ...props }) => {
  return <IonHeader {...props}>{children}</IonHeader>;
};
