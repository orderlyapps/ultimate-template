import { IonMenu } from "@ionic/react";
import type { ComponentProps } from "react";

type MenuProps = ComponentProps<typeof IonMenu>;

export const Menu: React.FC<MenuProps> = ({ children, ...props }) => {
  return <IonMenu {...props}>{children}</IonMenu>;
};
