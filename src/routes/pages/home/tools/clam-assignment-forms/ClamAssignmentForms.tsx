import React, { useState } from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router-dom";
import { ClamAssignmentFormsContent } from "@/content/home/tools/clam-assignment-forms/ClamAssignmentFormsContent";
import { SettingsModal } from "@/content/home/tools/clam-assignment-forms/components/settings-modal/SettingsModal";
import settings from "@icons/settings.svg";

export const ClamAssignmentForms: React.FC = () => {
  const { week_id } = useParams<{ week_id: string }>();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/tools/reminders" text="Reminders" />
          </IonButtons>
          <IonTitle>CLAM Assignment Forms</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsSettingsOpen(true)}>
              <IonIcon src={settings} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ClamAssignmentFormsContent week_id={week_id} />
      </IonContent>
      <SettingsModal isOpen={isSettingsOpen} onDismiss={() => setIsSettingsOpen(false)} />
    </IonPage>
  );
};
