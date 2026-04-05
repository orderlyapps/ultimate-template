import { IonLabel } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";

export function AssignmentsContent() {
  return (
    <>
      <Item>
        <IonLabel>
          <Text bold>Bible Reading</Text>
          <Text size="sm" color="medium">Due: April 12</Text>
        </IonLabel>
      </Item>
      <Item>
        <IonLabel>
          <Text bold>Initial Call</Text>
          <Text size="sm" color="medium">Due: April 19</Text>
        </IonLabel>
      </Item>
      <Item lines="none">
        <IonLabel>
          <Text bold>Return Visit</Text>
          <Text size="sm" color="medium">Due: May 3</Text>
        </IonLabel>
      </Item>
    </>
  );
}
