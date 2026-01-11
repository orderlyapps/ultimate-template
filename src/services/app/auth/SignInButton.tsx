import { IonIcon } from "@ionic/react";
import { logoGoogle } from "ionicons/icons";
import { useAuth } from "./useAuth";
import { Button } from "@ionic-input/button/Button";

interface SignInButtonProps {
  size?: "small" | "default" | "large";
}

export const SignInButton: React.FC<SignInButtonProps> = ({
  size = "default",
}) => {
  const { signInWithGoogle } = useAuth();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Failed to sign in:", error);
    }
  };

  return (
    <Button onClick={handleSignIn} size={size} fill="clear">
      <IonIcon slot="start" icon={logoGoogle} />
      Sign in with Google
    </Button>
  );
};
