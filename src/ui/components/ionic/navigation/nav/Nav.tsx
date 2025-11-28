import { IonNav } from "@ionic/react";
import type { ComponentProps } from "react";

interface NavProps extends Omit<ComponentProps<typeof IonNav>, "ref"> {}

export const Nav: React.FC<NavProps> = (props) => {
  return <IonNav {...props} />;
};
