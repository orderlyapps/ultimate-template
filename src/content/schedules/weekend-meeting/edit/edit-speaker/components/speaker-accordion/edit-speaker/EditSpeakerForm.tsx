import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { useEditSpeakerData } from "./useEditSpeaker";
import { EditSpeakerFormInner } from "./components/edit-speaker-form-inner/EditSpeakerFormInner";

type EditSpeakerModalProps = {
  speakerId: string | null;
  isOpen: boolean;
  onClose: () => void;
};

export const EditSpeakerModal: React.FC<EditSpeakerModalProps> = ({
  speakerId,
  isOpen,
  onClose,
}) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onClose}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Edit Speaker</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {speakerId && (
          <EditSpeakerModalContent speakerId={speakerId} onClose={onClose} />
        )}
      </IonContent>
    </IonModal>
  );
};

type EditSpeakerModalContentProps = {
  speakerId: string;
  onClose: () => void;
};

const EditSpeakerModalContent: React.FC<EditSpeakerModalContentProps> = ({
  speakerId,
  onClose,
}) => {
  const { publisher, congregationName, congregations, isLocal, currentOutlineIds } =
    useEditSpeakerData(speakerId);

  if (!publisher) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <Text color="medium">Speaker not found</Text>
      </div>
    );
  }

  return (
    <EditSpeakerFormInner
      speakerId={speakerId}
      initialFirstName={publisher.first_name}
      initialLastName={publisher.last_name}
      initialCongregationId={publisher.congregation_id}
      initialOutlineIds={currentOutlineIds}
      congregationName={congregationName}
      congregations={congregations}
      isLocal={isLocal}
      onClose={onClose}
    />
  );
};
