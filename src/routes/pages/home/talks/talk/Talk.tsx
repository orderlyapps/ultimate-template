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
import { useTalksStore } from "@feature/talks/state/useTalksStore";
import { useParams } from "react-router-dom";

export const Talk: React.FC = () => {
  const { talkId } = useParams<{ talkId: string }>();
  const talk = useTalksStore((s) => s.talks.find((t) => t.id === talkId));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/talks" text="Talks" />
          </IonButtons>
          <IonTitle>{talk?.name ?? "Talk"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        {talk ? (
          <Text size="lg">{talk.sections.length} sections</Text>
        ) : (
          <Text>Talk not found</Text>
        )}
      </IonContent>
    </IonPage>
  );
};
