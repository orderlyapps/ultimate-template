import {
  IonButton,
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
import { formatPublisherName } from "@format/formatPublisherName";
import { getUserPublisher } from "@feature/db/publisher/user-publisher/get-user-publisher/getUserPublisher";
import { usePublisherPhoneLookup } from "@/content/settings/profile/admin/components/auth-user-list/components/use-publisher-phone/usePublisherPhone";
import { Item } from "@ionic-layout/item/Item";

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
  const phoneFor = usePublisherPhoneLookup();

  const handleRequestCode = () => {
    const publisher = getUserPublisher();
    if (!publisher?.id) return;

    const adminPhone = phoneFor(publisher.id);
    const publisherName = formatPublisherName(publisher, "display last");
    const message = encodeURIComponent(
      `You have received a sign-in code request from ${publisherName.toUpperCase()}.`,
    );

    if (adminPhone) {
      window.open(`sms:${adminPhone}?body=${message}`, "_blank");
    } else {
      window.open(`sms:?body=${message}`, "_blank");
    }
  };

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
        <Space height="3" />
        <Item className="ion-text-center" lines="none">
          <Text color="medium" style={{ fontSize: "0.9rem" }}>
            You can get a code from your admin or you can generate a code on another signed in device.
          </Text>
        </Item>
        <Space height="2" />
        <IonButton fill="outline" onClick={handleRequestCode}>
          Request code from admin
        </IonButton>
      </IonContent>
    </IonModal>
  );
};
