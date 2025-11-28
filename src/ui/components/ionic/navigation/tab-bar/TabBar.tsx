import { IonTabBar } from "@ionic/react";
import type { ComponentProps } from "react";

interface TabBarProps extends ComponentProps<typeof IonTabBar> {}

export const TabBar: React.FC<TabBarProps> = ({ children, ...props }) => {
  return <IonTabBar {...props}>{children}</IonTabBar>;
};
