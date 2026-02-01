import type { FC } from "react";
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

type Props = {
  weekId: string;
};

const attendantAssignmentIDs = [
  "auditorium_midweek",
  "entrance_midweek",
  "zoom_midweek",
] as const;

const assignmentLabels: Record<string, string> = {
  entrance_midweek: "Entrance",
  auditorium_midweek: "Auditorium",
  zoom_midweek: "Zoom",
};

export const MidweekAttendantAssignments: FC<Props> = ({ weekId }) => {
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
            eq(av.assignment_id, "entrance_midweek"),
            eq(av.assignment_id, "auditorium_midweek"),
            eq(av.assignment_id, "zoom_midweek"),
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
    <Item>
      <Grid className="ion-text-nowrap ion-no-padding">
        <Row>
          <Col className="ion-text-center ion-padding-top">
            <Text bold color="medium">
              Attendants
            </Text>
          </Col>
        </Row>
        {attendantAssignmentIDs.map((id) => {
          const assignment = data.find((d) => d.assignmentId === id);
          if (!assignment?.participant) return null;
          return (
            <Row key={id}>
              <Col>
                <Text bold>{assignmentLabels[id]}</Text>
              </Col>
              <Col className="ion-text-right">
                <Text>
                  {formatPublisherName(assignment.participant, "display last")}
                </Text>
              </Col>
            </Row>
          );
        })}
      </Grid>
    </Item>
  );
};
