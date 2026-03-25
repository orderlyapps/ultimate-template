import type { FC } from "react";
import { IonLabel } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { formatPublisherName } from "@format/formatPublisherName";
import { useWeekendAssignments } from "../../hooks/useWeekendAssignments";

type Props = {
  weekId: string;
};

const assignmentLabels: Record<string, string> = {
  chairman: "Chairman",
  reader: "Watchtower Reader",
};

export const WeekendAssignmentsList: FC<Props> = ({ weekId }) => {
  const { data } = useWeekendAssignments(weekId);

  const chairman = data?.find((d) => d.assignment_id === "chairman");
  const reader = data?.find((d) => d.assignment_id === "reader");

  const assignments = [
    { id: "chairman", data: chairman },
    { id: "reader", data: reader },
  ];

  return (
    <List>
      {assignments.map(({ id, data: assignment }) => {
        const name = assignment
          ? formatPublisherName(
              {
                first_name: assignment.first_name ?? "",
                last_name: assignment.last_name ?? "",
                display_name: assignment.display_name,
              },
              "display last",
            )
          : "Not assigned";

        return (
          <Item
            key={id}
            routerLink={`/schedules/weekend-meeting/${weekId}/edit/${id}`}
            detail
          >
            <IonLabel>
              <Text color="medium" size="sm">
                {assignmentLabels[id]}
              </Text>
              <Text>{name}</Text>
            </IonLabel>
          </Item>
        );
      })}
    </List>
  );
};
