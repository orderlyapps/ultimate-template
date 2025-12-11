import { IonIcon } from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import { useAuth } from "./useAuth";
import { Button } from "@ionic-input/button/Button";

interface SignOutButtonProps {
  size?: "small" | "default" | "large";
  color?: string;
}

export const SignOutButton: React.FC<SignOutButtonProps> = ({
  size = "default",
  color = "danger",
}) => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <Button onClick={handleSignOut} size={size} color={color}>
      <IonIcon slot="start" icon={logOutOutline} />
      Sign Out
    </Button>
  );
};
