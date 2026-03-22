import { IonLabel } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";

export function ToolsContent() {
  return (
    <>
      <Item>
        <IonLabel>
          <Text bold>Timer</Text>
          <Text size="sm" color="medium">Practice talk timer</Text>
        </IonLabel>
      </Item>
      <Item>
        <IonLabel>
          <Text bold>Territory Map</Text>
          <Text size="sm" color="medium">View and manage territory</Text>
        </IonLabel>
      </Item>
      <Item lines="none">
        <IonLabel>
          <Text bold>Report</Text>
          <Text size="sm" color="medium">Submit field service report</Text>
        </IonLabel>
      </Item>
    </>
  );
}
