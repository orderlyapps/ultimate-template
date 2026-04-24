import { useIonAlert, useIonToast } from "@ionic/react";
import { Button } from "@ionic-input/button/Button";
import { formatPublisherName } from "@format/formatPublisherName";
import type { Publisher } from "@tanstack-db/publisher/publisherSchema";
import { useCreateAuthUser } from "@/content/settings/profile/admin/components/create-auth-user/useCreateAuthUser";
import { useGenerateOtp } from "@/content/settings/profile/admin/components/generate-otp/useGenerateOtp";
import { usePublisherPhone } from "@/content/settings/profile/admin/components/publisher-list/usePublisherPhone";

type Props = {
  publisher: Publisher;
};

/** Create Account or Send OTP button for a single publisher row. */
export const PublisherItemAction: React.FC<Props> = ({ publisher }) => {
  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();
  const { createAuthUser, isLoading: isCreating } = useCreateAuthUser();
  const { generateAndSendOtp, isLoading: isGenerating } = useGenerateOtp();
  const { phoneNumber } = usePublisherPhone(publisher.id);

  const hasAccount = !!publisher.auth_id;

  const handleCreateAccount = () => {
    presentAlert({
      header: "Create Account",
      message: `Create a passwordless account for ${formatPublisherName(publisher)}?`,
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Create",
          handler: async () => {
            try {
              await createAuthUser(publisher.id);
              presentToast({ message: "Account created.", duration: 2000, color: "success" });
            } catch {
              presentToast({ message: "Failed to create account.", duration: 3000, color: "danger" });
            }
          },
        },
      ],
    });
  };

  const handleSendOtp = async () => {
    try {
      await generateAndSendOtp(publisher.id, phoneNumber);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to generate OTP.";
      presentToast({ message, duration: 5000, color: "danger" });
    }
  };

  if (hasAccount) {
    return (
      <Button slot="end" size="small" disabled={isGenerating} onClick={handleSendOtp}>
        Send OTP
      </Button>
    );
  }

  return (
    <Button slot="end" size="small" disabled={isCreating} onClick={handleCreateAccount}>
      Create Account
    </Button>
  );
};
