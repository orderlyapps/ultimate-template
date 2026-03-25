import { IonButton } from "@ionic/react";
import type { ComponentProps } from "react";
import { Text } from "@ionic-display/text/Text";

type AddButtonProps = ComponentProps<typeof IonButton>;

export const EditButton: React.FC<AddButtonProps> = ({ ...props }) => {
  return (
    <IonButton {...props}>
      <Text bold color="primary" size="sm">
        Edit
      </Text>
    </IonButton>
  );
};
