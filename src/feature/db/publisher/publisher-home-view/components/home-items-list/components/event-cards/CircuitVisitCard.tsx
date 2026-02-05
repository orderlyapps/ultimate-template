import { Text } from "@ionic-display/text/Text";
import { Col } from "@ionic-layout/col/Col";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";

export const CircuitVisitCard: React.FC = () => {
  return (
    <Grid className="ion-text-center">
      <Row>
        <Col>
          <Text bold>Circuit Overseer Visit</Text>
        </Col>
      </Row>
    </Grid>
  );
};
