import { IonFooter } from "@ionic/react";
import type { ComponentProps } from "react";

type FooterProps = ComponentProps<typeof IonFooter>;

export const Footer: React.FC<FooterProps> = ({ children, ...props }) => {
  return <IonFooter {...props}>{children}</IonFooter>;
};
