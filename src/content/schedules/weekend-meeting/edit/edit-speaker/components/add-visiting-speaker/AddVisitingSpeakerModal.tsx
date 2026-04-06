import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useAddVisitingSpeakerData } from "./useAddVisitingSpeakerData";
import { AddVisitingSpeakerFormInner } from "./components/add-visiting-speaker-form-inner/AddVisitingSpeakerFormInner";

type AddVisitingSpeakerModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddVisitingSpeakerModal: React.FC<
  AddVisitingSpeakerModalProps
> = ({ isOpen, onClose }) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onClose}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Add Visiting Speaker</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <AddVisitingSpeakerContent onClose={onClose} />
      </IonContent>
    </IonModal>
  );
};

type AddVisitingSpeakerContentProps = {
  onClose: () => void;
};

const AddVisitingSpeakerContent: React.FC<AddVisitingSpeakerContentProps> = ({
  onClose,
}) => {
  const { congregations } = useAddVisitingSpeakerData();

  return (
    <AddVisitingSpeakerFormInner
      congregations={congregations}
      onClose={onClose}
    />
  );
};
