import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { List } from "@ionic-layout/list/List";
import { Item } from "@ionic-layout/item/Item";
import { Label } from "@ionic-display/label/Label";
import { Text } from "@ionic-display/text/Text";

export const Announcements: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Home" />
          </IonButtons>
          <IonTitle>Announcements</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Announcements</IonTitle>
          </IonToolbar>
        </IonHeader>
        <List>
          <Item lines="none">
            <Label>
              <Text>No announcements available</Text>
            </Label>
          </Item>
        </List>
      </IonContent>
    </IonPage>
  );
};
