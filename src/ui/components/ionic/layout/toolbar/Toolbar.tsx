import { IonToolbar } from "@ionic/react";
import type { ComponentProps } from "react";

interface ToolbarProps extends ComponentProps<typeof IonToolbar> {}

export const Toolbar: React.FC<ToolbarProps> = ({ children, ...props }) => {
  return <IonToolbar {...props}>{children}</IonToolbar>;
};
