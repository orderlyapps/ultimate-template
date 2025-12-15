import { IonCardTitle } from "@ionic/react";
import type { ComponentProps } from "react";

type CardTitleProps = ComponentProps<typeof IonCardTitle>;

export const CardTitle: React.FC<CardTitleProps> = ({ children, ...props }) => {
  return <IonCardTitle {...props}>{children}</IonCardTitle>;
};
