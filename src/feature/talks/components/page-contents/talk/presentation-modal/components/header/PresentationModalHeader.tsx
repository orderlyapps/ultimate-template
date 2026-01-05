import { IonButtons, IonHeader, IonToolbar } from "@ionic/react";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { ProgressBar } from "./components/progress-bar/ProgressBar";
import { TimeText } from "./components/time-text/TimeText";
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

        <TimeText />

        <TextSizeControl />
      </IonToolbar>

      <ProgressBar />

    </IonHeader>
  );
}
