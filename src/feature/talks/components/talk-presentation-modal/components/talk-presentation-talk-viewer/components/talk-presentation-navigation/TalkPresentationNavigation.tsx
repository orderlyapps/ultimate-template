import { Col } from "@ionic-layout/col/Col";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import { IonButton } from "@ionic/react";

type Props = {
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export function TalkPresentationNavigation({
  canPrev,
  canNext,
  onPrev,
  onNext,
}: Props) {
  return (
    <Grid style={{ padding: 0, margin: 0 }}>
      <Row>
        <Col>
          <IonButton
            expand="block"
            fill="outline"
            disabled={!canPrev}
            onClick={onPrev}
          >
            Back
          </IonButton>
        </Col>
        <Col>
          <IonButton expand="block" disabled={!canNext} onClick={onNext}>
            Next
          </IonButton>
        </Col>
      </Row>
    </Grid>
  );
}
