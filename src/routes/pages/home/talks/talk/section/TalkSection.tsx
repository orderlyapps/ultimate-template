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
import { Space } from "@layout/space/Space";
import { useTalksStore } from "@feature/talks/state/useTalksStore";
import { useParams } from "react-router-dom";

export const TalkSection: React.FC = () => {
  const { talkId, sectionId } = useParams<{ talkId: string; sectionId: string }>();
  const talk = useTalksStore((s) => s.talks.find((t) => t.id === talkId));
  const section = talk?.sections.find((s) => s.id === sectionId);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/home/talks/${talkId}`} text="Talk" />
          </IonButtons>
          <IonTitle>{section?.name ?? "Section"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        {talk && section ? (
          <>
            <Text size="lg">{talk.name}</Text>
            <Space height="2" />
            <Text>{section.subsections.length} subsections</Text>
          </>
        ) : (
          <Text>Section not found</Text>
        )}
      </IonContent>
    </IonPage>
  );
};
