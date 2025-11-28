import { IonLabel } from "@ionic/react";
import type { ComponentProps } from "react";

interface LabelProps extends ComponentProps<typeof IonLabel> {}

export const Label: React.FC<LabelProps> = ({ children, ...props }) => {
  return <IonLabel {...props}>{children}</IonLabel>;
};
