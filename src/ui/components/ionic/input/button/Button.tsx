import { IonButton } from "@ionic/react";
import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<typeof IonButton>;

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  const defaultProps = {
    className: "ion-margin",
    expand: "block" as const,
    ...props,
  };

  return <IonButton {...defaultProps}>{children}</IonButton>;
};
