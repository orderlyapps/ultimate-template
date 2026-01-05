import { IonButton, IonIcon } from "@ionic/react";
import play from "@icons/play.svg";
import { useState } from "react";
import { PresentationModal } from "@feature/talks/components/page-contents/talk/presentation-modal/PresentationModal";

export const TalkPagePresentationButton: React.FC = () => {
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);

  return (
    <>
      <IonButton onClick={() => setIsPresentationOpen(true)}>
        <IonIcon src={play} slot="icon-only" />
      </IonButton>
      <PresentationModal
        isOpen={isPresentationOpen}
        onDismiss={() => setIsPresentationOpen(false)}
      />
    </>
  );
};
