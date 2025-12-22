import { IonButton, IonButtons, IonIcon } from "@ionic/react";
import play from "@icons/play.svg";
import { AddButton } from "@input/button/add-button/AddButton";
import { FileExport } from "@input/file-export/FileExport";
import type { Outline } from "@feature/talks/state/useTalksStore";

interface TalkPageHeaderButtonsProps {
  talkId?: string;
  hasTalk: boolean;
  onOpenPresentation: () => void;
  onOpenAddSection: () => void;
  talk?: Outline;
}

export const TalkPageHeaderButtons: React.FC<TalkPageHeaderButtonsProps> = ({
  talkId,
  hasTalk,
  onOpenPresentation,
  onOpenAddSection,
  talk,
}) => {
  return (
    <IonButtons slot="end">
      {talk && (
        <FileExport
          getData={() => JSON.stringify(talk, null, 2)}
          filename={`${talk.name}.talk.ord`}
          iconOnly
        />
      )}
      <IonButton disabled={!talkId || !hasTalk} onClick={onOpenPresentation}>
        <IonIcon src={play} slot="icon-only" />
      </IonButton>
      <AddButton disabled={!talkId} onClick={onOpenAddSection} />
    </IonButtons>
  );
};
