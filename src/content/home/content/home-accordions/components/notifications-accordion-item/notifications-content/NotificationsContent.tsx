import { IonItem, IonLabel } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { NotificationRow } from "@/content/home/content/home-accordions/components/notifications-accordion-item/notifications-content/components/notification-row/NotificationRow";
import type { NotificationItem } from "@/content/home/content/home-accordions/components/notifications-accordion-item/notifications-content/hooks/useNewAssignments";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";

type Props = {
  newItems: NotificationItem[];
  dismiss: (key: string) => void;
  dismissAll: () => void;
};

export function NotificationsContent({ newItems, dismiss, dismissAll }: Props) {
  const s = newItems.length > 1 ? "s" : "";

  return (
    <>
      <IonItem lines="inset" className="ion-padding-bottom ion-margin-bottom">
        <IonLabel>
          {newItems.map((item) => (
            <NotificationRow key={item.key} item={item} onDismiss={dismiss} />
          ))}

          <Grid>
            <Row>
              <Col className="ion-text-right">
                <Text onClick={dismissAll} size="sm" color="primary">
                  Clear {s && "All"}
                </Text>
              </Col>
            </Row>
          </Grid>
        </IonLabel>
      </IonItem>
    </>
  );
}
