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

export const MemorialEvent: FC<Props> = ({ event }) => {
  const startDate = new Date(event.start_date);
  const dayOfWeek = startDate.getDay();
  if (dayOfWeek > 0 && dayOfWeek < 6) {
    return null;
  }

  return (
    <Item>
      <Grid className="ion-text-nowrap ion-text-center">
        <Row>
          <Col>
            <Text bold size="xl">
              {"Memorial"}
            </Text>
            <br />
            <Text color="medium">
              {event.start_time} {getDayName(event.start_date)}
            </Text>
          </Col>
        </Row>
      </Grid>
    </Item>
  );
};
