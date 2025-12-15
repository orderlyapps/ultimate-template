import { IonButton, IonIcon } from "@ionic/react";
import { add, remove } from "ionicons/icons";
import { Col } from "@ionic-layout/col/Col";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import { Text } from "@ionic-display/text/Text";

type Props = {
  valueSeconds: number;
  onChange: (nextSeconds: number) => void;
  stepSeconds?: number;
  minSeconds?: number;
  maxSeconds?: number;
};

export function TimeAllocationStepper({
  valueSeconds,
  onChange,
  stepSeconds = 15,
  minSeconds = 0,
  maxSeconds,
}: Props) {
  const formatMinutesSeconds = (totalSeconds: number) => {
    const safeSeconds = Math.max(0, Math.floor(totalSeconds));
    const minutes = Math.floor(safeSeconds / 60);
    const seconds = safeSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  const clamp = (n: number) => {
    const upper = typeof maxSeconds === "number" ? maxSeconds : Infinity;
    return Math.min(upper, Math.max(minSeconds, n));
  };

  const alignDown = (n: number) => {
    if (stepSeconds <= 0) return n;
    const snapped = n - (n % stepSeconds);
    return snapped;
  };

  const currentAligned = alignDown(clamp(valueSeconds));
  const nextDown = clamp(currentAligned - stepSeconds);
  const nextUp = clamp(currentAligned + stepSeconds);

  return (
    <Grid
      style={{
        padding: 0,
        margin: 0,
        minWidth: "9.5rem",
      }}
    >
      <Row style={{ alignItems: "center", justifyContent: "space-between" }}>
        <Col size="auto">
          <IonButton
            fill="outline"
            disabled={nextDown === currentAligned}
            onClick={() => onChange(nextDown)}
          >
            <IonIcon icon={remove} slot="icon-only" size="large" />
          </IonButton>
        </Col>

        <Col style={{ textAlign: "center" }}>
          <Text size="xl">{formatMinutesSeconds(currentAligned)} min</Text>
        </Col>

        <Col size="auto">
          <IonButton
            fill="outline"
            disabled={nextUp === currentAligned}
            onClick={() => onChange(nextUp)}
          >
            <IonIcon icon={add} slot="icon-only" size="large" />
          </IonButton>
        </Col>
      </Row>
    </Grid>
  );
}
