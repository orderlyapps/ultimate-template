import { IonIcon } from "@ionic/react";
import close from "@icons/cross.svg";
import { Text } from "@ionic-display/text/Text";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";
import { Space } from "@layout/space/Space";
import type { NotificationItem } from "@/content/home/content/home-accordions/components/notifications-content/hooks/useNewAssignments";

type Props = {
  item: NotificationItem;
  onDismiss: (key: string) => void;
};

export function NotificationRow({ item, onDismiss }: Props) {
  return (
    <Grid className="ion-no-padding ion-padding-horizontal">
      <Row>
        <Col>
          <Row>
            <Col>
              <Text bold size="sm">
                {item.title}
              </Text>
              <br />
              <Text size="xs" color="medium">
                {item.detail}
              </Text>
            </Col>
            <Col className="ion-text-right">
              <Text size="xs" color="medium">
                {item.dateLabel}
              </Text>
            </Col>
          </Row>
        </Col>
        <Col size="auto" className="ion-padding-start">
          <Space height="0.2" />
          <IonIcon
            onClick={() => onDismiss(item.key)}
            icon={close}
            color="medium"
          />
        </Col>
      </Row>
      <Space height="0.6" />
    </Grid>
  );
}
