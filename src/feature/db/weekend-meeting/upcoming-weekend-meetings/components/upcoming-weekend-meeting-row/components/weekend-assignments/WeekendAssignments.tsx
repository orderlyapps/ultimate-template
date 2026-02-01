import type { FC } from "react";
import { and, eq, useLiveQuery } from "@tanstack/react-db";
import { weekendAssignmentCollection } from "@tanstack-db/weekend_assignment/weekendAssignmentCollection";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { useUserCongregation } from "@feature/db/congregation/user-congregation/use-user-congregation/useUserCongregation";
import { Text } from "@ionic-display/text/Text";
import { formatPublisherName } from "@format/formatPublisherName";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";
import { Item } from "@ionic-layout/item/Item";

type Props = {
  weekId: string;
};

export const WeekendAssignments: FC<Props> = ({ weekId }) => {
  const [userCongregation] = useUserCongregation();

  const { data } = useLiveQuery((q) =>
    q
      .from({ wa: weekendAssignmentCollection })
      .join({ p: publisherCollection }, ({ wa, p }) =>
        eq(wa.participant_id, p.id),
      )
      .where(({ wa }) =>
        and(
          eq(wa.week_id, weekId),
          eq(wa.congregation_id, userCongregation?.id ?? ""),
        ),
      )
      .select(({ wa, p }) => ({
        assignmentId: wa.assignment_id,
        participant: p,
      })),
  );

  const chairman = data?.find((d) => d.assignmentId === "chairman");
  const reader = data?.find((d) => d.assignmentId === "reader");

  if (!chairman && !reader) {
    return null;
  }

  return (
    <Item>
      <Grid className="ion-no-padding">
        {chairman?.participant && (
          <Row>
            <Col>
              <Text bold>Chairman</Text>
            </Col>
            <Col className="ion-text-end">
              <Text>
                {formatPublisherName(chairman.participant, "display last")}
              </Text>
            </Col>
          </Row>
        )}

        {reader?.participant && (
          <Row>
            <Col>
              <Text bold>Reader</Text>
            </Col>
            <Col className="ion-text-end">
              <Text>
                {formatPublisherName(reader.participant, "display last")}
              </Text>
            </Col>
          </Row>
        )}
      </Grid>
    </Item>
  );
};
