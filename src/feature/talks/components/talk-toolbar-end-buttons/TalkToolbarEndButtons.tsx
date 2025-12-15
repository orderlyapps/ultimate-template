import { IonButton, IonButtons, IonIcon } from "@ionic/react";
import { playOutline } from "ionicons/icons";
import { AddButton } from "@input/button/add-button/AddButton";

interface TalkToolbarEndButtonsProps {
  talkId?: string;
  hasTalk: boolean;
  onOpenPresentation: () => void;
  onOpenAddSection: () => void;
}

export const TalkToolbarEndButtons: React.FC<TalkToolbarEndButtonsProps> = ({
  talkId,
  hasTalk,
  onOpenPresentation,
  onOpenAddSection,
}) => {
  return (
    <IonButtons slot="end">
      <IonButton disabled={!talkId || !hasTalk} onClick={onOpenPresentation}>
        <IonIcon icon={playOutline} slot="icon-only" />
      </IonButton>
      <AddButton disabled={!talkId} onClick={onOpenAddSection} />
    </IonButtons>
  );
};
