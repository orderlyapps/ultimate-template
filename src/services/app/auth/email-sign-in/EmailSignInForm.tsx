import { useUserPublisher } from "@feature/db/publisher/user-publisher/use-user-publisher/useUserPublisher";
import { useAuth } from "../useAuth";
import { SignedInPanel } from "@services/app/auth/email-sign-in/components/signed-in-panel/SignedInPanel";
import { SignInForm } from "@services/app/auth/email-sign-in/components/sign-in-form/SignInForm";
import { useFeatureAccess } from "@services/app/auth/temp-feature-access/useFeatureAccess";

// Domain used to construct the supabase auth email from a publisher uuid.
const EMAIL_DOMAIN = "proclaimer.app";

/**
 * Supabase email/password sign-in form.
 *
 * The email field is prefilled (and locked) using the current user's
 * publisher uuid in the form `<publisher.id>@proclaimer.app`.
 */
export const EmailSignInForm: React.FC = () => {
  const { isUnlocked, isUserAllowed } = useFeatureAccess(["damian"]);
  const [publisher] = useUserPublisher();
  const { isAuthenticated, isLoading } = useAuth();

  // Supabase persists the session in localStorage by default, so an existing
  // session is rehydrated on reload via useAuth's getSession/onAuthStateChange.
  if (isLoading || !isUnlocked || !isUserAllowed) return null;

  if (isAuthenticated) return <SignedInPanel />;

  const email = publisher?.id ? `${publisher.id}@${EMAIL_DOMAIN}` : "";
  return <SignInForm email={email} />;
};
