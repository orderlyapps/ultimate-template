import { Text } from "@ionic-display/text/Text";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";
import { getUserCongregation } from "@feature/db/congregation/user-congregation/get-user-congregation/getUserCongregation";
import { formatPublisherName } from "@format/formatPublisherName";
import type { PublicTalkInfo as PublicTalkInfoType } from "../../../../useHomeItems";
import { Space } from "@layout/space/Space";

type Props = {
  publicTalk: PublicTalkInfoType;
};

export const PublicTalkInfo: React.FC<Props> = ({ publicTalk }) => {
  const userCongregationId = getUserCongregation()?.id;
  const isLocalSpeaker =
    publicTalk.speaker_congregation_id === userCongregationId;

  const speakerName = formatPublisherName(
    {
      first_name: publicTalk.speaker_first_name,
      last_name: publicTalk.speaker_last_name,
      display_name: publicTalk.speaker_display_name,
    },
    "display last",
  );

  return (
    <>
      <Row>
        <Col>
          <Text bold color="primary">
            Public Talk
          </Text>
        </Col>
        <Col className="ion-text-right">
          <Text size="xs">{" This Week"}</Text>
        </Col>
      </Row>

      <Row className="ion-padding-start">
        <Col>
          <Text size="sm">{publicTalk.outline_theme}</Text>
          <br />
          <Text size="xs">
            {speakerName}
            {!isLocalSpeaker &&
              publicTalk.congregation_name &&
              ` — ${publicTalk.congregation_name}`}
          </Text>
          <Space height="0.7" />
        </Col>
      </Row>
    </>
  );
};
