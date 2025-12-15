import { IonButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import type { ComponentProps } from "react";

type AddButtonProps = ComponentProps<typeof IonButton>;

export const AddButton: React.FC<AddButtonProps> = ({ ...props }) => {
  return (
    <IonButton {...props}>
      <IonIcon icon={add} slot="icon-only" />
    </IonButton>
  );
};
