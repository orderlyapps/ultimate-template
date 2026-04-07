import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage, IonToolbar
} from "@ionic/react";
import { useParams } from "react-router-dom";
import { OutgoingSpeakerContent } from "@/content/schedules/weekend-meeting/edit/outgoing-speaker/OutgoingSpeakerContent";
import { useEffect } from "react";
import { useOutgoingSpeakerStore } from "@/content/schedules/weekend-meeting/edit/outgoing-speaker/store/useOutgoingSpeakerStore";

/**
 * Route page for viewing or adding outgoing speaker details.
 */
export const OutgoingSpeaker: React.FC = () => {
  const { week_id, speaker_id } = useParams<{
    week_id: string;
    speaker_id: string;
  }>();
  const clear = useOutgoingSpeakerStore((state) => state.clear);

  // Clear store when entering add mode
  useEffect(() => {
    if (speaker_id === "new") {
      clear();
    }
  }, [speaker_id, clear]);

  const isAddMode = speaker_id === "new";

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
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <OutgoingSpeakerContent weekId={week_id} speakerId={isAddMode ? null : speaker_id} isAddMode={isAddMode} />
      </IonContent>
    </IonPage>
  );
};
