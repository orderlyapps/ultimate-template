import type { FC } from "react";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";

export const SpecialTalkEvent: FC<{ meetingType: "midweek" | "weekend" }> = ({
  meetingType,
}) => {
  if (meetingType === "midweek") {
    return null;
  }
  return (
    <Item color="primary" className="ion-padding-vertical" lines="none">
      <Grid className="ion-text-nowrap ion-text-center">
        <Row>
          <Col>
            <Text bold size="xl">
              {"Special Talk"}
            </Text>
          </Col>
        </Row>
      </Grid>
    </Item>
  );
};
