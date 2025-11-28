import { IonIcon } from "@ionic/react";
import type { ComponentProps } from "react";

interface IconProps extends ComponentProps<typeof IonIcon> {}

export const Icon: React.FC<IconProps> = (props) => {
  return <IonIcon {...props} />;
};
