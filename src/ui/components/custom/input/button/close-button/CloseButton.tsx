import { IonButton, IonIcon } from "@ionic/react";
import cross from "@icons/cross.svg";
import type { ComponentProps } from "react";

type CloseButtonProps = ComponentProps<typeof IonButton>;

export const CloseButton: React.FC<CloseButtonProps> = ({ ...props }) => {
  return (
    <IonButton {...props}>
      <IonIcon src={cross} slot="icon-only" />
    </IonButton>
  );
};
