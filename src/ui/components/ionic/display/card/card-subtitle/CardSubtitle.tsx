import { IonCardSubtitle } from "@ionic/react";
import type { ComponentProps } from "react";

type CardSubtitleProps = ComponentProps<typeof IonCardSubtitle>;

export const CardSubtitle: React.FC<CardSubtitleProps> = ({
  children,
  ...props
}) => {
  return <IonCardSubtitle {...props}>{children}</IonCardSubtitle>;
};
