import { IonTabs } from "@ionic/react";
import type { ComponentProps } from "react";

interface TabsProps extends ComponentProps<typeof IonTabs> {}

export const Tabs: React.FC<TabsProps> = ({ children, ...props }) => {
  return <IonTabs {...props}>{children}</IonTabs>;
};
