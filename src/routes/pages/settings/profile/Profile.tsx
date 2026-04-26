import { SelectUserPublisherModal } from "@feature/db/publisher/user-publisher/select-user-publisher-modal/SelectUserPublisherModal";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { useUserCongregation } from "@feature/db/congregation/user-congregation/use-user-congregation/useUserCongregation";
import { useUserPublisher } from "@feature/db/publisher/user-publisher/use-user-publisher/useUserPublisher";
import { Space } from "@layout/space/Space";
import { List } from "@ionic-layout/list/List";
import { EmailSignInForm } from "@services/app/auth/email-sign-in/EmailSignInForm";
import { useAuth } from "@services/app/auth/useAuth";
import { NavItem } from "@navigation/nav-item/NavItem";
import { SignInWithCodeButton } from "@/content/settings/profile/components/sign-in-with-code-button/SignInWithCodeButton";
import { GenerateOwnOtpButton } from "@/content/settings/profile/components/generate-own-otp-button/GenerateOwnOtpButton";

export const Profile: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [presentAlert] = useIonAlert();
  const [userCongregation, setUserCongregation] = useUserCongregation();
  const [userPublisher] = useUserPublisher();

  const handleResetApp = () => {
    presentAlert({
      header: "Enter the Zoom password to reset app",
      inputs: [
        {
          name: "password",
          type: "password",
          placeholder: "Password",
        },
      ],
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Reset",
          handler: (data) => {
            if (data.password === "kingdom") {
              setUserCongregation({
                id: "7b15d4e5-d4fa-4eb4-a276-3790b7c4897b",
                name: "Maitland",
                congregation_id: null,
              });
              setTimeout(() => {
                presentAlert({
                  header: "App Reset",
                  message:
                    "Please close and restart the app for changes to take effect.",
                  buttons: ["OK"],
                });
              }, 300);
            } else {
              setTimeout(() => {
                presentAlert({
                  header: "Incorrect Password",
                  message: "The password you entered is incorrect.",
                  buttons: ["OK"],
                });
              }, 300);
            }
          },
        },
      ],
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/settings" text="Settings" />
          </IonButtons>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Space height="2" />
        <List inset>
          <EmailSignInForm />
          <Space height="2" />
          {userCongregation?.id !== "7b15d4e5-d4fa-4eb4-a276-3790b7c4897b" && (
            <IonButton expand="block" color="danger" onClick={handleResetApp}>
              Reset App
            </IonButton>
          )}
          {userCongregation?.id === "7b15d4e5-d4fa-4eb4-a276-3790b7c4897b" && (
            <>
              <SelectUserPublisherModal />
              <Space />
              {!isAuthenticated && userPublisher && userPublisher.auth_id && (
                <SignInWithCodeButton />
              )}
              {isAuthenticated && (
                <>
                  <GenerateOwnOtpButton />
                  <Space />
                  <NavItem routerLink="/settings/profile/admin">Admin</NavItem>
                </>
              )}
            </>
          )}

          <Space />
        </List>
      </IonContent>
    </IonPage>
  );
};
