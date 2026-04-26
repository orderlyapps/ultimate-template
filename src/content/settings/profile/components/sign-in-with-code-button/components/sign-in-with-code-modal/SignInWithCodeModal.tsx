import {
  IonButtons,
  IonContent,
  IonHeader,
  IonInputOtp,
  IonModal,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { useState } from "react";
import { Space } from "@layout/space/Space";
import { Text } from "@ionic-display/text/Text";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { supabase } from "@supabase-db/client";
import { buildPublisherEmail } from "@format/buildPublisherEmail";
import { getUserPublisher } from "@feature/db/publisher/user-publisher/get-user-publisher/getUserPublisher";

interface SignInWithCodeModalProps {
  isOpen: boolean;
  onDismiss: () => void;
}

/**
 * Modal containing an `IonInputOtp` for the user to enter the 6-digit
 * code their admin shared. On completion, calls
 * `supabase.auth.verifyOtp` using `<publisher.id>@proclaimer.app`.
 */
export const SignInWithCodeModal: React.FC<SignInWithCodeModalProps> = ({
  isOpen,
  onDismiss,
}) => {
  const [presentAlert] = useIonAlert();
  const [busy, setBusy] = useState(false);

  const handleComplete = async (token: string) => {
    const publisher = getUserPublisher();
    if (!publisher?.id) {
      presentAlert({
        header: "Sign in failed",
        message: "Select your publisher first.",
        buttons: ["OK"],
      });
      return;
    }
    setBusy(true);
    const email = buildPublisherEmail(publisher.id);
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });
    setBusy(false);
    if (error) {
      presentAlert({
        header: "Invalid code",
        message: error.message,
        buttons: ["OK"],
      });
      return;
    }
    onDismiss();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign in with code</IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={onDismiss} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-text-center">
        <Space height="2" />
        <Text>Enter the 6-digit code from your admin.</Text>
        <Space height="2" />
        <IonInputOtp
          length={6}
          disabled={busy}
          onIonComplete={(e) => handleComplete(String(e.detail.value))}
        />
      </IonContent>
    </IonModal>
  );
};
