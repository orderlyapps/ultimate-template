import {
  IonPage,
  IonContent,
  IonButton,
  IonSpinner,
  IonIcon,
} from "@ionic/react";
import { useAuth } from "@feature/auth/useAuth";
import { logoGoogle } from "ionicons/icons";

export const Login: React.FC = () => {
  const { signInWithGoogle, isLoading } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Failed to sign in:", error);
    }
  };

  if (isLoading) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <IonSpinner name="crescent" />
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            gap: "24px",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "2rem", fontWeight: 600 }}>
            Welcome
          </h1>
          <p style={{ margin: 0, color: "var(--ion-color-medium)" }}>
            Sign in to continue
          </p>
          <IonButton onClick={handleGoogleSignIn} size="large">
            <IonIcon slot="start" icon={logoGoogle} />
            Sign in with Google
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};
