import { IonGrid } from "@ionic/react";
import type { ComponentProps } from "react";

type GridProps = ComponentProps<typeof IonGrid>;

export const Grid: React.FC<GridProps> = ({ children, ...props }) => {
  return <IonGrid {...props}>{children}</IonGrid>;
};
