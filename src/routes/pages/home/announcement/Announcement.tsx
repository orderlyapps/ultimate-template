import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router-dom";
import { List } from "@ionic-layout/list/List";
import { Item } from "@ionic-layout/item/Item";
import { Label } from "@ionic-display/label/Label";
import { Text } from "@ionic-display/text/Text";

export const Announcement: React.FC = () => {
  const { announcementId } = useParams<{ announcementId: string }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/announcements" text="Announcements" />
          </IonButtons>
          <IonTitle>Announcement</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Announcement</IonTitle>
          </IonToolbar>
        </IonHeader>
        <List>
          <Item lines="none">
            <Label>
              <Text>Announcement ID: {announcementId}</Text>
            </Label>
          </Item>
        </List>
      </IonContent>
    </IonPage>
  );
};
