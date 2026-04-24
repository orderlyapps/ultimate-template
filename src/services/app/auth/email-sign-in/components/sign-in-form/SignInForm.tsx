import { useIonAlert } from "@ionic/react";
import { Button } from "@ionic-input/button/Button";
import { supabase } from "@supabase-db/client";

interface SignInFormProps {
  /** Prefilled email (constructed from publisher uuid). Empty if unavailable. */
  email: string;
}

/**
 * Sign in button that opens an Ionic alert with a password input and calls
 * supabase.auth.signInWithPassword on submit. Session persistence is handled
 * by the supabase client (localStorage).
 */
export const SignInForm: React.FC<SignInFormProps> = ({ email }) => {
  const [presentAlert] = useIonAlert();

  const presentError = (message: string) => {
    presentAlert({
      header: "Sign in failed",
      message,
      buttons: ["OK"],
    });
  };

  const handleClick = () => {
    if (!email) {
      presentError("No user publisher found. Please select a publisher first.");
      return;
    }
    presentAlert({
      header: "Sign in",
      inputs: [
        {
          name: "password",
          type: "password",
          placeholder: "Password",
        },
      ],
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Sign in",
          handler: async (data) => {
            const { error } = await supabase.auth.signInWithPassword({
              email,
              password: data.password ?? "",
            });
            if (error) setTimeout(() => presentError(error.message), 300);
          },
        },
      ],
    });
  };

  return (
    <Button onClick={handleClick} disabled={!email}>
      Sign in
    </Button>
  );
};
