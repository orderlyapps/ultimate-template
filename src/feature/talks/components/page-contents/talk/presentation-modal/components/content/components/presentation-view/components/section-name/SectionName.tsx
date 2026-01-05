import { Text } from "@ionic-display/text/Text";
import { Item } from "@ionic-layout/item/Item";
import { IonLabel } from "@ionic/react";

type Props = {
  sectionName: string;
};

export function SectionName({ sectionName }: Props) {
  return (
    <Item>
      <IonLabel className="ion-text-nowrap">
        <Text bold size="sm" color="primary">
          {sectionName}
        </Text>
      </IonLabel>
    </Item>
  );
}
