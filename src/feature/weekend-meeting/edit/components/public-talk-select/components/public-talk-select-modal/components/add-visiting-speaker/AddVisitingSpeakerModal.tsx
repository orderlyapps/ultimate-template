import { CloseButton } from "@input/button/close-button/CloseButton";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useAddVisitingSpeakerStore } from "./store/useAddVisitingSpeakerStore";
import { CongregationStep } from "./components/congregation-step/CongregationStep";
import { DetailsStep } from "./components/details-step/DetailsStep";
import { OutlinesStep } from "./components/outlines-step/OutlinesStep";

const stepTitles = {
  congregation: "Select Congregation",
  details: "Speaker Details",
  outlines: "Select Outlines",
} as const;

export const AddVisitingSpeakerModal: React.FC = () => {
  const isOpen = useAddVisitingSpeakerStore((s) => s.isOpen);
  const step = useAddVisitingSpeakerStore((s) => s.step);
  const close = useAddVisitingSpeakerStore((s) => s.close);

  return (
    <IonModal isOpen={isOpen} onDidDismiss={close}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{stepTitles[step]}</IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={close} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {step === "congregation" && <CongregationStep />}
        {step === "details" && <DetailsStep />}
        {step === "outlines" && <OutlinesStep />}
      </IonContent>
    </IonModal>
  );
};
