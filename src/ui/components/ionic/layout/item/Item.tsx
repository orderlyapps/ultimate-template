import { IonItem } from "@ionic/react";
import type { ComponentProps } from "react";

interface ItemProps extends ComponentProps<typeof IonItem> {}

export const Item: React.FC<ItemProps> = ({ children, ...props }) => {
  return <IonItem {...props}>{children}</IonItem>;
};
