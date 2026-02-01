import type { FC } from "react";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";

export const CircuitVisitEvent: FC = () => {
  return (
    <Item>
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
  );
};
