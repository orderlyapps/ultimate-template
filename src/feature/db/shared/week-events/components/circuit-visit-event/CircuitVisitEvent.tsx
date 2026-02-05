import type { FC } from "react";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";
import { Space } from "@layout/space/Space";

export const CircuitVisitEvent: FC = () => {
  return (
    <>
      <Item color="primary" className="ion-padding-vertical">
        <Grid className="ion-text-nowrap ion-text-center">
          <Row>
            <Col>
              <Text bold size="xl">
                {"Circuit Overseer Visit"}
              </Text>
            </Col>
          </Row>
        </Grid>
      </Item>
      <Space height="2" />
    </>
  );
};
