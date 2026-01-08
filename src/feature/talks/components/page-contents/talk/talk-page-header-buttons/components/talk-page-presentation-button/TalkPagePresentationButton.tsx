import { IonButton, IonIcon } from "@ionic/react";
import play from "@icons/play.svg";
import { useState } from "react";
import { PresentationModal } from "@feature/talks/components/page-contents/talk/presentation-modal/PresentationModal";

export const TalkPagePresentationButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IonButton onClick={() => setIsOpen(true)}>
        <IonIcon src={play} slot="icon-only" />
      </IonButton>
      <PresentationModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
