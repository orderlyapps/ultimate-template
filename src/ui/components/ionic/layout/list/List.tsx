import { IonList } from "@ionic/react";
import type { ComponentProps } from "react";

type ListProps = ComponentProps<typeof IonList>;

export const List: React.FC<ListProps> = ({ children, ...props }) => {
  return <IonList {...props}>{children}</IonList>;
};
