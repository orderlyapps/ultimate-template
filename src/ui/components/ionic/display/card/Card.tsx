import { IonCard } from "@ionic/react";
import type { ComponentProps } from "react";

type CardProps = ComponentProps<typeof IonCard>;

export const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return <IonCard {...props}>{children}</IonCard>;
};
