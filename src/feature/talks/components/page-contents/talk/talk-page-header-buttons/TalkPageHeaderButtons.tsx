import { IonButton, IonButtons, IonIcon } from "@ionic/react";
import play from "@icons/play.svg";
import { AddButton } from "@input/button/add-button/AddButton";
import { FileExport } from "@input/file-export/FileExport";
import { useTalksStore } from "@feature/talks/state/useTalksStore";
import { useParams } from "react-router-dom";
import { AddSectionAlert } from "@feature/talks/components/add-alerts/add-section-alert/AddSectionAlert";
import { useState } from "react";
import { PresentationModal } from "@feature/talks/components/page-contents/talk/presentation-modal/PresentationModal";

export const TalkPageHeaderButtons: React.FC = () => {
  const { talkId } = useParams<{ talkId: string }>();
  const talk = useTalksStore((s) => s.talks.find((t) => t.id === talkId));

  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);
  const [addSectionAlertKey, setAddSectionAlertKey] = useState(0);

  const [isPresentationOpen, setIsPresentationOpen] = useState(false);

  return (
    <>
      <IonButtons slot="end">
        {talk && (
          <FileExport
            getData={() => JSON.stringify(talk, null, 2)}
            filename={`${talk.name}.talk.ord`}
            iconOnly
          />
        )}
        <IonButton onClick={() => setIsPresentationOpen(true)}>
          <IonIcon src={play} slot="icon-only" />
        </IonButton>
        <AddButton
          onClick={() => {
            setAddSectionAlertKey((k) => k + 1);
            setIsAddSectionOpen(true);
          }}
        />
      </IonButtons>
      <AddSectionAlert
        key={addSectionAlertKey}
        isOpen={isAddSectionOpen}
        onDismiss={() => setIsAddSectionOpen(false)}
      />

      <PresentationModal
        isOpen={isPresentationOpen}
        onDismiss={() => setIsPresentationOpen(false)}
      />
    </>
  );
};
