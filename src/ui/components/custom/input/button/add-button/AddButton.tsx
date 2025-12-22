import { IonButton, IonIcon } from "@ionic/react";
import type { ComponentProps } from "react";
import add from "@icons/add.svg";

type AddButtonProps = ComponentProps<typeof IonButton>;

export const AddButton: React.FC<AddButtonProps> = ({ ...props }) => {
  return (
    <IonButton {...props}>
      <IonIcon src={add} slot="icon-only" size="large" />
    </IonButton>
  );
};
