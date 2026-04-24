import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { AdminContent } from "@/content/settings/profile/admin/AdminContent";

/**
 * Admin child page of Profile.
 *
 * Only reachable by signed-in users (the nav entry in Profile is gated on
 * authentication). The route itself is not guarded — add auth protection here
 * later if direct URL access needs to be prevented.
 */
export const Admin: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/settings/profile" text="Profile" />
          </IonButtons>
          <IonTitle>Admin</IonTitle>
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
    </IonPage>
  );
};
