import { IonRadio } from "@ionic/react";
import type { ComponentProps } from "react";

type RadioProps = ComponentProps<typeof IonRadio>;

export const Radio: React.FC<RadioProps> = ({ children, ...props }) => {
  return <IonRadio {...props}>{children}</IonRadio>;
};
