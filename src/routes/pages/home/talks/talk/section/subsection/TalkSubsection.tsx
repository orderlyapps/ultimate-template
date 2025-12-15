import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useTalksStore } from "@feature/talks/state/useTalksStore";
import { TalkSubsectionDetails } from "../../../../../../../feature/talks/components/talk-subsection-details/TalkSubsectionDetails";
import { Text } from "@ionic-display/text/Text";
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
              text={section?.name ?? "Section"}
            />
          </IonButtons>
          <IonTitle>{subsection?.name ?? "Subsection"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{subsection?.name ?? "Subsection"}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {talk && section && subsection ? (
          <TalkSubsectionDetails
            talkId={talk.id}
            sectionId={section.id}
            subsection={subsection}
          />
        ) : (
          <Text>Subsection not found</Text>
        )}
      </IonContent>
    </IonPage>
  );
};
