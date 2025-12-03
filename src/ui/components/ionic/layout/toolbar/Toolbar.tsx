import { IonToolbar } from "@ionic/react";
import type { ComponentProps } from "react";

type ToolbarProps = ComponentProps<typeof IonToolbar>;

export const Toolbar: React.FC<ToolbarProps> = ({ children, ...props }) => {
  return <IonToolbar {...props}>{children}</IonToolbar>;
};
