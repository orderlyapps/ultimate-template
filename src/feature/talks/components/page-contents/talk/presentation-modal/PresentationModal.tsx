import { IonContent, IonModal } from "@ionic/react";
import { useTalksStore } from "@feature/talks/state/useTalksStore";
import { useRef } from "react";
import { PresentationModalFooter } from "./components/footer/PresentationModalFooter";
import { PresentationModalContent } from "./components/content/PresentationModalContent";
import { PresentationModalHeader } from "./components/header/PresentationModalHeader";
import { useTalkPresentationModalStore } from "./hooks/useTalkPresentationModalStore";
import { useParams } from "react-router-dom";

interface TalkPresentationModalProps {
  isOpen: boolean;
  onDismiss: () => void;
}

export const PresentationModal: React.FC<TalkPresentationModalProps> = ({
  isOpen,
  onDismiss,
}) => {
  const modalRef = useRef<HTMLIonModalElement | null>(null);
  const initializeForTalk = useTalkPresentationModalStore(
    (s) => s.initializeForTalk
  );
  const reset = useTalkPresentationModalStore((s) => s.reset);

  const { talkId } = useParams<{ talkId: string }>();
  const talk = useTalksStore((s) => s.talks.find((t) => t.id === talkId));

  if (!talk) {
    return null;
  }

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
      id="fullscreen"
    >
      <PresentationModalHeader
        onClose={() => {
          modalRef.current?.dismiss();
        }}
      />
      <IonContent>
        <PresentationModalContent />
      </IonContent>
      <PresentationModalFooter />
    </IonModal>
  );
};
