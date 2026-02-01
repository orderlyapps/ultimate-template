import type { FC } from "react";
import type { Event } from "@tanstack-db/event/eventSchema";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";
import { getDayName } from "@date/getDayName";

type Props = {
  event: Event;
};

export const CircuitAssemblyEvent: FC<Props> = ({ event }) => {
  return (
    <Item>
      <Grid className="ion-text-nowrap ion-text-center">
        <Row>
          <Col>
            <Text bold size="xl">
              {"Circuit Assembly"}
            </Text>
            <br />
            <Text>{getDayName(event.start_date)}</Text>
            <br />
            <Text bold>{event.name}</Text>
          </Col>
        </Row>
      </Grid>
    </Item>
  );
};
