import { Fragment, type FC } from "react";
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

  const items = [
    { label: "Chairman", participant: chairman?.participant },
    { label: "Reader", participant: reader?.participant },
  ];

  return (
    <Item>
      <Grid className="ion-text-nowrap ion-no-padding">
        {items.map(({ label, participant }) => {
          if (!participant) return null;
          return (
            <Fragment key={label}>
              <Row>
                <Col>
                  <Text bold color="medium">
                    {label}
                  </Text>
                </Col>
              </Row>
              <Row className="ion-padding-start ion-padding-start ion-margin-start ion-padding-bottom">
                <Col>
                  <Text>
                    {formatPublisherName(participant as Parameters<typeof formatPublisherName>[0], "display last")}
                  </Text>
                </Col>
              </Row>
            </Fragment>
          );
        })}
      </Grid>
    </Item>
  );
};
