import { IonTitle } from "@ionic/react";
import type { ComponentProps } from "react";

interface TitleProps extends ComponentProps<typeof IonTitle> {}

export const Title: React.FC<TitleProps> = ({ children, ...props }) => {
  return <IonTitle {...props}>{children}</IonTitle>;
};
