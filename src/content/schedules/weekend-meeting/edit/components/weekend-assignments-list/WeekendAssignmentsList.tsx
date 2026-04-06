import type { FC } from "react";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { formatPublisherName } from "@format/formatPublisherName";
import { useWeekendAssignments } from "../../hooks/useWeekendAssignments";
import { Label } from "@ionic-display/label/Label";
import { IonListHeader } from "@ionic/react";

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
    <>
      <IonListHeader>Assignments</IonListHeader>
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
            <Label>{assignmentLabels[id]}</Label>
            <Text>{name}</Text>
          </Item>
        );
      })}
    </>
  );
};
