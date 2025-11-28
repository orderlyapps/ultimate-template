import { IonInput } from "@ionic/react";
import type { ComponentProps } from "react";

interface InputProps extends ComponentProps<typeof IonInput> {}

export const Input: React.FC<InputProps> = ({ children, ...props }) => {
  return <IonInput {...props}>{children}</IonInput>;
};
