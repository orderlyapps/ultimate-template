import { IonButton, IonButtons, IonIcon } from "@ionic/react";
import play from "@icons/play.svg";
import { AddButton } from "@input/button/add-button/AddButton";
import { FileExport } from "@input/file-export/FileExport";
import { useTalksStore } from "@feature/talks/state/useTalksStore";
import { useParams } from "react-router-dom";

interface TalkPageHeaderButtonsProps {
  onOpenPresentation: () => void;
  onOpenAddSection: () => void;
}

export const TalkPageHeaderButtons: React.FC<TalkPageHeaderButtonsProps> = ({
  onOpenPresentation,
  onOpenAddSection,
}) => {
  const { talkId } = useParams<{ talkId: string }>();
  const talk = useTalksStore((s) => s.talks.find((t) => t.id === talkId));

  return (
    <IonButtons slot="end">
      {talk && (
        <FileExport
          getData={() => JSON.stringify(talk, null, 2)}
          filename={`${talk.name}.talk.ord`}
          iconOnly
        />
      )}
      <IonButton onClick={onOpenPresentation}>
        <IonIcon src={play} slot="icon-only" />
      </IonButton>
      <AddButton onClick={onOpenAddSection} />
    </IonButtons>
  );
};
