import { IonIcon, IonLabel } from "@ionic/react";
import close from "@icons/cross.svg";
import { Text } from "@ionic-display/text/Text";
import { Item } from "@ionic-layout/item/Item";
import type { NotificationItem } from "../../use-new-assignments/useNewAssignments";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";

import { Space } from "@layout/space/Space";
import { SectionHeading } from "@display/section-heading/SectionHeading";

type Props = {
  items: NotificationItem[];
  onDismiss: (key: string) => void;
  onDismissAll: () => void;
};

export const NewAssignmentsBanner: React.FC<Props> = ({
  items,
  onDismiss,
  onDismissAll,
}) => {
  if (items.length === 0) return null;

  const s = items.length > 1 ? "s" : "";

  return (
    <>
      <Space height="2" />
      <Item lines="none">
        <IonLabel>
          <SectionHeading>Assignment Notification{s}</SectionHeading>
        </IonLabel>
        <Text onClick={onDismissAll} size="sm" color="primary">
          Clear {s && "All"}
        </Text>
      </Item>
      <Space height="1" />
      {items.map((item) => (
        <Grid key={item.key} className="ion-no-padding ion-padding-horizontal">
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
      ))}
    </>
  );
};
