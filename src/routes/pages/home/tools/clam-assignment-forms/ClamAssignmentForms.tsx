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
import { useParams } from "react-router-dom";
import { ClamAssignmentFormsContent } from "@/content/home/tools/clam-assignment-forms/ClamAssignmentFormsContent";

export const ClamAssignmentForms: React.FC = () => {
  const { week_id } = useParams<{ week_id: string }>();

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
      <IonContent fullscreen>
        <ClamAssignmentFormsContent week_id={week_id} />
      </IonContent>
    </IonPage>
  );
};
