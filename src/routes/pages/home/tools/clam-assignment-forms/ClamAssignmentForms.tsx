import React from "react";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ClamAssignmentFormsContent } from "@/content/home/tools/clam-assignment-forms/ClamAssignmentFormsContent";

export const ClamAssignmentForms: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/tools/reminders" text="Reminders" />
          </IonButtons>
          <IonTitle>CLAM Assignment Forms</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">CLAM Assignment Forms</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ClamAssignmentFormsContent />
      </IonContent>
    </IonPage>
  );
};
