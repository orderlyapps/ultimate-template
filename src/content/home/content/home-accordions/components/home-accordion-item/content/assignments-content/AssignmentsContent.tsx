import { IonLabel } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { Button } from "@ionic-input/button/Button";
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
      <Item className="ion-margin-bottom">
        <IonLabel>
          <Text size="sm" color="medium">
            No upcoming assignments
          </Text>
        </IonLabel>
      </Item>
    );
  }

  return (
    <Item lines="inset" className="ion-padding-bottom ion-margin-bottom">
      <IonLabel>
        {assignments.slice(0, 3).map((item) => (
          <AssignmentRow key={item.key} item={item} />
        ))}
        <br />
        <Item>
          <Button slot="end"
            fill="clear"
            routerLink="/home/assignments"
            className="ion-text-end"
          >
            show more
          </Button>
        </Item>
      </IonLabel>
    </Item>
  );
}
