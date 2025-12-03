import { IonRow } from "@ionic/react";
import type { ComponentProps } from "react";

type RowProps = ComponentProps<typeof IonRow>;

export const Row: React.FC<RowProps> = ({ children, ...props }) => {
  return <IonRow {...props}>{children}</IonRow>;
};
