import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { AddButton } from "@input/button/add-button/AddButton";
import { AdminContent } from "@/content/settings/profile/admin/AdminContent";
import { PublisherSelectModal } from "@/content/settings/profile/admin/components/publisher-select-modal/PublisherSelectModal";
import { useState } from "react";

/**
 * Admin child page of Profile.
 *
 * Only reachable by signed-in users (the nav entry in Profile is gated on
 * authentication). The route itself is not guarded — add auth protection here
 * later if direct URL access needs to be prevented.
 */
export const Admin: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/settings/profile" text="Profile" />
          </IonButtons>
          <IonTitle>Admin</IonTitle>
          <IonButtons slot="end">
            <AddButton onClick={() => setIsModalOpen(true)} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Admin</IonTitle>
          </IonToolbar>
        </IonHeader>
        <AdminContent />
      </IonContent>
      <PublisherSelectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </IonPage>
  );
};
