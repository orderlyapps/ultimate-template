import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { AddButton } from "@input/button/add-button/AddButton";
import { useState } from "react";
import { GroupsList } from "@feature/db/group/components/groups-list/GroupsList";
import { AddGroupAlert } from "@feature/db/group/components/add-group-alert/AddGroupAlert";

export const Groups: React.FC = () => {
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);
  const [addGroupAlertKey, setAddGroupAlertKey] = useState(0);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/tools" text="Tools" />
          </IonButtons>
          <IonButtons slot="end">
            <AddButton
              onClick={() => {
                setAddGroupAlertKey((k) => k + 1);
                setIsAddGroupOpen(true);
              }}
            />
          </IonButtons>
          <IonTitle>Groups</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Groups</IonTitle>
          </IonToolbar>
        </IonHeader>
        <GroupsList />
        <AddGroupAlert
          key={addGroupAlertKey}
          isOpen={isAddGroupOpen}
          onDismiss={() => setIsAddGroupOpen(false)}
        />
      </IonContent>
    </IonPage>
  );
};
