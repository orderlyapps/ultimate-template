import { useState } from "react";
import { supabase } from "@supabase-db/client";

/**
 * Invokes the `generate-publisher-otp` Edge Function and opens the native
 * SMS app with the OTP token pre-filled in the message body.
 *
 * @param publisherId - The publisher's `id` (used to derive their auth email)
 * @param phoneNumber - Optional phone number to pre-fill the SMS recipient
 */
export const useGenerateOtp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateAndSendOtp = async (
    publisherId: string,
    phoneNumber?: string,
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);

    const publisherAuthEmail = `${publisherId}@proclaimer.app`;

    const { data, error: fnError } = await supabase.functions.invoke(
      "super-service",
      {
        body: {
          action: "generate-publisher-otp",
          payload: { publisher_auth_email: publisherAuthEmail },
        },
      },
    );

    setIsLoading(false);

    if (fnError) {
      // FunctionsHttpError carries the response body — extract it for a useful message
      let detail = fnError.message;
      try {
        const body = await (fnError as unknown as { context: Response }).context.json();
        console.error("Edge function error body:", body);
        detail = body?.error ?? body?.message ?? fnError.message;
      } catch {
        console.error("Edge function error:", fnError);
      }
      setError(detail);
      throw new Error(detail);
    }

    console.log("Edge function response:", data);

    const responseError = (data as { error?: string })?.error;
    if (responseError) {
      setError(responseError);
      throw new Error(responseError);
    }

    const otp = (data as { token?: string })?.token ?? "";

    // Publisher signs in via verifyOtp with type: 'signup' using this token.
    // Build sms: URI — recipient pre-filled if phone number is available
    const recipient = phoneNumber ? encodeURIComponent(phoneNumber) : "";
    const body = encodeURIComponent(
      `Your Proclaimer sign-in code is: ${otp}`,
    );

    // iOS uses sms:<number>?&body=<text>, Android uses sms:<number>?body=<text>
    const smsUri = `sms:${recipient}?&body=${body}`;
    window.open(smsUri, "_blank");
  };

  return { generateAndSendOtp, isLoading, error };
};
