import { IonLabel, IonAvatar } from "@ionic/react";
import { useAuth } from "./useAuth";
import { Item } from "@ionic-layout/item/Item";

export const UserProfile: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return null;
  }

  const avatarUrl = user.user_metadata?.avatar_url;
  const fullName = user.user_metadata?.full_name;
  const email = user.email;

  return (
    <Item lines="none">
      {avatarUrl && (
        <IonAvatar slot="start">
          <img src={avatarUrl} alt={fullName || "User avatar"} />
        </IonAvatar>
      )}
      <IonLabel>
        {fullName && <h2>{fullName}</h2>}
        <p>{email}</p>
      </IonLabel>
    </Item>
  );
};
