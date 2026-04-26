import { useState } from "react";
import { useIonAlert } from "@ionic/react";
import { Button } from "@ionic-input/button/Button";
import { useAuth } from "@services/app/auth/useAuth";
import { useGeneratePublisherOtp } from "@/content/settings/profile/admin/components/auth-user-list/components/use-generate-publisher-otp/useGeneratePublisherOtp";
import { OtpDisplayModal } from "@/content/settings/profile/admin/components/auth-user-list/components/otp-display-modal/OtpDisplayModal";
import { getUserPublisher } from "@feature/db/publisher/user-publisher/get-user-publisher/getUserPublisher";

/**
 * Profile-page button that lets an authenticated user mint a fresh OTP
 * for themself. Useful for cross-device login: type the displayed code
 * into the Sign-in-with-code modal on a second device.
 */
export const GenerateOwnOtpButton: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { generate } = useGeneratePublisherOtp();
  const [presentAlert] = useIonAlert();
  const [otp, setOtp] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  if (!isAuthenticated) return null;

  const handleClick = async () => {
    const publisher = getUserPublisher();
    if (!publisher?.id) {
      presentAlert({
        header: "Cannot generate code",
        message: "Select your publisher first.",
        buttons: ["OK"],
      });
      return;
    }
    const code = await generate({ publisherId: publisher.id });
    if (!code) return;
    setOtp(code);
    setModalOpen(true);
  };

  return (
    <>
      <Button fill="outline" onClick={handleClick}>
        Get sign-in code for another device
      </Button>
      <OtpDisplayModal
        isOpen={modalOpen}
        otp={otp}
        onDismiss={() => setModalOpen(false)}
      />
    </>
  );
};
