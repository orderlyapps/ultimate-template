import { IonToggle } from "@ionic/react";
import type { ComponentProps } from "react";

type ToggleProps = ComponentProps<typeof IonToggle>;

export const Toggle: React.FC<ToggleProps> = ({ children, ...props }) => {
  return <IonToggle {...props}>{children}</IonToggle>;
};
