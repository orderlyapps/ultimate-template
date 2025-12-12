import { Text } from "@ionic-display/text/Text";
import { IonLabel } from "@ionic/react";
import type { ComponentProps } from "react";

type LabelProps = ComponentProps<typeof IonLabel>;

export const Label: React.FC<LabelProps> = ({ children, ...props }) => {
  return (
    <IonLabel {...props}>
      <Text bold>{children}</Text>
    </IonLabel>
  );
};
