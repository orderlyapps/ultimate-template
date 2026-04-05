import { IonLabel } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";

export function CalendarContent() {
  return (
    <>
      <Item>
        <IonLabel>
          <Text bold>Midweek Meeting</Text>
          <Text size="sm" color="medium">Wednesday 7:00 PM</Text>
        </IonLabel>
      </Item>
      <Item>
        <IonLabel>
          <Text bold>Weekend Meeting</Text>
          <Text size="sm" color="medium">Sunday 10:00 AM</Text>
        </IonLabel>
      </Item>
      <Item lines="none">
        <IonLabel>
          <Text bold>Field Service</Text>
          <Text size="sm" color="medium">Saturday 9:30 AM</Text>
        </IonLabel>
      </Item>
    </>
  );
}
