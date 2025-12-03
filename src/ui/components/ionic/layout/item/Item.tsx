import { IonItem } from "@ionic/react";
import type { ComponentProps } from "react";

type ItemProps = ComponentProps<typeof IonItem>;

export const Item: React.FC<ItemProps> = ({ children, ...props }) => {
  return <IonItem {...props}>{children}</IonItem>;
};
