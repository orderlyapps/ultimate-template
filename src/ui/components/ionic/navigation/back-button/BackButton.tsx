import { IonBackButton } from "@ionic/react";
import type { ComponentProps } from "react";

type BackButtonProps = Omit<ComponentProps<typeof IonBackButton>, "ref">;

export const BackButton: React.FC<BackButtonProps> = (props) => {
  return <IonBackButton {...props} />;
};
