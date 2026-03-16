import { Fragment, type FC } from "react";
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
import { Space } from "@layout/space/Space";

type Props = {
  weekId: string;
};

export const OutgoingSpeakers: FC<Props> = ({ weekId }) => {
  const [userCongregation] = useUserCongregation();

  const { data } = useLiveQuery((q) =>
    q
      .from({ sa: speakerAssignmentCollection })
      .join({ p: publisherCollection }, ({ sa, p }) => eq(sa.speaker_id, p.id))
      .leftJoin({ o: outlineCollection }, ({ sa, o }) =>
        eq(sa.outline_id, o.id),
      )
      .leftJoin({ c: congregationCollection }, ({ sa, c }) =>
        eq(sa.congregation_id, c.id),
      )
      .where(({ sa, p }) =>
        p
          ? and(
              eq(sa.week_id, weekId),
              eq(p.congregation_id, userCongregation?.id ?? ""),
            )
          : false,
      )
      .select(({ sa, p, o, c }) => ({
        speaker: p,
        outline: o,
        destinationCongregation: c,
        assignment: sa,
      })),
  );

  const outgoingSpeakers = data?.filter(
    (item) => item.assignment.congregation_id !== userCongregation?.id,
  );

  if (!outgoingSpeakers || outgoingSpeakers.length === 0) {
    return null;
  }

  return (
    <>
      <Space height="1.5" />
      <Item lines="none">
        <Text bold size="xl">
          Outgoing Speakers
        </Text>
      </Item>
      <Item>
        <Grid className="ion-text-nowrap ion-no-padding">
          {outgoingSpeakers.map((item, index) => (
            <Fragment key={index}>
              <Row>
                <Col>
                  <Text bold color="primary">
                    {item.speaker &&
                      formatPublisherName(item.speaker as Parameters<typeof formatPublisherName>[0], "display last")}
                  </Text>
                </Col>
              </Row>
              <Row className="ion-padding-start ion-padding-start ion-margin-start ion-padding-bottom">
                <Col>
                  <Text>
                    Outline {item.outline?.id}
                    {item.outline && item.destinationCongregation && " - "}
                    {item.destinationCongregation?.name}
                  </Text>
                </Col>
              </Row>
            </Fragment>
          ))}
        </Grid>
      </Item>
    </>
  );
};
