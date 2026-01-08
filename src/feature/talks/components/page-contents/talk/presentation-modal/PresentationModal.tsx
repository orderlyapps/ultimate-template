import { IonContent, IonModal } from "@ionic/react";
import { useTalksStore } from "@feature/talks/state/useTalksStore";
import { PresentationModalFooter } from "./components/footer/PresentationModalFooter";
import { PresentationModalContent } from "./components/content/PresentationModalContent";
import { PresentationModalHeader } from "./components/header/PresentationModalHeader";
import { useParams } from "react-router-dom";
import { useTalkPresentationStore } from "@feature/talks/components/page-contents/talk/presentation-modal/hooks/use-talk-presentation-store/useTalkPresentationStore";
import { useTalkPresentation } from "./hooks/use-talk-presentation/useTalkPresentation";

interface TalkPresentationModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const PresentationModal: React.FC<TalkPresentationModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const { talkId } = useParams<{ talkId: string }>();
  const talk = useTalksStore((s) => s.talks.find((t) => t.id === talkId));

  const initialisePresentation = useTalkPresentationStore(
    (s) => s.initialisePresentation
  );
  const finishPresentation = useTalkPresentationStore(
    (s) => s.finishPresentation
  );

  useTalkPresentation();

  if (!talk) {
    return null;
  }

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={() => {
        finishPresentation();
        setIsOpen(false);
      }}
      onWillPresent={() => {
        initialisePresentation(talk);
      }}
      id="fullscreen"
    >
      <PresentationModalHeader
        onClose={() => {
          finishPresentation();
          setIsOpen(false);
        }}
      />

      <IonContent>
        <PresentationModalContent />
      </IonContent>

      <PresentationModalFooter />
    </IonModal>
  );
};
