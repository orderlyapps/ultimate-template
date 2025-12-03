import { IonCheckbox } from "@ionic/react";
import type { ComponentProps } from "react";

type CheckboxProps = ComponentProps<typeof IonCheckbox>;

export const Checkbox: React.FC<CheckboxProps> = ({ children, ...props }) => {
  return <IonCheckbox {...props}>{children}</IonCheckbox>;
};
