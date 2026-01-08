import { IonButtons, IonHeader, IonToolbar } from "@ionic/react";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { PresentationProgressBar } from "./components/presentation-progress-bar/PresentationProgressBar";
import { PresentationTiming } from "./components/presentation-timing/PresentationTiming";
import { TextSizeControl } from "./components/text-size-control/TextSizeControl";

type Props = {
  onClose: () => void;
};

export function PresentationModalHeader({ onClose }: Props) {
  // prettier-ignore
  return (
    <IonHeader>
      
      <IonToolbar>
        <IonButtons slot="start">
          <CloseButton onClick={onClose} />
        </IonButtons>

        <PresentationTiming />

        <TextSizeControl />
      </IonToolbar>

      <PresentationProgressBar />

    </IonHeader>
  );
}
