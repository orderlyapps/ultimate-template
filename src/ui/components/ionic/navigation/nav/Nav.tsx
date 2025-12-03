import { IonNav } from "@ionic/react";
import type { ComponentProps } from "react";

type NavProps = Omit<ComponentProps<typeof IonNav>, "ref">;

export const Nav: React.FC<NavProps> = (props) => {
  return <IonNav {...props} />;
};
