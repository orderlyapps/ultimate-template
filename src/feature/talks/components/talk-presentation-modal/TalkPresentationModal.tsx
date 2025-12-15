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
import { useRef } from "react";
import { TalkPresentationModalContent } from "./components/talk-presentation-modal-content/TalkPresentationModalContent";
import { useTalkPresentationModalStore } from "./hooks/useTalkPresentationModalStore";

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
  const modalRef = useRef<HTMLIonModalElement | null>(null);
  const initializeForTalk = useTalkPresentationModalStore(
    (s) => s.initializeForTalk
  );
  const reset = useTalkPresentationModalStore((s) => s.reset);

  return (
    <IonModal
      ref={modalRef}
      isOpen={isOpen}
      onDidDismiss={() => {
        reset();
        onDismiss();
      }}
      onWillPresent={() => {
        initializeForTalk(talk);
      }}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>{talk.name}</IonTitle>
          <IonButtons slot="end">
            <CloseButton
              onClick={() => {
                modalRef.current?.dismiss();
              }}
            />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <TalkPresentationModalContent />
      </IonContent>
    </IonModal>
  );
};
