import { IonCol } from "@ionic/react";
import type { ComponentProps } from "react";

type ColProps = ComponentProps<typeof IonCol>;

export const Col: React.FC<ColProps> = ({ children, ...props }) => {
  return <IonCol {...props}>{children}</IonCol>;
};
