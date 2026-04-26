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

    /** Reuse any OTP (used or not) created within the last 60 s to avoid the Supabase rate limit. */
    const sixtySecondsAgo = new Date(Date.now() - 60_000).toISOString();
    const { data: existing } = await supabase
      .from("auth_otp_log")
      .select("*")
      .eq("email", email)
      .gte("created_at", sixtySecondsAgo)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (existing) {
      return existing.otp;
    }

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
