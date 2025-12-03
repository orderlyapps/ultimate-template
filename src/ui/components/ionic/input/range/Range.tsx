import { IonRange } from "@ionic/react";
import type { ComponentProps } from "react";

type RangeProps = ComponentProps<typeof IonRange>;

export const Range: React.FC<RangeProps> = ({ children, ...props }) => {
  return <IonRange {...props}>{children}</IonRange>;
};
