import { WeekendAssignmentEditContent } from "@/content/schedules/weekend-meeting/edit/assignment/WeekendAssignmentEditContent";
import { SortFilterModal } from "@/content/schedules/weekend-meeting/edit/assignment/components/sort-filter-modal/SortFilterModal";
import { usePublisherSortFilterStore } from "@/content/schedules/weekend-meeting/edit/assignment/store/usePublisherSortFilterStore";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router-dom";
import settingsIcon from "@icons/settings.svg";
import { assignmentLabels } from "@feature/db/weekend-meeting/labels/assignmentLabels";
import type { WeekendAssignmentID } from "@tanstack-db/weekend_assignment/weekendAssignmentSchema";

export const WeekendAssignmentEdit: React.FC = () => {
  const { week_id, assignment_id } = useParams<{
    week_id: string;
    assignment_id: WeekendAssignmentID;
  }>();
  const openModal = usePublisherSortFilterStore((s) => s.openModal);

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
          <IonTitle>{assignmentLabels[assignment_id]}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={openModal}>
              <IonIcon src={settingsIcon} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <WeekendAssignmentEditContent />
      </IonContent>
      <SortFilterModal />
    </IonPage>
  );
};
