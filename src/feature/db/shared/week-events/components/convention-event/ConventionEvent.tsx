import type { FC } from "react";
import type { Event } from "@tanstack-db/event/eventSchema";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";

type Props = {
  event: Event;
};

export const ConventionEvent: FC<Props> = ({ event }) => {
  return (
    <Item color="primary" className="ion-padding-vertical">
      <Grid className="ion-text-nowrap ion-text-center">
        <Row>
          <Col>
            <Text bold size="xl">
              {"Regional Convention"}
            </Text>
            <br />
            <Text bold>{event.name}</Text>
          </Col>
        </Row>
      </Grid>
    </Item>
  );
};
