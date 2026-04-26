import { useIonAlert } from "@ionic/react";
import { supabase } from "@supabase-db/client";
import { buildPublisherEmail } from "@format/buildPublisherEmail";
import { useAuth } from "@services/app/auth/useAuth";
import { useFetchLatestOtp } from "../use-fetch-latest-otp/useFetchLatestOtp";

interface GenerateOptions {
  publisherId: string;
  /** When true the row is stamped with `sent_by_admin_*` columns. */
  asAdmin?: boolean;
}

/**
 * Triggers `supabase.auth.signInWithOtp` for a publisher's synthetic
 * email and waits for the send_email auth hook to log the resulting OTP
 * into `auth_otp_log`. Returns the OTP for display.
 */
export const useGeneratePublisherOtp = () => {
  const [presentAlert] = useIonAlert();
  const { user } = useAuth();
  const { fetchLatestOtp } = useFetchLatestOtp();

  const generate = async ({
    publisherId,
    asAdmin,
  }: GenerateOptions): Promise<string | null> => {
    const email = buildPublisherEmail(publisherId);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false },
    });
    if (error) {
      presentAlert({
        header: "Error",
        message: error.message,
        buttons: ["OK"],
      });
      return null;
    }

    try {
      return await fetchLatestOtp(email, {
        stampAsAdmin: asAdmin,
        adminUserId: user?.id,
      });
    } catch (e) {
      presentAlert({
        header: "Error",
        message: (e as Error).message,
        buttons: ["OK"],
      });
      return null;
    }
  };

  return { generate };
};
