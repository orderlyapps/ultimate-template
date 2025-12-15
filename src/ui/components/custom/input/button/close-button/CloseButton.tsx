import { IonButton, IonIcon } from "@ionic/react";
import { close } from "ionicons/icons";
import type { ComponentProps } from "react";

type CloseButtonProps = ComponentProps<typeof IonButton>;

export const CloseButton: React.FC<CloseButtonProps> = ({ ...props }) => {
  return (
    <IonButton {...props}>
      <IonIcon icon={close} slot="icon-only" />
    </IonButton>
  );
};
