import {
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Button } from "@ionic-input/button/Button";
import { Text } from "@ionic-display/text/Text";
import { Space } from "@layout/space/Space";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { OtpCountdown } from "./components/otp-countdown/OtpCountdown";

interface OtpDisplayModalProps {
  isOpen: boolean;
  otp: string | null;
  /** Optional phone number for the SMS button. Falsy hides the button. */
  smsPhone?: string | null;
  onDismiss: () => void;
}

/**
 * Modal that shows a freshly generated OTP and auto-dismisses after 60s.
 * The countdown lives in `OtpCountdown` so it remounts (via `key={otp}`)
 * each time a new code is shown, avoiding setState-in-effect issues.
 */
export const OtpDisplayModal: React.FC<OtpDisplayModalProps> = ({
  isOpen,
  otp,
  smsPhone,
  onDismiss,
}) => {
  const handleSendSms = () => {
    if (!smsPhone || !otp) return;
    const body = encodeURIComponent(`Your sign-in code is: ${otp}`);
    window.location.href = `sms:${smsPhone}?&body=${body}`;
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>One-Time Code</IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={onDismiss} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-text-center">
        <Space height="2" />
        <Text size="xl" bold>
          {otp ?? "—"}
        </Text>
        <Space />
        {isOpen && otp && (
          <OtpCountdown
            key={otp}
            durationSeconds={60}
            onExpire={onDismiss}
          />
        )}
        <Space height="2" />
        {smsPhone && otp && (
          <Button onClick={handleSendSms}>Send via SMS</Button>
        )}
        <Button fill="clear" onClick={onDismiss}>
          Close
        </Button>
      </IonContent>
    </IonModal>
  );
};
