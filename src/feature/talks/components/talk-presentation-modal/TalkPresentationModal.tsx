import {
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  IonButtons,
} from "@ionic/react";
import { CloseButton } from "@input/button/close-button/CloseButton";
import type { Outline } from "@feature/talks/state/useTalksStore";

interface TalkPresentationModalProps {
  isOpen: boolean;
  talk: Outline;
  onDismiss: () => void;
}

export const TalkPresentationModal: React.FC<TalkPresentationModalProps> = ({
  isOpen,
  talk,
  onDismiss,
}) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{talk.name}</IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={onDismiss} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" />
    </IonModal>
  );
};
