import { IonContent } from "@ionic/react";
import type { ComponentProps } from "react";

interface ContentProps extends ComponentProps<typeof IonContent> {}

export const Content: React.FC<ContentProps> = ({ children, ...props }) => {
  return <IonContent {...props}>{children}</IonContent>;
};
