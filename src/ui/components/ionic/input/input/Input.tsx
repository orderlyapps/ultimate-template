import { IonInput } from "@ionic/react";
import type { ComponentProps } from "react";

type InputProps = ComponentProps<typeof IonInput>;

export const Input: React.FC<InputProps> = ({ children, ...props }) => {
  return <IonInput {...props}>{children}</IonInput>;
};
