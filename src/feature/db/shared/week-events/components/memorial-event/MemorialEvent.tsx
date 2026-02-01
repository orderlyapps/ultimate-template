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
  meetingType: "midweek" | "weekend";
};

export const MemorialEvent: FC<Props> = ({ event, meetingType }) => {
  const startDate = new Date(event.start_date);
  const dayOfWeek = startDate.getDay();

  // For weekend meetings, only show if memorial is on weekend (Sat=6, Sun=0)
  // For midweek meetings, only show if memorial is on weekday (Mon-Fri: 1-5)
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const isMidweek = dayOfWeek >= 1 && dayOfWeek <= 5;

  if (meetingType === "weekend" && !isWeekend) {
    return null;
  }

  if (meetingType === "midweek" && !isMidweek) {
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
              {new Date(
                `${event.start_date}T${event.start_time}`,
              ).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}{" "}
              {getDayName(event.start_date)}
            </Text>
          </Col>
        </Row>
      </Grid>
    </Item>
  );
};
