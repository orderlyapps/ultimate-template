import { Text } from "@ionic-display/text/Text";
import { Item } from "@ionic-layout/item/Item";
import { IonLabel } from "@ionic/react";

type Props = {
  subsectionName: string;
};

export function SubsectionName({ subsectionName }: Props) {
  return (
    <Item>
      <IonLabel>
        <Text bold size="xl">
          {subsectionName}
        </Text>
      </IonLabel>
    </Item>
  );
}
