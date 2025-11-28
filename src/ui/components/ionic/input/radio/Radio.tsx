import { IonRadio } from "@ionic/react";
import type { ComponentProps } from "react";

interface RadioProps extends ComponentProps<typeof IonRadio> {}

export const Radio: React.FC<RadioProps> = ({ children, ...props }) => {
  return <IonRadio {...props}>{children}</IonRadio>;
};
