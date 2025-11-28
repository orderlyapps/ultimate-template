import { IonCheckbox } from "@ionic/react";
import type { ComponentProps } from "react";

interface CheckboxProps extends ComponentProps<typeof IonCheckbox> {}

export const Checkbox: React.FC<CheckboxProps> = ({ children, ...props }) => {
  return <IonCheckbox {...props}>{children}</IonCheckbox>;
};
