import { IonButton } from "@ionic/react";
import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<typeof IonButton>;

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <IonButton {...props}>{children}</IonButton>;
};
