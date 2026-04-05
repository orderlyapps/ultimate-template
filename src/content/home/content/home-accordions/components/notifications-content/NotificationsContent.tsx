import { IonItem, IonLabel } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { NotificationRow } from "@/content/home/content/home-accordions/components/notifications-content/components/notification-row/NotificationRow";
import type { NotificationItem } from "@/content/home/content/home-accordions/components/notifications-content/hooks/useNewAssignments";

type Props = {
  newItems: NotificationItem[];
  dismiss: (key: string) => void;
  dismissAll: () => void;
};

export function NotificationsContent({ newItems, dismiss, dismissAll }: Props) {
  const s = newItems.length > 1 ? "s" : "";

  return (
    <>
      {newItems.map((item) => (
        <NotificationRow key={item.key} item={item} onDismiss={dismiss} />
      ))}
      <IonItem lines="inset">
        <IonLabel className="ion-text-right">
          <Text onClick={dismissAll} size="sm" color="primary">
            Clear {s && "All"}
          </Text>
        </IonLabel>
      </IonItem>
    </>
  );
}
