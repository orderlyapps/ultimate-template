import z from "zod";

/**
 * Mirror of `public.auth_otp_log`. Populated by the Supabase send_email
 * auth hook so the OTP issued by `supabase.auth.signInWithOtp` is captured
 * in our own table instead of being delivered via email.
 */
export const authOtpLogSchema = z.object({
  id: z.uuid(),
  user_id: z.uuid(),
  email: z.string(),
  otp: z.string(),
  created_at: z.string(),
  used_at: z.string().nullable().optional(),
  sent_by_admin_at: z.string().nullable().optional(),
  sent_by_admin_id: z.uuid().nullable().optional(),
});

export type AuthOtpLog = z.infer<typeof authOtpLogSchema>;
