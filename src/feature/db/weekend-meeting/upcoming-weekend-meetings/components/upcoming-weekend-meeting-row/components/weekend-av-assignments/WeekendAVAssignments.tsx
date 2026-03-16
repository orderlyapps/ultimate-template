import { Fragment, type FC } from "react";
import { and, eq, or, useLiveQuery } from "@tanstack/react-db";
import { avAssignmentCollection } from "@tanstack-db/av_assignment/avAssignmentCollection";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
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

const avAssignmentIDs = [
  "video_weekend",
  "audio_weekend",
  "platform_weekend",
  "microphone_1_weekend",
  "microphone_2_weekend",
] as const;

const assignmentLabels: Record<string, string> = {
  microphone_1_weekend: "Microphone",
  microphone_2_weekend: "Microphone",
  video_weekend: "Video Operator",
  audio_weekend: "Audio Operator",
  platform_weekend: "Platform",
};

export const WeekendAVAssignments: FC<Props> = ({ weekId }) => {
  const [userCongregation] = useUserCongregation();

  const { data } = useLiveQuery((q) =>
    q
      .from({ av: avAssignmentCollection })
      .join({ p: publisherCollection }, ({ av, p }) =>
        eq(av.participant_id, p.id),
      )
      .where(({ av }) =>
        and(
          eq(av.week_id, weekId),
          eq(av.congregation_id, userCongregation?.id ?? ""),
          or(
            eq(av.assignment_id, "video_weekend"),
            eq(av.assignment_id, "audio_weekend"),
            eq(av.assignment_id, "platform_weekend"),
            eq(av.assignment_id, "microphone_1_weekend"),
            eq(av.assignment_id, "microphone_2_weekend"),
          ),
        ),
      )
      .select(({ av, p }) => ({
        assignmentId: av.assignment_id,
        participant: p,
      })),
  );

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <>
      <Space height="1.5" />
      <Item lines="none">
        <Text bold size="xl">
          Audio & Video
        </Text>
      </Item>
      <Item>
        <Grid className="ion-text-nowrap ion-no-padding">
          {avAssignmentIDs.map((id) => {
            const assignment = data.find((d) => d.assignmentId === id);
            if (!assignment?.participant) return null;
            return (
              <Fragment key={id}>
                <Row>
                  <Col>
                    <Text color="primary" bold>
                      {assignmentLabels[id]}
                    </Text>
                  </Col>
                </Row>
                <Row className="ion-padding-start ion-padding-start ion-margin-start ion-padding-bottom">
                  <Col>
                    <Text>
                      {formatPublisherName(
                        assignment.participant as Parameters<typeof formatPublisherName>[0],
                        "display last",
                      )}
                    </Text>
                  </Col>
                </Row>
              </Fragment>
            );
          })}
        </Grid>
      </Item>
    </>
  );
};
