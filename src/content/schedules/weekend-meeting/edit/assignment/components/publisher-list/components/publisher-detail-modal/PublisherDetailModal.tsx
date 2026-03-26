import {
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { formatPublisherName } from "@format/formatPublisherName";
import type { Publisher } from "@tanstack-db/publisher/publisherSchema";
import { PublisherDetailContent } from "./components/publisher-detail-content/PublisherDetailContent";
import { UpdateAssignmentButton } from "./components/update-assignment-button/UpdateAssignmentButton";
import { useParams } from "react-router-dom";
import type { WeekendAssignmentID } from "@tanstack-db/weekend_assignment/weekendAssignmentSchema";
import { Space } from "@layout/space/Space";

type Props = {
  publisher: Publisher | null;
  isOpen: boolean;
  onDismiss: () => void;
};

export const PublisherDetailModal: React.FC<Props> = ({
  publisher,
  isOpen,
  onDismiss,
}) => {
  const { week_id, assignment_id } = useParams<{
    week_id: string;
    assignment_id: WeekendAssignmentID;
  }>();

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {publisher ? formatPublisherName(publisher) : "Publisher Details"}
          </IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={onDismiss} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {publisher && <PublisherDetailContent publisher={publisher} />}

        {publisher && week_id && assignment_id && (
          <>
            <Space />
            <UpdateAssignmentButton
              weekId={week_id}
              assignmentId={assignment_id}
              publisherId={publisher.id}
              onSuccess={onDismiss}
            />
          </>
        )}
        <Space />
      </IonContent>
    </IonModal>
  );
};
