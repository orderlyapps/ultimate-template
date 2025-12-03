import { IonChip } from "@ionic/react";
import type { ComponentProps } from "react";

type ChipProps = ComponentProps<typeof IonChip>;

export const Chip: React.FC<ChipProps> = ({ children, ...props }) => {
  return <IonChip {...props}>{children}</IonChip>;
};
