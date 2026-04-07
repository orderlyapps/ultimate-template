import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router-dom";
import { OutgoingSpeakerContent } from "@/content/schedules/weekend-meeting/edit/outgoing-speaker/OutgoingSpeakerContent";

/**
 * Route page for viewing outgoing speaker details.
 */
export const OutgoingSpeaker: React.FC = () => {
  const { week_id, speaker_id } = useParams<{
    week_id: string;
    speaker_id: string;
  }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref={`/schedules/weekend-meeting/${week_id}/edit`}
              text="Back"
            />
          </IonButtons>
          <IonTitle>Outgoing Speaker</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <OutgoingSpeakerContent weekId={week_id} speakerId={speaker_id} />
      </IonContent>
    </IonPage>
  );
};
