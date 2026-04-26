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
import { useState } from "react";
import { useParams } from "react-router-dom";
import editIcon from "@icons/edit.svg";
import { EditPublisherModal } from "@feature/db/publisher/all-publishers-list/components/edit-publisher-modal/EditPublisherModal";
import { PublisherDetailContent } from "@/content/publishers/lists/publisher-detail/PublisherDetailContent";
import { useIsSuperAdmin } from "@/content/settings/profile/admin/components/use-is-super-admin/useIsSuperAdmin";

export const PublisherDetail: React.FC = () => {
  const { publisherId } = useParams<{ publisherId: string }>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const isSuperAdmin = useIsSuperAdmin();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/publishers/all" text="All" />
          </IonButtons>
          {isSuperAdmin && (
            <IonButtons slot="end">
              <IonButton onClick={() => setIsEditModalOpen(true)}>
                <IonIcon src={editIcon} slot="icon-only" />
              </IonButton>
            </IonButtons>
          )}
          <IonTitle>Publisher</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        {isSuperAdmin && (
          <EditPublisherModal
            publisherId={publisherId}
            isOpen={isEditModalOpen}
            onDismiss={() => setIsEditModalOpen(false)}
          />
        )}
        <PublisherDetailContent />
      </IonContent>
    </IonPage>
  );
};
