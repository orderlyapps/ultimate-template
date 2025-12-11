import { IonItem, IonLabel, IonAvatar } from "@ionic/react";
import { useAuth } from "./useAuth";

export const UserProfile: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <IonItem>
        <IonLabel>
          <h2>Account</h2>
          <p>Not signed in</p>
        </IonLabel>
      </IonItem>
    );
  }

  const avatarUrl = user.user_metadata?.avatar_url;
  const fullName = user.user_metadata?.full_name;
  const email = user.email;

  return (
    <IonItem>
      {avatarUrl && (
        <IonAvatar slot="start">
          <img src={avatarUrl} alt={fullName || "User avatar"} />
        </IonAvatar>
      )}
      <IonLabel>
        {fullName && <h2>{fullName}</h2>}
        <p>{email}</p>
      </IonLabel>
    </IonItem>
  );
};
