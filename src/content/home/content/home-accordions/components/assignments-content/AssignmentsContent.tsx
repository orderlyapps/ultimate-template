import { IonLabel } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { usePublisherAssignments } from "./hooks/usePublisherAssignments";
import { AssignmentRow } from "./components/assignment-row/AssignmentRow";

/**
 * Displays all upcoming assignments for the current publisher.
 * Queries midweek, weekend, AV, speaker, and cleaning collections.
 */
export function AssignmentsContent() {
  const { assignments, isLoading } = usePublisherAssignments();

  if (isLoading) return null;

  if (assignments.length === 0) {
    return (
      <Item lines="none">
        <IonLabel>
          <Text size="sm" color="medium">
            No upcoming assignments
          </Text>
        </IonLabel>
      </Item>
    );
  }

  return (
    <>
      {assignments.slice(0, 3).map((item) => (
        <AssignmentRow key={item.key} item={item} />
      ))}
    </>
  );
}
