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
import { Searchbar } from "@ionic-input/searchbar/Searchbar";
import { useWeekendMeetingEditStore } from "@/content/schedules/weekend-meeting/edit/store/useWeekendMeetingEditStore";
import { EditSpeakerContent } from "@/content/schedules/weekend-meeting/edit/edit-speaker/EditSpeakerContent";

/**
 * Route page for selecting/editing a speaker assignment.
 * Includes a search bar in the header and delegates list content to EditSpeakerContent.
 */
export const EditSpeaker: React.FC = () => {
  const { week_id } = useParams<{ week_id: string }>();
  const searchQuery = useWeekendMeetingEditStore((s) => s.searchQuery);
  const setSearchQuery = useWeekendMeetingEditStore((s) => s.setSearchQuery);

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
          <IonTitle>Select Public Talk</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <Searchbar
            value={searchQuery}
            onIonInput={(e) => setSearchQuery(e.detail.value ?? "")}
            placeholder="Search speakers..."
            debounce={300}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <EditSpeakerContent />
      </IonContent>
    </IonPage>
  );
};
