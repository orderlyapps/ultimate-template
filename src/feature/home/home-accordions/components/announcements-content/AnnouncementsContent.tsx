import { IonLabel } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";

export function AnnouncementsContent() {
  return (
    <>
      <Item>
        <IonLabel>
          <Text bold>Circuit Assembly</Text>
          <Text size="sm" color="medium">May 17-18 at Assembly Hall</Text>
        </IonLabel>
      </Item>
      <Item>
        <IonLabel>
          <Text bold>New Territory Maps</Text>
          <Text size="sm" color="medium">Updated maps available at the literature counter</Text>
        </IonLabel>
      </Item>
      <Item lines="none">
        <IonLabel>
          <Text bold>Kingdom Hall Cleaning</Text>
          <Text size="sm" color="medium">Group 3 this week</Text>
        </IonLabel>
      </Item>
    </>
  );
}
