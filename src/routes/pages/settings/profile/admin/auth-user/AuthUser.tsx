import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { AuthUserContent } from "@/content/settings/profile/admin/auth-user/AuthUserContent";

/**
 * Auth User detail page showing publisher information and
 * providing the Generate OTP functionality.
 *
 * Route: /settings/profile/admin/auth-user/:publisherId
 */
export const AuthUser: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/settings/profile/admin" text="Admin" />
          </IonButtons>
          <IonTitle>Auth User</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Auth User</IonTitle>
          </IonToolbar>
        </IonHeader>
        <AuthUserContent />
      </IonContent>
    </IonPage>
  );
};
