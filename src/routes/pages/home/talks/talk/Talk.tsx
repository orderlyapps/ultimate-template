import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { AddButton } from "@input/button/add-button/AddButton";
import { useTalksStore } from "@feature/talks/state/useTalksStore";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { AddSectionAlert } from "@feature/talks/components/add-section-alert/AddSectionAlert";

export const Talk: React.FC = () => {
  const { talkId } = useParams<{ talkId: string }>();
  const talk = useTalksStore((s) => s.talks.find((t) => t.id === talkId));
  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);
  const [addSectionAlertKey, setAddSectionAlertKey] = useState(0);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/talks" text="Talks" />
          </IonButtons>
          <IonButtons slot="end">
            <AddButton
              disabled={!talkId}
              onClick={() => {
                setAddSectionAlertKey((k) => k + 1);
                setIsAddSectionOpen(true);
              }}
            />
          </IonButtons>
          <IonTitle>{talk?.name ?? "Talk"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        {talk ? (
          <>
            <Text size="lg">{talk.sections.length} sections</Text>
            <AddSectionAlert
              key={addSectionAlertKey}
              talkId={talk.id}
              isOpen={isAddSectionOpen}
              onDismiss={() => setIsAddSectionOpen(false)}
            />
          </>
        ) : (
          <Text>Talk not found</Text>
        )}
      </IonContent>
    </IonPage>
  );
};
