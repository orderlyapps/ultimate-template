import { IonDatetime } from "@ionic/react";
import type { ComponentProps } from "react";

type DatetimeProps = ComponentProps<typeof IonDatetime>;

export const Datetime: React.FC<DatetimeProps> = ({ children, ...props }) => {
  return <IonDatetime {...props}>{children}</IonDatetime>;
};
