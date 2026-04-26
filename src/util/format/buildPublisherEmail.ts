/**
 * Constructs the synthetic Supabase auth email for a publisher.
 *
 * Format: `<publisher.id>@proclaimer.app`. Kept in sync with
 * EmailSignInForm and the auth-otp workflows.
 */
export const buildPublisherEmail = (publisherId: string): string =>
  `${publisherId}@proclaimer.app`;
