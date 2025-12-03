import { IonSelect } from "@ionic/react";
import type { ComponentProps } from "react";

type SelectProps = ComponentProps<typeof IonSelect>;

export const Select: React.FC<SelectProps> = ({ children, ...props }) => {
  return <IonSelect {...props}>{children}</IonSelect>;
};
