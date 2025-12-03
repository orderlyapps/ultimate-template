import { IonTabs } from "@ionic/react";
import type { ComponentProps } from "react";

type TabsProps = ComponentProps<typeof IonTabs>;

export const Tabs: React.FC<TabsProps> = ({ children, ...props }) => {
  return <IonTabs {...props}>{children}</IonTabs>;
};
