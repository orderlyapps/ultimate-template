import { IonButton } from "@ionic/react";
import type { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<typeof IonButton> {}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <IonButton {...props}>{children}</IonButton>;
};
