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
import { EditableCondensedHeader } from "@feature/talks/components/editable-condensed-header/EditableCondensedHeader";

export const TalkSubsection: React.FC = () => {
  const { talkId, sectionId, subsectionId } = useParams<{
    talkId: string;
    sectionId: string;
    subsectionId: string;
  }>();

  const talk = useTalksStore((s) => s.talks.find((t) => t.id === talkId));
  const section = talk?.sections.find((s) => s.id === sectionId);
  const subsection = section?.subsections.find((ss) => ss.id === subsectionId);
  const updateSubsectionName = useTalksStore((s) => s.updateSubsectionName);

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
          <IonTitle />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <EditableCondensedHeader
              value={subsection?.name ?? "Subsection"}
              header="Rename Subsection"
              placeholder="Subsection name"
              disabled={
                !talkId ||
                !sectionId ||
                !subsectionId ||
                !talk ||
                !section ||
                !subsection
              }
              onSave={(nextValue) => {
                if (!talkId || !sectionId || !subsectionId) return;
                updateSubsectionName(
                  talkId,
                  sectionId,
                  subsectionId,
                  nextValue
                );
              }}
            />
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
