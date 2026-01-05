import { IonContent, IonModal } from "@ionic/react";
import type { Outline } from "@feature/talks/state/useTalksStore";
import { useRef } from "react";
import { PresentationModalFooter } from "./components/footer/PresentationModalFooter";
import { PresentationModalContent } from "./components/content/PresentationModalContent";
import { PresentationModalHeader } from "./components/header/PresentationModalHeader";
import { useTalkPresentationModalStore } from "./hooks/useTalkPresentationModalStore";

interface TalkPresentationModalProps {
  isOpen: boolean;
  talk: Outline;
  onDismiss: () => void;
}

export const PresentationModal: React.FC<TalkPresentationModalProps> = ({
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
      id="fullscreen"
    >
      <PresentationModalHeader
        talk={talk}
        onClose={() => {
          modalRef.current?.dismiss();
        }}
      />
      <IonContent>
        <PresentationModalContent talk={talk} />
      </IonContent>
      <PresentationModalFooter talk={talk} />
    </IonModal>
  );
};
