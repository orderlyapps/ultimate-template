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
import { AddButton } from "@input/button/add-button/AddButton";
import { useState } from "react";
import { AddSubsectionAlert } from "@feature/talks/components/add-subsection-alert/AddSubsectionAlert";
import { TalkSubsectionsList } from "@feature/talks/components/talk-subsections-list/TalkSubsectionsList";
import { EditableCondensedHeader } from "@feature/talks/components/editable-condensed-header/EditableCondensedHeader";

export const TalkSection: React.FC = () => {
  const { talkId, sectionId } = useParams<{ talkId: string; sectionId: string }>();
  const talk = useTalksStore((s) => s.talks.find((t) => t.id === talkId));
  const section = talk?.sections.find((s) => s.id === sectionId);
  const updateSectionName = useTalksStore((s) => s.updateSectionName);
  const [isAddSubsectionOpen, setIsAddSubsectionOpen] = useState(false);
  const [addSubsectionAlertKey, setAddSubsectionAlertKey] = useState(0);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref={`/home/talks/${talkId}`}
              text={talk?.name ?? "Talk"}
            />
          </IonButtons>
          <IonButtons slot="end">
            <AddButton
              disabled={!talkId || !sectionId}
              onClick={() => {
                setAddSubsectionAlertKey((k) => k + 1);
                setIsAddSubsectionOpen(true);
              }}
            />
          </IonButtons>
          <IonTitle>{section?.name ?? "Section"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <EditableCondensedHeader
              value={section?.name ?? "Section"}
              header="Rename Section"
              placeholder="Section name"
              disabled={!talkId || !sectionId || !talk || !section}
              onSave={(nextValue) => {
                if (!talkId || !sectionId) return;
                updateSectionName(talkId, sectionId, nextValue);
              }}
            />
          </IonToolbar>
        </IonHeader>
        {talk && section ? (
          <>
            <Space height="2" />
            <TalkSubsectionsList talkId={talk.id} section={section} />
            <AddSubsectionAlert
              key={addSubsectionAlertKey}
              talkId={talk.id}
              sectionId={section.id}
              isOpen={isAddSubsectionOpen}
              onDismiss={() => setIsAddSubsectionOpen(false)}
            />
          </>
        ) : (
          <Text>Section not found</Text>
        )}
      </IonContent>
    </IonPage>
  );
};
