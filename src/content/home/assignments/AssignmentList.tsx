import type { FC } from "react";
import { List } from "@ionic-layout/list/List";
import { Item } from "@ionic-layout/item/Item";
import { IonLabel } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { usePublisherAssignments } from "../content/home-accordions/components/home-accordion-item/content/assignments-content/hooks/usePublisherAssignments";
import { AssignmentRow } from "../content/home-accordions/components/home-accordion-item/content/assignments-content/components/assignment-row/AssignmentRow";

/**
 * Displays all upcoming assignments for the current publisher.
 * Used by the Assignments page to show the full list.
 */
export const AssignmentList: FC = () => {
  const { assignments, isLoading } = usePublisherAssignments();

  if (isLoading) {
    return (
      <List>
        <Item lines="none">
          <IonLabel>
            <Text>Loading...</Text>
          </IonLabel>
        </Item>
      </List>
    );
  }

  if (!assignments?.length) {
    return (
      <List>
        <Item lines="none">
          <IonLabel>
            <Text>No upcoming assignments</Text>
          </IonLabel>
        </Item>
      </List>
    );
  }

  return (
    <List>
      {assignments.map((item) => (
        <Item key={item.key} lines="inset">
          <IonLabel>
            <AssignmentRow item={item} />
          </IonLabel>
        </Item>
      ))}
    </List>
  );
};
