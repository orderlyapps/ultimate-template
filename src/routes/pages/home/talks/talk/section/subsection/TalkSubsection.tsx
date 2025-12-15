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

export const TalkSubsection: React.FC = () => {
  const { talkId, sectionId, subsectionId } = useParams<{
    talkId: string;
    sectionId: string;
    subsectionId: string;
  }>();

  const talk = useTalksStore((s) => s.talks.find((t) => t.id === talkId));
  const section = talk?.sections.find((s) => s.id === sectionId);
  const subsection = section?.subsections.find((ss) => ss.id === subsectionId);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref={`/home/talks/${talkId}/sections/${sectionId}`}
              text="Section"
            />
          </IonButtons>
          <IonTitle>{subsection?.name ?? "Subsection"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        {talk && section && subsection ? (
          <>
            <Text size="lg">{talk.name}</Text>
            <Space height="2" />
            <Text>{section.name}</Text>
            <Space height="2" />
            <Text>{subsection.timeAllocation}s</Text>
          </>
        ) : (
          <Text>Subsection not found</Text>
        )}
      </IonContent>
    </IonPage>
  );
};
