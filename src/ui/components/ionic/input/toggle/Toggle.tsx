import { IonToggle } from "@ionic/react";
import type { ComponentProps } from "react";

interface ToggleProps extends ComponentProps<typeof IonToggle> {}

export const Toggle: React.FC<ToggleProps> = ({ children, ...props }) => {
  return <IonToggle {...props}>{children}</IonToggle>;
};
