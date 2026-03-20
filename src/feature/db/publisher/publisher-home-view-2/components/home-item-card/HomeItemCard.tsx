import { Text } from "@ionic-display/text/Text";
import { Col } from "@ionic-layout/col/Col";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import { Fragment } from "react";

type Props = {
  title: string;
  dateLabel: string;
  details?: string[];
};

export const HomeItemCard: React.FC<Props> = ({
  title,
  dateLabel,
  details,
}) => {
  return (
    <Grid className="ion-no-padding">
      <Row className="">
        <Col>
          <Text bold size="sm">{title}</Text>
        </Col>
        <Col className="ion-text-right">
          <Text size="xs">{dateLabel}</Text>
        </Col>
      </Row>
      {details && details.length > 0 && (
        <Row className="ion-padding-start">
          <Col>
            {details.map((detail, index) => (
              <Fragment key={`${detail}-${index}`}>
                <Text size="xs">{detail}</Text>
                <br />
              </Fragment>
            ))}
          </Col>
        </Row>
      )}
    </Grid>
  );
};
