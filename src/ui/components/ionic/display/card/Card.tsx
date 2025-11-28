import { IonCard } from "@ionic/react";
import type { ComponentProps } from "react";

interface CardProps extends ComponentProps<typeof IonCard> {}

export const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return <IonCard {...props}>{children}</IonCard>;
};
