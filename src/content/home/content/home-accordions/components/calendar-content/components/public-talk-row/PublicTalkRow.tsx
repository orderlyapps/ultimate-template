import { Text } from "@ionic-display/text/Text";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";
import type { PublicTalkItem } from "../../hooks/usePublicTalk";

type Props = {
  talk: PublicTalkItem;
};

/**
 * Renders the first upcoming public talk above the events list.
 * Shows outline theme and speaker on the left, date label on the right.
 */
export function PublicTalkRow({ talk }: Props) {
  return (
    <>
      <Row>
        <Col>
          <Text bold size="sm">
            Public Talk
          </Text>
        </Col>

        <Col className="ion-text-right">
          <Text size="xs" color="medium">
            {talk.dateLabel}
          </Text>
        </Col>
      </Row>

      <Row>
        <Col>
          <Text size="xs" color="medium">
            {talk.outlineTheme}
          </Text>
        </Col>
      </Row>

      <Row>
        <Col>
          <Text size="xs" color="medium">
            {talk.speakerLabel}
          </Text>
        </Col>
      </Row>
    </>
  );
}
