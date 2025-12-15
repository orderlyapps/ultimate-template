import {
  IonContent,
  IonModal,
} from "@ionic/react";
import type { Outline } from "@feature/talks/state/useTalksStore";
import { useRef } from "react";
import { TalkPresentationModalContent } from "./components/talk-presentation-modal-content/TalkPresentationModalContent";
import { TalkPresentationModalHeader } from "./components/talk-presentation-modal-header/TalkPresentationModalHeader";
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
  const startMs = useTalkPresentationModalStore((s) => s.startMs);
  const endMs = useTalkPresentationModalStore((s) => s.endMs);
  const finish = useTalkPresentationModalStore((s) => s.finish);

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
      <TalkPresentationModalHeader
        talk={talk}
        startMs={startMs}
        endMs={endMs}
        onFinished={finish}
        onClose={() => {
          modalRef.current?.dismiss();
        }}
      />
      <IonContent className="ion-padding">
        <TalkPresentationModalContent />
      </IonContent>
    </IonModal>
  );
};
