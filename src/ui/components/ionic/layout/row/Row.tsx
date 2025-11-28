import { IonRow } from "@ionic/react";
import type { ComponentProps } from "react";

interface RowProps extends ComponentProps<typeof IonRow> {}

export const Row: React.FC<RowProps> = ({ children, ...props }) => {
  return <IonRow {...props}>{children}</IonRow>;
};
