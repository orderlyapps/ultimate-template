import type { FC } from "react";
import { and, eq, useLiveQuery } from "@tanstack/react-db";
import { speakerAssignmentCollection } from "@tanstack-db/speaker_assignment/speakerAssignmentCollection";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { outlineCollection } from "@tanstack-db/outline/outlineCollection";
import { congregationCollection } from "@tanstack-db/congregation/congregationCollection";
import { useUserCongregation } from "@feature/db/congregation/user-congregation/use-user-congregation/useUserCongregation";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";
import { formatPublisherName } from "@format/formatPublisherName";

type Props = {
  weekId: string;
};

export const IncomingTalk: FC<Props> = ({ weekId }) => {
  const [userCongregation] = useUserCongregation();

  const { data } = useLiveQuery((q) =>
    q
      .from({ sa: speakerAssignmentCollection })
      .join({ p: publisherCollection }, ({ sa, p }) => eq(sa.speaker_id, p.id))
      .leftJoin({ o: outlineCollection }, ({ sa, o }) =>
        eq(sa.outline_id, o.id),
      )
      .leftJoin({ c: congregationCollection }, ({ p, c }) =>
        p ? eq(p.congregation_id, c.id) : false,
      )
      .where(({ sa }) =>
        and(
          eq(sa.week_id, weekId),
          eq(sa.congregation_id, userCongregation?.id ?? ""),
        ),
      )
      .select(({ sa, p, o, c }) => ({
        speaker: p,
        outline: o,
        speakerCongregation: c,
        assignment: sa,
      })),
  );

  const talk = data?.[0];

  if (!talk) {
    return null;
  }

  const isVisitingSpeaker =
    talk.speaker?.congregation_id !== userCongregation?.id;

  return (
    <Item lines="none">
      <Grid className="ion-text-nowrap ion-no-padding">
        <Row>
          <Col>
            <Text bold color="medium">
              {talk.outline?.theme ?? "Public Talk"}
            </Text>
          </Col>
        </Row>
        <Row className="ion-padding-start ion-padding-start ion-margin-start ion-padding-bottom">
          <Col>
            {talk.speaker && (
              <Text>
                {formatPublisherName(talk.speaker as Parameters<typeof formatPublisherName>[0], "display last")}
                {isVisitingSpeaker && talk.speakerCongregation && (
                  <> ({talk.speakerCongregation.name})</>
                )}
              </Text>
            )}
          </Col>
        </Row>
      </Grid>
    </Item>
  );
};
