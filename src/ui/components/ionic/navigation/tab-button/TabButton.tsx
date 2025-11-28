import { IonTabButton } from "@ionic/react";
import type { ComponentProps } from "react";

interface TabButtonProps extends Omit<ComponentProps<typeof IonTabButton>, "ref"> {}

export const TabButton: React.FC<TabButtonProps> = ({ children, ...props }) => {
  return <IonTabButton {...props}>{children}</IonTabButton>;
};
