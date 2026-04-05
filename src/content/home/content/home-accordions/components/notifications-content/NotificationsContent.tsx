import { IonLabel } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { Item } from "@ionic-layout/item/Item";
import { Space } from "@layout/space/Space";
import { useUserPublisher } from "@feature/db/publisher/user-publisher/use-user-publisher/useUserPublisher";
import { usePublisherHomeItems } from "@/content/home/content/home-accordions/components/notifications-content/hooks/usePublisherHomeItems";
import { useNewAssignments } from "@/content/home/content/home-accordions/components/notifications-content/hooks/useNewAssignments";
import { NotificationRow } from "@/content/home/content/home-accordions/components/notifications-content/components/notification-row/NotificationRow";

export function NotificationsContent() {
  const [publisher] = useUserPublisher();
  const items = usePublisherHomeItems(publisher);
  const { newItems, dismiss, dismissAll } = useNewAssignments(items);

  if (newItems.length === 0) return null;

  const s = newItems.length > 1 ? "s" : "";

  return (
    <>
      <Item lines="none">
        <IonLabel>
          <Text bold size="sm">
            Notification{s}
          </Text>
        </IonLabel>
        <Text onClick={dismissAll} size="sm" color="primary">
          Clear {s && "All"}
        </Text>
      </Item>
      <Space height="1" />
      {newItems.map((item) => (
        <NotificationRow key={item.key} item={item} onDismiss={dismiss} />
      ))}
    </>
  );
}
