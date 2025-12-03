import { IonTitle } from "@ionic/react";
import type { ComponentProps } from "react";

type TitleProps = ComponentProps<typeof IonTitle>;

export const Title: React.FC<TitleProps> = ({ children, ...props }) => {
  return <IonTitle {...props}>{children}</IonTitle>;
};
