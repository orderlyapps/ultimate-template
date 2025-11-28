import { IonSelect } from "@ionic/react";
import type { ComponentProps } from "react";

interface SelectProps extends ComponentProps<typeof IonSelect> {}

export const Select: React.FC<SelectProps> = ({ children, ...props }) => {
  return <IonSelect {...props}>{children}</IonSelect>;
};
