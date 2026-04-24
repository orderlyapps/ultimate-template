import { useState } from "react";
import { IonText } from "@ionic/react";
import { Button } from "@ionic-input/button/Button";
import { useAuth } from "@services/app/auth/useAuth";

/**
 * Shows the currently signed-in user and provides a sign-out action.
 */
export const SignedInPanel: React.FC = () => {
  const { signOut } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sign out failed");
    }
  };

  return (
    <>
      <Button color="medium" onClick={handleSignOut}>
        Sign out
      </Button>
      {error && (
        <IonText color="danger">
          <p className="ion-padding-horizontal">{error}</p>
        </IonText>
      )}
    </>
  );
};
